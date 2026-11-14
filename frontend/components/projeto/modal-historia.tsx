'use client';

import { useEffect, useState } from 'react';
import ModalBase from '@/components/modal-base';
import { IconeLixeira } from '@/components/icones';
import { chamarApi, textoDeErro } from '@/lib/api';
import {
  botaoPerigo,
  botaoPrimario,
  botaoSecundario,
  caixaErro,
  inputClasse,
  labelClasse,
} from '@/lib/estilos';
import { calcularRice, montarHistoria, MSCW, separarHistoria, type Mscw } from '@/lib/historia';
import type { Backlog, CriterioAceitacao, Epico, HistoriaUsuario } from '@/lib/tipos';

interface ModalHistoriaProps {
  hu: HistoriaUsuario | null;
  idBacklogInicial: number;
  backlogs: Backlog[];
  epicos: Epico[];
  onClose: () => void;
  onSaved: (hu: HistoriaUsuario, totalCriterios: number) => void;
  onDeleted: (id: number) => void;
}

type Aba = 'historia' | 'pontuacao' | 'criterios';

interface CriterioEdicao {
  chave: string;
  id?: number;
  dado: string;
  quando: string;
  entao: string;
  alterado?: boolean;
}

const STORY_POINTS = [1, 2, 3, 5, 8, 13, 21];
const IMPACTOS = [
  { valor: '3', texto: '3 — Massivo' },
  { valor: '2', texto: '2 — Alto' },
  { valor: '1', texto: '1 — Médio' },
  { valor: '0.5', texto: '0,5 — Baixo' },
  { valor: '0.25', texto: '0,25 — Mínimo' },
];
const CONFIANCAS = [
  { valor: '100', texto: '100% — Alta' },
  { valor: '80', texto: '80% — Média' },
  { valor: '50', texto: '50% — Baixa' },
];

const paraNumero = (valor: string) => (valor.trim() === '' ? null : Number(valor));
const paraTexto = (valor: number | null) => (valor === null ? '' : String(valor));
const novaChave = () => Math.random().toString(36).slice(2);

export default function ModalHistoria({
  hu,
  idBacklogInicial,
  backlogs,
  epicos,
  onClose,
  onSaved,
  onDeleted,
}: ModalHistoriaProps) {
  const partes = hu ? separarHistoria(hu.historia) : null;

  const [huAtual, setHuAtual] = useState<HistoriaUsuario | null>(hu);
  const [aba, setAba] = useState<Aba>('historia');

  const [papel, setPapel] = useState(partes?.papel ?? '');
  const [acao, setAcao] = useState(partes?.acao ?? (hu && !partes ? hu.historia : ''));
  const [beneficio, setBeneficio] = useState(partes?.beneficio ?? '');
  const [idBacklog, setIdBacklog] = useState(String(hu?.idBacklog ?? idBacklogInicial));
  const [idEpico, setIdEpico] = useState(paraTexto(hu?.idEpico ?? null));

  const [mscw, setMscw] = useState<Mscw | ''>(hu?.mscw ?? '');
  const [storyPoints, setStoryPoints] = useState(paraTexto(hu?.storyPoints ?? null));
  const [reach, setReach] = useState(paraTexto(hu?.reach ?? null));
  const [impact, setImpact] = useState(paraTexto(hu?.impact ?? null));
  const [confidence, setConfidence] = useState(paraTexto(hu?.confidence ?? null));

  const [criterios, setCriterios] = useState<CriterioEdicao[]>([]);
  const [removidos, setRemovidos] = useState<number[]>([]);
  const [novoCriterio, setNovoCriterio] = useState({ dado: '', quando: '', entao: '' });
  const [carregandoCriterios, setCarregandoCriterios] = useState(hu !== null);

  const [confirmandoExclusao, setConfirmandoExclusao] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const rice = calcularRice(
    paraNumero(reach),
    paraNumero(impact),
    paraNumero(confidence),
    paraNumero(storyPoints),
  );

  const paraEdicao = (lista: CriterioAceitacao[]): CriterioEdicao[] =>
    lista.map((c) => ({ chave: String(c.id), id: c.id, dado: c.dado, quando: c.quando, entao: c.entao }));

  useEffect(() => {
    if (!hu) return;
    let cancelado = false;
    const carregar = async () => {
      try {
        const lista = await chamarApi<CriterioAceitacao[]>(
          `/criterio-aceitacao?idHu=${hu.id}`,
          {},
          'Erro ao carregar critérios de aceitação.',
        );
        if (!cancelado) setCriterios(paraEdicao(lista));
      } catch (err) {
        if (!cancelado) setErro(textoDeErro(err));
      } finally {
        if (!cancelado) setCarregandoCriterios(false);
      }
    };
    carregar();
    return () => {
      cancelado = true;
    };
  }, [hu]);

  const adicionarCriterio = () => {
    const { dado, quando, entao } = novoCriterio;
    if (!dado.trim() || !quando.trim() || !entao.trim()) return;
    setCriterios((atuais) => [
      ...atuais,
      { chave: novaChave(), dado: dado.trim(), quando: quando.trim(), entao: entao.trim() },
    ]);
    setNovoCriterio({ dado: '', quando: '', entao: '' });
  };

  const alterarCriterio = (chave: string, campo: 'dado' | 'quando' | 'entao', valor: string) => {
    setCriterios((atuais) =>
      atuais.map((c) => (c.chave === chave ? { ...c, [campo]: valor, alterado: true } : c)),
    );
  };

  const removerCriterio = (criterio: CriterioEdicao) => {
    setCriterios((atuais) => atuais.filter((c) => c.chave !== criterio.chave));
    if (criterio.id !== undefined) setRemovidos((atuais) => [...atuais, criterio.id!]);
  };

  const salvar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!papel.trim() || !acao.trim() || !beneficio.trim()) {
      setAba('historia');
      setErro('Preencha o papel, a ação e o benefício da história.');
      return;
    }
    if (criterios.some((c) => !c.dado.trim() || !c.quando.trim() || !c.entao.trim())) {
      setAba('criterios');
      setErro('Todos os critérios precisam de "dado", "quando" e "então".');
      return;
    }

    setSalvando(true);
    setErro(null);

    const dados = {
      historia: montarHistoria(papel, acao, beneficio),
      idBacklog: Number(idBacklog),
      idEpico: idEpico ? Number(idEpico) : null,
      mscw: mscw || null,
      storyPoints: paraNumero(storyPoints),
      reach: paraNumero(reach),
      impact: paraNumero(impact),
      confidence: paraNumero(confidence),
      rice,
    };

    let salva: HistoriaUsuario;
    try {
      salva = huAtual
        ? await chamarApi<HistoriaUsuario>(`/historia-usuario/${huAtual.id}`, { method: 'PATCH', body: dados })
        : await chamarApi<HistoriaUsuario>('/historia-usuario', { method: 'POST', body: dados });
      setHuAtual(salva);
    } catch (err) {
      setErro(textoDeErro(err));
      setSalvando(false);
      return;
    }

    const texto = (c: CriterioEdicao) => ({ dado: c.dado.trim(), quando: c.quando.trim(), entao: c.entao.trim() });
    const operacoes = [
      ...removidos.map((id) => chamarApi(`/criterio-aceitacao/${id}`, { method: 'DELETE' })),
      ...criterios
        .filter((c) => c.id === undefined)
        .map((c) =>
          chamarApi('/criterio-aceitacao', { method: 'POST', body: { idHu: salva.id, ...texto(c) } }),
        ),
      ...criterios
        .filter((c) => c.id !== undefined && c.alterado)
        .map((c) => chamarApi(`/criterio-aceitacao/${c.id}`, { method: 'PATCH', body: texto(c) })),
    ];
    const resultados = await Promise.allSettled(operacoes);
    const falha = resultados.find((r): r is PromiseRejectedResult => r.status === 'rejected');

    if (!falha) {
      onSaved(salva, criterios.length);
      onClose();
      return;
    }

    // Parte dos critérios falhou: recarrega o que ficou salvo para não duplicar ao tentar de novo
    try {
      const lista = await chamarApi<CriterioAceitacao[]>(`/criterio-aceitacao?idHu=${salva.id}`);
      setCriterios(paraEdicao(lista));
      setRemovidos([]);
      onSaved(salva, lista.length);
    } catch {
      onSaved(salva, criterios.length);
    }
    setAba('criterios');
    setErro(`A história foi salva, mas houve erro nos critérios: ${textoDeErro(falha.reason)}`);
    setSalvando(false);
  };

  const excluir = async () => {
    if (!huAtual) return;
    setSalvando(true);
    setErro(null);
    try {
      await chamarApi(`/historia-usuario/${huAtual.id}`, { method: 'DELETE' });
      onDeleted(huAtual.id);
      onClose();
    } catch (err) {
      setErro(textoDeErro(err));
      setSalvando(false);
    }
  };

  const abaClasse = (ativa: boolean) =>
    `flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
      ativa ? 'bg-white text-[#4a7bd0] shadow-sm' : 'text-[#7a716a] hover:text-[#2b2622]'
    }`;

  const chipClasse = (ativo: boolean) =>
    `rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
      ativo
        ? 'border-[#4a7bd0] bg-[#e6eefb] text-[#4a7bd0]'
        : 'border-[#e7e1d8] text-[#5c534c] hover:border-[#4a7bd0]'
    }`;

  return (
    <ModalBase titulo={huAtual ? 'Editar história' : 'Nova história'} onClose={onClose} largura="max-w-2xl">
      <form onSubmit={salvar}>
        <div className="flex gap-1 rounded-xl bg-[#f4f1ec] p-1" role="tablist">
          <button type="button" role="tab" aria-selected={aba === 'historia'} onClick={() => setAba('historia')} className={abaClasse(aba === 'historia')}>
            História
          </button>
          <button type="button" role="tab" aria-selected={aba === 'pontuacao'} onClick={() => setAba('pontuacao')} className={abaClasse(aba === 'pontuacao')}>
            Pontuação
          </button>
          <button type="button" role="tab" aria-selected={aba === 'criterios'} onClick={() => setAba('criterios')} className={abaClasse(aba === 'criterios')}>
            Critérios ({criterios.length})
          </button>
        </div>

        {aba === 'historia' && (
          <div className="mt-5 space-y-4">
            <div className="rounded-xl bg-[#f4f1ec] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#7a716a]">Formato padrão</p>
              <p className="mt-2 text-sm">
                Como um <span className="font-semibold text-[#4a7bd0]">[papel]</span>, eu quero{' '}
                <span className="font-semibold text-[#4a7bd0]">[ação]</span> para{' '}
                <span className="font-semibold text-[#4a7bd0]">[benefício]</span>
              </p>
            </div>

            <div>
              <label htmlFor="hu-papel" className={labelClasse}>Papel (quem?)</label>
              <input id="hu-papel" type="text" autoFocus value={papel} onChange={(e) => setPapel(e.target.value)} placeholder="Ex: cliente" className={inputClasse} />
            </div>
            <div>
              <label htmlFor="hu-acao" className={labelClasse}>Ação (o quê?)</label>
              <textarea id="hu-acao" rows={2} value={acao} onChange={(e) => setAcao(e.target.value)} placeholder="Ex: criar uma conta com e-mail e senha" className={`${inputClasse} resize-none`} />
            </div>
            <div>
              <label htmlFor="hu-beneficio" className={labelClasse}>Benefício (para quê?)</label>
              <textarea id="hu-beneficio" rows={2} value={beneficio} onChange={(e) => setBeneficio(e.target.value)} placeholder="Ex: acessar a plataforma de forma segura" className={`${inputClasse} resize-none`} />
            </div>
            <div>
              <label htmlFor="hu-backlog" className={labelClasse}>Backlog</label>
              <select id="hu-backlog" value={idBacklog} onChange={(e) => setIdBacklog(e.target.value)} className={inputClasse}>
                {backlogs.map((b) => (
                  <option key={b.id} value={b.id}>{b.nome}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="hu-epico" className={labelClasse}>Épico (opcional)</label>
              <select id="hu-epico" value={idEpico} onChange={(e) => setIdEpico(e.target.value)} className={inputClasse}>
                <option value="">Nenhum</option>
                {epicos.map((ep) => (
                  <option key={ep.id} value={ep.id}>{ep.nome}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {aba === 'pontuacao' && (
          <div className="mt-5 space-y-5">
            <div>
              <p className={labelClasse}>Prioridade MoSCoW</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {(Object.keys(MSCW) as Mscw[]).map((chave) => (
                  <button key={chave} type="button" onClick={() => setMscw(mscw === chave ? '' : chave)} className={chipClasse(mscw === chave)}>
                    {chave.toUpperCase()} — {MSCW[chave]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className={labelClasse}>Story points</p>
              <div className="flex flex-wrap gap-2">
                {STORY_POINTS.map((pts) => (
                  <button key={pts} type="button" onClick={() => setStoryPoints(storyPoints === String(pts) ? '' : String(pts))} className={`w-12 ${chipClasse(storyPoints === String(pts))}`}>
                    {pts}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className={labelClasse}>RICE</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div>
                  <label htmlFor="hu-reach" className="mb-1 block text-xs text-[#7a716a]">Reach (alcance)</label>
                  <input id="hu-reach" type="number" min={0} step="any" value={reach} onChange={(e) => setReach(e.target.value)} placeholder="Ex: 500" className={inputClasse} />
                </div>
                <div>
                  <label htmlFor="hu-impact" className="mb-1 block text-xs text-[#7a716a]">Impact (impacto)</label>
                  <select id="hu-impact" value={impact} onChange={(e) => setImpact(e.target.value)} className={inputClasse}>
                    <option value="">—</option>
                    {IMPACTOS.map((i) => (
                      <option key={i.valor} value={i.valor}>{i.texto}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="hu-confidence" className="mb-1 block text-xs text-[#7a716a]">Confidence (confiança)</label>
                  <select id="hu-confidence" value={confidence} onChange={(e) => setConfidence(e.target.value)} className={inputClasse}>
                    <option value="">—</option>
                    {CONFIANCAS.map((c) => (
                      <option key={c.valor} value={c.valor}>{c.texto}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between rounded-xl bg-[#f4f1ec] p-4">
                <p className="text-xs text-[#7a716a]">
                  (Reach × Impact × Confidence) ÷ Esforço
                  <br />O esforço é a pontuação em story points.
                </p>
                <p className="text-2xl font-bold text-[#5f8864]">{rice ?? '—'}</p>
              </div>
            </div>
          </div>
        )}

        {aba === 'criterios' && (
          <div className="mt-5 space-y-4">
            {carregandoCriterios ? (
              <p className="text-sm text-[#7a716a]">Carregando critérios...</p>
            ) : criterios.length === 0 ? (
              <p className="text-sm text-[#7a716a]">Nenhum critério de aceitação ainda.</p>
            ) : (
              criterios.map((c, i) => (
                <div key={c.chave} className="rounded-xl border border-[#e7e1d8] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#7a716a]">Critério {i + 1}</p>
                    <button type="button" onClick={() => removerCriterio(c)} className="rounded-md p-1 text-[#7a716a] transition-colors hover:bg-red-50 hover:text-red-600" aria-label={`Remover critério ${i + 1}`}>
                      <IconeLixeira />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {(['dado', 'quando', 'entao'] as const).map((campo) => (
                      <div key={campo} className="flex items-center gap-3">
                        <span className="w-14 shrink-0 text-xs font-bold uppercase text-[#4a7bd0]">
                          {campo === 'entao' ? 'Então' : campo === 'dado' ? 'Dado' : 'Quando'}
                        </span>
                        <input type="text" value={c[campo]} onChange={(e) => alterarCriterio(c.chave, campo, e.target.value)} className={`${inputClasse} py-2`} />
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}

            <div className="rounded-xl bg-[#f4f1ec] p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#7a716a]">Novo critério</p>
              <div className="space-y-2">
                {(
                  [
                    ['dado', 'Dado', 'que estou na tela de cadastro'],
                    ['quando', 'Quando', 'preencho e-mail e senha válidos'],
                    ['entao', 'Então', 'minha conta é criada'],
                  ] as const
                ).map(([campo, rotulo, exemplo]) => (
                  <div key={campo} className="flex items-center gap-3">
                    <span className="w-14 shrink-0 text-xs font-bold uppercase text-[#4a7bd0]">{rotulo}</span>
                    <input
                      type="text"
                      value={novoCriterio[campo]}
                      onChange={(e) => setNovoCriterio({ ...novoCriterio, [campo]: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          adicionarCriterio();
                        }
                      }}
                      placeholder={`Ex: ${exemplo}`}
                      className={`${inputClasse} py-2`}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={adicionarCriterio}
                  disabled={!novoCriterio.dado.trim() || !novoCriterio.quando.trim() || !novoCriterio.entao.trim()}
                  className="rounded-lg border border-[#4a7bd0] px-3 py-1.5 text-sm font-semibold text-[#4a7bd0] transition-colors hover:bg-[#e6eefb] disabled:opacity-40"
                >
                  + Adicionar critério
                </button>
              </div>
            </div>
            <p className="text-xs text-[#7a716a]">Os critérios são gravados ao salvar a história.</p>
          </div>
        )}

        {erro && <p className={`mt-4 ${caixaErro}`}>{erro}</p>}

        <div className="mt-6 flex items-center justify-between gap-2.5 border-t border-[#efe9e1] pt-4">
          {huAtual && !confirmandoExclusao && (
            <button type="button" onClick={() => setConfirmandoExclusao(true)} className={botaoPerigo}>
              Excluir
            </button>
          )}
          {confirmandoExclusao ? (
            <div className="flex w-full flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-[#5c534c]">Excluir esta história e seus critérios?</p>
              <div className="flex gap-2">
                <button type="button" onClick={() => setConfirmandoExclusao(false)} className={botaoSecundario}>
                  Cancelar
                </button>
                <button type="button" onClick={excluir} disabled={salvando} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700 disabled:opacity-50">
                  {salvando ? 'Excluindo...' : 'Excluir'}
                </button>
              </div>
            </div>
          ) : (
            <div className="ml-auto flex gap-2.5">
              <button type="button" onClick={onClose} className={botaoSecundario}>
                Cancelar
              </button>
              <button type="submit" disabled={salvando || carregandoCriterios} className={botaoPrimario}>
                {salvando ? 'Salvando...' : 'Salvar história'}
              </button>
            </div>
          )}
        </div>
      </form>
    </ModalBase>
  );
}

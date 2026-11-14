'use client';

import { useState } from 'react';
import ModalBase from '@/components/modal-base';
import { chamarApi, textoDeErro } from '@/lib/api';
import {
  botaoPerigo,
  botaoPrimario,
  botaoSecundario,
  caixaErro,
  inputClasse,
  labelClasse,
} from '@/lib/estilos';
import type { Backlog } from '@/lib/tipos';

interface ModalBacklogProps {
  idProjeto: number;
  sprint: boolean;
  backlog: Backlog | null;
  totalHistorias: number;
  confirmarExclusao?: boolean;
  onClose: () => void;
  onSaved: (backlog: Backlog) => void;
  onDeleted: (backlog: Backlog) => void;
}

export default function ModalBacklog({
  idProjeto,
  sprint,
  backlog,
  totalHistorias,
  confirmarExclusao = false,
  onClose,
  onSaved,
  onDeleted,
}: ModalBacklogProps) {
  const [nome, setNome] = useState(backlog?.nome ?? (sprint ? '' : 'Product Backlog'));
  const [init, setInit] = useState(backlog?.init?.slice(0, 10) ?? '');
  const [finish, setFinish] = useState(backlog?.finish?.slice(0, 10) ?? '');
  const [confirmando, setConfirmando] = useState(confirmarExclusao && backlog !== null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const rota = sprint ? '/sprint' : '/backlog';
  const tipo = sprint ? 'sprint' : 'backlog';
  const titulo = backlog ? `Editar ${tipo}` : sprint ? 'Nova sprint' : 'Novo backlog';

  const salvar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sprint && finish < init) {
      setErro('A data de término não pode ser anterior à data de início.');
      return;
    }

    setLoading(true);
    setErro(null);
    try {
      const dados = sprint ? { nome: nome.trim(), init, finish } : { nome: nome.trim() };
      const salvo = backlog
        ? await chamarApi<Backlog>(`${rota}/${backlog.id}`, { method: 'PATCH', body: dados })
        : await chamarApi<Backlog>(rota, { method: 'POST', body: { ...dados, idProjeto } });
      onSaved(salvo);
      onClose();
    } catch (err) {
      setErro(textoDeErro(err));
      setLoading(false);
    }
  };

  const excluir = async () => {
    if (!backlog) return;
    setLoading(true);
    setErro(null);
    try {
      await chamarApi(`${rota}/${backlog.id}`, { method: 'DELETE' });
      onDeleted(backlog);
      onClose();
    } catch (err) {
      setErro(textoDeErro(err));
      setLoading(false);
    }
  };

  if (confirmando && backlog) {
    return (
      <ModalBase titulo={`Excluir ${tipo}`} onClose={onClose}>
        <p className="text-sm text-[#5c534c]">
          Tem certeza que deseja excluir <strong>{backlog.nome}</strong>?
          {totalHistorias > 0 && (
            <>
              {' '}
              {totalHistorias === 1
                ? 'A história de usuário dela também será excluída.'
                : `As ${totalHistorias} histórias de usuário dela também serão excluídas.`}
            </>
          )}{' '}
          Essa ação não pode ser desfeita.
        </p>
        {erro && <p className={`mt-4 ${caixaErro}`}>{erro}</p>}
        <div className="mt-6 flex justify-end gap-2.5">
          <button
            type="button"
            onClick={() => (confirmarExclusao ? onClose() : setConfirmando(false))}
            className={botaoSecundario}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={excluir}
            disabled={loading}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? 'Excluindo...' : 'Excluir'}
          </button>
        </div>
      </ModalBase>
    );
  }

  return (
    <ModalBase titulo={titulo} onClose={onClose}>
      <form onSubmit={salvar} className="space-y-4">
        <div>
          <label htmlFor="nome-backlog" className={labelClasse}>
            Nome
          </label>
          <input
            id="nome-backlog"
            type="text"
            required
            autoFocus
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder={sprint ? 'Ex: Sprint 1' : 'Ex: Product Backlog'}
            className={inputClasse}
          />
        </div>

        {sprint && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="init-sprint" className={labelClasse}>
                Início
              </label>
              <input
                id="init-sprint"
                type="date"
                required
                value={init}
                onChange={(e) => setInit(e.target.value)}
                className={inputClasse}
              />
            </div>
            <div>
              <label htmlFor="finish-sprint" className={labelClasse}>
                Término
              </label>
              <input
                id="finish-sprint"
                type="date"
                required
                min={init || undefined}
                value={finish}
                onChange={(e) => setFinish(e.target.value)}
                className={inputClasse}
              />
            </div>
          </div>
        )}

        {erro && <p className={caixaErro}>{erro}</p>}

        <div className="flex items-center justify-between gap-2.5 border-t border-[#efe9e1] pt-4">
          {backlog ? (
            <button type="button" onClick={() => setConfirmando(true)} className={botaoPerigo}>
              Excluir
            </button>
          ) : (
            <span />
          )}
          <div className="flex gap-2.5">
            <button type="button" onClick={onClose} className={botaoSecundario}>
              Cancelar
            </button>
            <button type="submit" disabled={loading || !nome.trim()} className={botaoPrimario}>
              {loading ? 'Salvando...' : backlog ? 'Salvar' : 'Criar'}
            </button>
          </div>
        </div>
      </form>
    </ModalBase>
  );
}

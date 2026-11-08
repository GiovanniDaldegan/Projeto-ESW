"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Outfit } from "next/font/google";
import HeaderApp from "@/components/headers/header-app";
import HeaderProject from "@/components/headers/header-project";
import ModalCriarEpico from "@/components/modal-epico";
import PanelBacklog from "@/components/projeto/backlog/panel-backlog";
import PanelEpic from "@/components/projeto/epic/panel-epic";
import ModalBacklog from "@/components/projeto/modal-backlog";
import ModalHistoria from "@/components/projeto/modal-historia";
import { chamarApi, textoDeErro } from "@/lib/api";
import { CORES_EPICO } from "@/lib/historia";
import { getProjeto, ProjetoInfo } from "@/lib/projeto";
import type { Backlog, CriterioAceitacao, Epico, HistoriaUsuario } from "@/lib/tipos";
import { getUsuarioLogado } from "@/lib/usuario-logado";

const outfit = Outfit({ subsets: ["latin"] });

type EstadoModalHistoria = { hu: HistoriaUsuario | null; idBacklog: number } | null;
type EstadoModalBacklog = { sprint: boolean; backlog: Backlog | null; excluir?: boolean } | null;

// Insere ou substitui pelo id
function upsert<T extends { id: number }>(lista: T[], item: T) {
  return lista.some((x) => x.id === item.id)
    ? lista.map((x) => (x.id === item.id ? item : x))
    : [...lista, item];
}

export default function Page() {
  const router = useRouter();

  const [projeto, setProjeto] = useState<ProjetoInfo | null>(null);
  const [backlogs, setBacklogs] = useState<Backlog[]>([]);
  const [sprints, setSprints] = useState<Backlog[]>([]);
  const [epicos, setEpicos] = useState<Epico[]>([]);
  const [hus, setHus] = useState<HistoriaUsuario[]>([]);
  const [totalCriterios, setTotalCriterios] = useState<Record<number, number>>({});
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const [modalHistoria, setModalHistoria] = useState<EstadoModalHistoria>(null);
  const [modalBacklog, setModalBacklog] = useState<EstadoModalBacklog>(null);
  const [modalEpicoAberto, setModalEpicoAberto] = useState(false);

  // Carrega tudo uma única vez ao abrir a tela. As dependências não podem incluir
  // os estados preenchidos aqui, senão vira um loop de requisições.
  useEffect(() => {
    let cancelado = false;

    const carregar = async () => {
      // redirect() não funciona dentro de useEffect; aqui é preciso usar o router
      if (!getUsuarioLogado()) {
        router.replace("/login");
        return;
      }
      const proj = getProjeto();
      if (!proj) {
        router.replace("/projetos");
        return;
      }
      setProjeto(proj);

      try {
        // GET /backlog só devolve backlogs (sprint = false); as sprints vêm de GET /sprint
        const [listaBacklogs, listaSprints, listaEpicos] = await Promise.all([
          chamarApi<Backlog[]>(`/backlog?idProjeto=${proj.id}`, {}, "Erro ao carregar backlog."),
          chamarApi<Backlog[]>(`/sprint?idProjeto=${proj.id}`, {}, "Erro ao carregar sprints."),
          chamarApi<Epico[]>(`/epico?idProjeto=${proj.id}`, {}, "Erro ao carregar épicos."),
        ]);

        const listaHus = (
          await Promise.all(
            [...listaBacklogs, ...listaSprints].map((b) =>
              chamarApi<HistoriaUsuario[]>(`/historia-usuario?idBacklog=${b.id}`),
            ),
          )
        ).flat();

        const contagens = await Promise.all(
          listaHus.map(async (hu) => {
            const lista = await chamarApi<CriterioAceitacao[]>(`/criterio-aceitacao?idHu=${hu.id}`);
            return [hu.id, lista.length] as const;
          }),
        );

        if (cancelado) return;
        setBacklogs(listaBacklogs);
        setSprints(listaSprints);
        setEpicos(listaEpicos);
        setHus(listaHus);
        setTotalCriterios(Object.fromEntries(contagens));
      } catch (err) {
        if (!cancelado) setErro(textoDeErro(err));
      } finally {
        if (!cancelado) setCarregando(false);
      }
    };

    carregar();
    return () => {
      cancelado = true;
    };
  }, [router]);

  const corEpico = (idEpico: number) => {
    const indice = epicos.findIndex((e) => e.id === idEpico);
    return CORES_EPICO[(indice < 0 ? 0 : indice) % CORES_EPICO.length];
  };

  const todosBacklogs = [...backlogs, ...sprints];

  const backlogSalvo = (backlog: Backlog) => {
    if (backlog.sprint) setSprints((atuais) => upsert(atuais, backlog));
    else setBacklogs((atuais) => upsert(atuais, backlog));
  };

  const backlogExcluido = (backlog: Backlog) => {
    if (backlog.sprint) setSprints((atuais) => atuais.filter((b) => b.id !== backlog.id));
    else setBacklogs((atuais) => atuais.filter((b) => b.id !== backlog.id));
    // o backend apaga as histórias do backlog em cascata
    setHus((atuais) => atuais.filter((hu) => hu.idBacklog !== backlog.id));
  };

  const historiaSalva = (hu: HistoriaUsuario, criterios: number) => {
    setHus((atuais) => upsert(atuais, hu));
    setTotalCriterios((atuais) => ({ ...atuais, [hu.id]: criterios }));
  };

  const historiaExcluida = (id: number) => {
    setHus((atuais) => atuais.filter((hu) => hu.id !== id));
  };

  const novaSprint = () => setModalBacklog({ sprint: true, backlog: null });

  return (
    <div className={`${outfit.className} flex min-h-full flex-1 flex-col bg-[#f4f1ec] text-[#2b2622]`}>
      <HeaderApp />
      {projeto && <HeaderProject projectName={projeto.nome} onNovaSprint={novaSprint} />}

      <main className="flex flex-1 items-start gap-5 overflow-x-auto p-6">
        <PanelEpic epicList={epicos} corEpico={corEpico} clickNovoEpico={() => setModalEpicoAberto(true)} />

        {carregando ? (
          <p className="text-sm text-[#7a716a]">Carregando projeto...</p>
        ) : erro ? (
          <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{erro}</p>
        ) : (
          <PanelBacklog
            backlogs={backlogs}
            sprints={sprints}
            hus={hus}
            epicos={epicos}
            corEpico={corEpico}
            totalCriterios={totalCriterios}
            onNovoBacklog={() => setModalBacklog({ sprint: false, backlog: null })}
            onNovaSprint={novaSprint}
            onNovaHistoria={(idBacklog) => setModalHistoria({ hu: null, idBacklog })}
            onAbrirHistoria={(hu) => setModalHistoria({ hu, idBacklog: hu.idBacklog })}
            onEditarBacklog={(backlog) => setModalBacklog({ sprint: backlog.sprint, backlog })}
            onExcluirBacklog={(backlog) => setModalBacklog({ sprint: backlog.sprint, backlog, excluir: true })}
          />
        )}
      </main>

      {/* Os modais só montam quando abertos, assim o estado inicial vem sempre dos dados atuais */}
      {projeto && modalHistoria && (
        <ModalHistoria
          hu={modalHistoria.hu}
          idBacklogInicial={modalHistoria.idBacklog}
          backlogs={todosBacklogs}
          epicos={epicos}
          onClose={() => setModalHistoria(null)}
          onSaved={historiaSalva}
          onDeleted={historiaExcluida}
        />
      )}

      {projeto && modalBacklog && (
        <ModalBacklog
          idProjeto={projeto.id}
          sprint={modalBacklog.sprint}
          backlog={modalBacklog.backlog}
          confirmarExclusao={modalBacklog.excluir}
          totalHistorias={
            modalBacklog.backlog ? hus.filter((hu) => hu.idBacklog === modalBacklog.backlog!.id).length : 0
          }
          onClose={() => setModalBacklog(null)}
          onSaved={backlogSalvo}
          onDeleted={backlogExcluido}
        />
      )}

      {projeto && (
        <ModalCriarEpico
          idProjeto={projeto.id}
          isOpen={modalEpicoAberto}
          onClose={() => setModalEpicoAberto(false)}
          onSuccess={(novo) => setEpicos((atuais) => [...atuais, novo])}
        />
      )}
    </div>
  );
}

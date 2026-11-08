"use client";

import HeaderProject from "@/components/headers/header-project";
import ModalCriarEpico from "@/components/modal-epico";
import { BacklogType } from "@/components/projeto/backlog/backlog";
import PanelSprint from "@/components/projeto/backlog/panel-backlog";
import { EpicType } from "@/components/projeto/epic/epic";
import PanelEpic from "@/components/projeto/epic/panel-epic";
import { getProjeto, ProjetoInfo } from "@/lib/projeto";
import { redirect, RedirectType } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [erro, setErro] = useState<string | null>(null);

  const [projeto, setProjeto] = useState<ProjetoInfo | null>(null);
  const [productBacklog, setProductBacklog] = useState<BacklogType | null>(
    null,
  );
  const [sprints, setSprints] = useState<BacklogType[]>([]);
  const [epicos, setEpicos] = useState<EpicType[]>([]);
  // const [hu, setHU] = useState<HUType>();
  const [modalEpicoAberto, setModalEpicoAberto] = useState(false);
  const [modalHUAberto, setModalHUAberto] = useState(false);

  useEffect(() => {
    const obterProjeto = () => {
      const proj = getProjeto();
      if (!proj) {
        redirect("/projetos", RedirectType.replace);
      }
      setProjeto(proj);
    };

    const checarUsuario = () => {
      if (!getUsuarioLogado()) {
        redirect("/", RedirectType.replace);
      } else return true;
    };

    const carregarBacklogs = async () => {
      try {
        if (!checarUsuario() || !projeto) return;

        const response = await fetch(
          `${API_URL}/backlog?idProjeto=${projeto.id}`,
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(mensagemDeErro(data, "Erro ao carregar projetos."));
        }

        // separa product backlog das sprints
        setSprints([]);
        // NOTE: é preciso garantir que essa tipagem funciona
        data.map((backlog: BacklogType) => {
          if (!backlog.sprint) setProductBacklog(backlog);
          else setSprints([...sprints, backlog]);
        });
      } catch (err) {
        setErro(
          err instanceof Error
            ? err.message
            : "Falha ao conectar com o backend.",
        );
      }
    };

    const carregarEpicos = async () => {
      try {
        if (!checarUsuario() || !projeto) return;

        const response = await fetch(
          `${API_URL}/epico?idProjeto=${projeto.id}`,
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(mensagemDeErro(data, "Erro ao carregar épicos."));
        }

        setEpicos(data);
      } catch (err) {
        setErro(
          err instanceof Error
            ? err.message
            : "Falha ao conectar com o backend.",
        );
      }
    };

    obterProjeto();
    carregarBacklogs();
    carregarEpicos();
  }, [projeto, sprints, epicos]);

  return (
    <div>
      <header className="header-page">
        {projeto &&
          HeaderProject({
            projectId: projeto.id,
            projectName: projeto.nome,
          })}
      </header>

      {PanelEpic({
        epicList: epicos,
        clickNovoEpico: () => {
          setModalEpicoAberto(true);
        },
      })}

      {PanelSprint({
        productBacklog: productBacklog,
        sprintList: sprints,
        clickNovaSprint: () => {
          // setModalSprintAberto(true);
        },
      })}

      {projeto && (
        <ModalCriarEpico
          idProjeto={projeto.id}
          isOpen={modalEpicoAberto}
          onClose={() => {
            setModalEpicoAberto(false);
          }}
          onSuccess={(novoEpico) => {
            setEpicos([...epicos, novoEpico]);
          }}
        />
      )}

      {/* TODO: modais de backlog/sprint (criar, editar, excluir), epico (editar, excluir), HU (criar, editar, excluir) */}
    </div>
  );
}

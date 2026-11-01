"use client";

import HeaderApp from "@/components/headers/header-app";
import HeaderProject from "@/components/headers/header-project";
import { BacklogType } from "@/components/projeto/backlog/backlog";
import PanelSprint from "@/components/projeto/backlog/panel-backlog";
import { EpicType } from "@/components/projeto/epic/epic";
import PanelEpic from "@/components/projeto/epic/panel-epic";
import { getProjeto, ProjetoInfo } from "@/lib/projeto";
import { useEffect, useState } from "react";

// TODO: instanciação de modais on click

export default function Page() {
  const [carregando, setCarregando] = useState(true);
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
        // TODO: caso projeto não esteja selecionado, redirecionar para tela de projetos
        return false;
      }
      setProjeto(proj);
    };

    const checarUsuario = () => {
      if (!getUsuarioLogado()) {
        // TODO: caso usuário não esteja logado, manda para tela de login
        return false;
      }
      return true;
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
      } finally {
        setCarregando(false);
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
      } finally {
        setCarregando(false);
      }
    };

    obterProjeto();
    carregarBacklogs();
    carregarEpicos();
  }, [projeto, sprints, epicos]);

  return (
    <div>
      <header className="header-page">
        {HeaderApp()}

        {projeto &&
          HeaderProject({
            projectId: projeto.id,
            projectName: projeto.nome,
          })}
      </header>

      {PanelEpic({ epicList: epicos })}

      {PanelSprint({ productBacklog: productBacklog, sprintList: sprints })}
    </div>
  );
}

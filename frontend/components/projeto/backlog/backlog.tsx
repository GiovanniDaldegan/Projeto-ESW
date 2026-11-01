import { useEffect, useState } from "react";
import HU, { HUType } from "../hu";

export interface BacklogType {
  id: number;
  idProjeto: number;
  nome: string;
  descricao: string;
  sprint: boolean;
}

interface BacklogProps {
  backlog: BacklogType;
}

export default function Backlog({ backlog }: BacklogProps) {
  //const [erro, setErro] = useState<string | null>(null);
  const [hus, setHUs] = useState<HUType[]>([]);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const carregar = async () => {
      try {
        const response = await fetch(
          `${API_URL}/historia-usuario?idBacklog=${backlog.id}`,
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            mensagemDeErro(
              data,
              `Erro ao carregar histórias de usuário do backlog #${backlog.id}.`,
            ),
          );
        }

        setHUs(data);
      } catch (err) {
        // TODO: avaliar como é a melhor forma de registrar erros em componentes
        alert(
          err instanceof Error
            ? err.message
            : "Falha ao conectar com o backend.",
        );
        /*
        setErro(
          err instanceof Error
            ? err.message
            : "Falha ao conectar com o backend.",
        );
        */
      }
    };

    carregar();
  }, [backlog.id]);

  return (
    <div className="backlog">
      <p className="name-backlog">{backlog.nome}</p>
      <p className="description-backlog">{backlog.descricao}</p>
      <span className="count-backlog">{count}</span>

      <button
        className="edit-backlog"
        onClick={() => {
          // TODO: instanciar modal de edição de backlog
        }}
      >
        Editar
      </button>

      {hus.map((hu) => {
        setCount(count + 1);
        return <HU key={hu.id} hu={hu} />;
      })}
    </div>
  );
}

import { useEffect, useState } from "react";
import HU, { HUType } from "../hu";

export interface SprintType {
  id: number;
  idProjeto: number;
  nome: string;
  descricao: string;
  sprint: boolean;
}

interface SprintProps {
  sprint: SprintType;
}

export default function Backlog({ sprint }: SprintProps) {
  const [hus, setHUs] = useState<HUType[]>([]);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const carregar = async () => {
      try {
        const response = await fetch(
          `${API_URL}/historia-usuario?idBacklog=${sprint.id}`,
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            mensagemDeErro(
              data,
              `Erro ao carregar histórias de usuário do sprint #${sprint.id}.`,
            ),
          );
        }

        setHUs(data);
      } catch (err) {
        alert(
          err instanceof Error
            ? err.message
            : "Falha ao conectar com o backend.",
        );
      }
    };

    carregar();
  }, [sprint.id]);

  return (
    <div className="sprint">
      <p className="name-sprint">{sprint.nome}</p>
      <p className="description-sprint">{sprint.descricao}</p>
      <span className="count-sprint">{count}</span>

      <button
        className="edit-sprint"
        onClick={() => {
          // TODO: instanciar modal de edição de sprint
        }}
      >
        Editar
      </button>
      <button
        className="button-delete-sprint"
        onClick={() => {
          // TODO: instanciar modal de confirmar exclusão
        }}
      >
        Excluir
      </button>

      {hus.map((hu) => {
        setCount(count + 1);
        return <HU key={hu.id} hu={hu} />;
      })}
    </div>
  );
}

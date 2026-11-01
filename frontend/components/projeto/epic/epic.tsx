import { useEffect, useState } from "react";
import { HUType } from "../hu";

export interface EpicType {
  id: number;
  idProjeto: number;
  nome: string;
  descricao: string;
}

interface EpicProps {
  epic: EpicType;
}

export default function Epic({ epic }: EpicProps) {
  const [hus, setHUs] = useState<HUType[]>([]);

  useEffect(() => {
    const carregar = async () => {
      try {
        const response = await fetch(
          `${API_URL}/historia-usuario?idEpic=${epic.id}`,
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            mensagemDeErro(
              data,
              `Erro ao carregar histórias de usuário do épico #${epic.id}.`,
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
      }
    };

    carregar();
  }, [epic.id]);

  return (
    <div
      className="epic"
      // onClick={() => {
      //   // TODO: instanciar modal de HUs atribuídas ??
      // }}
    >
      <p className="title-epic">{epic.nome}</p>
      <p className="description-epic">{epic.descricao}</p>
    </div>
  );
}

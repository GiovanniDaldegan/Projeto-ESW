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

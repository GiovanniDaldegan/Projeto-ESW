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
  return (
    <div className="backlog">
      <p className="name-backlog">{backlogName}</p>
      <p className="description-backlog">{backlogDescription}</p>
      <p className="count-backlog">16</p>

      <button className="edit-backlog">Editar</button>
      {!isProdBacklog && (
        <button className="button-delete-backlog">Excluir</button>
      )}

      {HU({
        // placeholder
        huId: 1,
        huName: "1",
        huDescr: " 1",
        huTag: "Must Have",
        huPoints: 33,
        huReach: 20,
        huImpact: 2,
        huConfidence: 0.8,
        huEffort: 4,
      })}
      {/* lista HU */}
    </div>
  );
}

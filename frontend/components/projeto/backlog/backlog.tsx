// import HU from "@/components/projeto/hu/hu";

import HU from "@/components/projeto/hu";

interface BacklogProps {
  backlogId: number;
  backlogName: string;
  backlogDescr: string;
  isProdBacklog: boolean;
  huList: [];
}

export default function Backlog({
  backlogId,
  backlogName,
  backlogDescr,
  isProdBacklog,
  huList,
}: BacklogProps) {
  return (
    <div className="backlog">
      <p className="name-backlog">{backlogName}</p>
      <p className="descr-backlog">{backlogDescr}</p>
      <p className="count-backlog">16</p>

      <button className="edit-backlog">Editar</button>
      {!isProdBacklog && <button className="del-backlog">Excluir</button>}

      {HU({
        // placeholder
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

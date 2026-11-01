import Backlog, { BacklogType } from "./backlog";

interface PanelBacklogProps {
  backlogList: BacklogType[];
}

export default function PanelBacklog({ backlogList }: PanelBacklogProps) {
  return (
    <div className="panel-backlog">
      {backlogs.map((backlog) => (
        <Backlog key={backlog.id} backlog={backlog} />
      ))}

      <button
        className="button-new-backlog"
        onClick={() => {
          // TODO: instanciar modal de novo backlog
        }}
      >
        + Novo Backlog
      </button>
    </div>
  );
}

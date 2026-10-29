import Backlog from "@/components/projeto/backlog/backlog";

interface PanelBacklogProps {
  backlogList: [];
}

export default function PanelBacklog({ backlogList }: PanelBacklogProps) {
  return (
    <div className="panel-backlog">
      {Backlog({
        // placeholder
        backlogId: 1,
        backlogName: "Product Backlog",
        backlogDescr: "Muito top backlog",
        isProdBacklog: true,
        huList: [],
      })}

      {/* colunas backlogs */}
    </div>
  );
}

import Backlog, { BacklogType } from "./backlog";

interface PanelBacklogProps {
  productBacklog: BacklogType | null;
  sprintList: BacklogType[];
  clickNovaSprint: () => void;
}

export default function PanelBacklog({
  productBacklog,
  sprintList,
  clickNovaSprint,
}: PanelBacklogProps) {
  /*
  const [backlogs, setBacklogs] = useState<BacklogType[]>([]);

  useEffect(() => {
    const carregar = async () => {
      setBacklogs(backlogList);
    };

    carregar();
  }, [backlogList]);
  */

  return (
    <div className="panel-backlog">
      {productBacklog && (
        <Backlog key={productBacklog.id} backlog={productBacklog} />
      )}

      {sprintList.map((backlog) => (
        <Backlog key={backlog.id} backlog={backlog} />
      ))}

      <button
        className="button-new-backlog"
        onClick={() => {
          clickNovaSprint();
        }}
      >
        + Novo Backlog
      </button>
    </div>
  );
}

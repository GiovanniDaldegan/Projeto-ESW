import Epic, { EpicType } from "./epic";

interface PanelEpicProps {
  epicList: EpicType[];
}

export default function PanelEpic({ epicList }: PanelEpicProps) {
  return (
    <div className="panel-epic">
      <h2 className="epics">Épicos</h2>
      <button className="button-new-epic">+ Novo</button>

      {epicList.map((epic) => (
        <Epic key={epic.id} epic={epic} />
      ))}
    </div>
  );
}

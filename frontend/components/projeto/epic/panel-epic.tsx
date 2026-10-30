interface PanelEpicProps {
  epicList: [];
}

export default function PanelEpic({ epicList }: PanelEpicProps) {
  return (
    <div className="panel-epic">
      <h2 className="epics">Épicos</h2>
      <button className="button-new-epic">+ Novo</button>

      {/* N epicos */}
    </div>
  );
}

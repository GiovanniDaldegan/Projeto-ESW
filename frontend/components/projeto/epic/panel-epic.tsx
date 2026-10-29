interface PanelEpicProps {
  epicList: [];
}

export default function PanelEpic({epicList} : PanelEpicProps) {
  return (
    <div className="epic-panel">
      <h2>Épicos</h2>
      <button>+ Novo</button>

      {/* N epicos */}
    </div>
  );
}

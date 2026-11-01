interface HeaderProjectProps {
  projectId: number;
  projectName: string;
}

export default function HeaderProject({
  projectId,
  projectName,
}: HeaderProjectProps) {
  return (
    <div className="header-project">
      <button
        className="button-back"
        onClick={() => {
          // TODO: redirecionar para tela de painel de projetos
        }}
      >
        Projetos
      </button>
      <h1 className="name-project">{projectName}</h1>
    </div>
  );
}

interface HeaderProjectProps {
  projectName: string;
}

export default function HeaderProject({ projectName }: HeaderProjectProps) {
  return (
    <div className="header-project">
      <button>Projetos</button>
      <h1>{projectName}</h1>
      <p>Descrição do Projeto #1</p>
    </div>
  );
}

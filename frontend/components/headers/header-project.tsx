interface HeaderProjectProps {
  projectId: number;
  projectName: string;
  projectDescription: string;
}

export default function HeaderProject({
  projectId,
  projectName,
  projectDescription,
}: HeaderProjectProps) {
  return (
    <div className="header-project">
      <button className="button-back">Projetos</button>
      <h1 className="name-project">{projectName}</h1>
      <p className="description-project">{projectDescription}</p>
    </div>
  );
}

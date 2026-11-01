import { redirect, RedirectType } from 'next/navigation';

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
          redirect("/projeto", RedirectType.push);
        }}
      >
        Projetos
      </button>
      <h1 className="name-project">{projectName} #{projectId}</h1>
    </div>
  );
}

export interface HUType {
  id: number;
  idProjeto: number;
  nome: string;
  descricao: string;
  tag: string;
  pontos: number;
  reach: number;
  impact: number;
  confidence: number;
  effort: number;
}

interface HUProps {
  hu: HUType;
}

export default function HU({ hu }: HUProps) {
  return (
    <div
      className="hu"
      onClick={() => {
        // TODO: instanciar modal de HU
      }}
    >
      <p className="name-hu">{hu.nome}</p>
      <p className="description-hu">{hu.descricao}</p>
      <span className="tag-hu">{hu.tag}</span>
      <span className="points-hu">{hu.pontos}</span>
      <span className="rice-hu">
        {(hu.reach * hu.impact * hu.confidence) / hu.effort}
      </span>
      <button
        className="button-edit-hu"
        onClick={() => {
          // TODO: instanciar modal de edição de HU
        }}
      >
        X
      </button>
      <button
        className="button-delete-hu"
        onClick={() => {
          // TODO: instanciar modal de confirmar exclusão
        }}
      >
        X
      </button>
    </div>
  );
}

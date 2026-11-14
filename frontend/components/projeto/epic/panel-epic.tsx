import Epic from './epic';
import type { Epico } from '@/lib/tipos';

interface PanelEpicProps {
  epicList: Epico[];
  corEpico: (idEpico: number) => string;
  clickNovoEpico: () => void;
  onEditarEpico?: (epico: Epico) => void;
  onExcluirEpico?: (id: number) => void;
}

export default function PanelEpic({
  epicList,
  corEpico,
  clickNovoEpico,
  onEditarEpico,
  onExcluirEpico,
}: PanelEpicProps) {
  return (
    <aside className="w-56 shrink-0 rounded-2xl border border-[#e7e1d8] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold">Épicos</h2>
        <button
          type="button"
          onClick={clickNovoEpico}
          className="text-xs font-semibold text-[#4a7bd0] transition-colors hover:text-[#3f6cbc]"
        >
          + Novo
        </button>
      </div>

      {epicList.length === 0 ? (
        <p className="mt-4 text-xs text-[#7a716a]">Nenhum épico ainda.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {epicList.map((epic) => (
            <div key={epic.id} className="group flex items-center justify-between gap-2">
              <Epic epic={epic} cor={corEpico(epic.id)} />
              <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                {onEditarEpico && (
                  <button
                    type="button"
                    title="Editar épico"
                    onClick={() => onEditarEpico(epic)}
                    className="rounded p-1 text-[#7a716a] hover:bg-gray-100 hover:text-[#2b2622]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    </svg>
                  </button>
                )}
                {onExcluirEpico && (
                  <button
                    type="button"
                    title="Excluir épico"
                    onClick={() => onExcluirEpico(epic.id)}
                    className="rounded p-1 text-[#7a716a] hover:bg-red-50 hover:text-red-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </ul>
      )}
    </aside>
  );
}
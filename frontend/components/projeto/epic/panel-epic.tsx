import Epic from './epic';
import type { Epico } from '@/lib/tipos';

interface PanelEpicProps {
  epicList: Epico[];
  corEpico: (idEpico: number) => string;
  clickNovoEpico: () => void;
}

export default function PanelEpic({ epicList, corEpico, clickNovoEpico }: PanelEpicProps) {
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
            <Epic key={epic.id} epic={epic} cor={corEpico(epic.id)} />
          ))}
        </ul>
      )}
    </aside>
  );
}

import HU from '../hu';
import { IconeLapis, IconeLixeira, IconeMais } from '@/components/icones';
import { formatarData } from '@/lib/historia';
import type { Backlog as BacklogType, Epico, HistoriaUsuario } from '@/lib/tipos';

interface BacklogProps {
  backlog: BacklogType;
  hus: HistoriaUsuario[];
  epicos: Epico[];
  corEpico: (idEpico: number) => string;
  totalCriterios: Record<number, number>;
  onNovaHistoria: () => void;
  onAbrirHistoria: (hu: HistoriaUsuario) => void;
  onEditar: () => void;
  onExcluir: () => void;
}

const botaoIcone =
  'rounded-md p-1.5 text-[#7a716a] transition-colors hover:bg-white hover:text-[#2b2622]';

export default function Backlog({
  backlog,
  hus,
  epicos,
  corEpico,
  totalCriterios,
  onNovaHistoria,
  onAbrirHistoria,
  onEditar,
  onExcluir,
}: BacklogProps) {
  return (
    <section className="flex w-80 shrink-0 flex-col gap-3">
      <div className="flex items-start justify-between gap-2 px-1">
        <div className="flex min-w-0 items-start gap-2">
          <span
            className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${backlog.sprint ? 'bg-[#6f9a74]' : 'bg-[#4a7bd0]'}`}
          />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="truncate text-sm font-bold">{backlog.nome}</h2>
              <span className="rounded-full bg-[#e7e1d8] px-2 py-0.5 text-xs font-semibold text-[#5c534c]">
                {hus.length}
              </span>
            </div>
            {backlog.sprint && (
              <p className="text-xs text-[#7a716a]">
                {formatarData(backlog.init)} – {formatarData(backlog.finish)}
              </p>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center">
          <button type="button" onClick={onNovaHistoria} className={botaoIcone} aria-label="Nova história">
            <IconeMais />
          </button>
          <button type="button" onClick={onEditar} className={botaoIcone} aria-label={`Editar ${backlog.nome}`}>
            <IconeLapis />
          </button>
          <button
            type="button"
            onClick={onExcluir}
            className="rounded-md p-1.5 text-[#7a716a] transition-colors hover:bg-white hover:text-red-600"
            aria-label={`Excluir ${backlog.nome}`}
          >
            <IconeLixeira />
          </button>
        </div>
      </div>

      {hus.length === 0 ? (
        <button
          type="button"
          onClick={onNovaHistoria}
          className="rounded-xl border border-dashed border-[#d8d0c5] px-4 py-6 text-sm text-[#7a716a] transition-colors hover:border-[#4a7bd0] hover:text-[#4a7bd0]"
        >
          + Adicionar história
        </button>
      ) : (
        hus.map((hu) => (
          <HU
            key={hu.id}
            hu={hu}
            epico={epicos.find((e) => e.id === hu.idEpico)}
            corEpico={hu.idEpico !== null ? corEpico(hu.idEpico) : undefined}
            totalCriterios={totalCriterios[hu.id] ?? 0}
            onClick={() => onAbrirHistoria(hu)}
          />
        ))
      )}
    </section>
  );
}

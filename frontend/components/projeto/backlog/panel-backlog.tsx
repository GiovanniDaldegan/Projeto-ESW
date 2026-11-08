import Backlog from './backlog';
import { IconeRaio } from '@/components/icones';
import type { Backlog as BacklogType, Epico, HistoriaUsuario } from '@/lib/tipos';

interface PanelBacklogProps {
  backlogs: BacklogType[];
  sprints: BacklogType[];
  hus: HistoriaUsuario[];
  epicos: Epico[];
  corEpico: (idEpico: number) => string;
  totalCriterios: Record<number, number>;
  onNovoBacklog: () => void;
  onNovaSprint: () => void;
  onNovaHistoria: (idBacklog: number) => void;
  onAbrirHistoria: (hu: HistoriaUsuario) => void;
  onEditarBacklog: (backlog: BacklogType) => void;
  onExcluirBacklog: (backlog: BacklogType) => void;
}

export default function PanelBacklog({
  backlogs,
  sprints,
  hus,
  onNovoBacklog,
  onNovaSprint,
  onNovaHistoria,
  onEditarBacklog,
  onExcluirBacklog,
  ...resto
}: PanelBacklogProps) {
  return (
    <div className="flex items-start gap-5">
      {/* Criar um projeto não cria o product backlog, então oferece a criação aqui */}
      {backlogs.length === 0 && (
        <section className="flex w-80 shrink-0 flex-col gap-3">
          <div className="flex items-center gap-2 px-1">
            <span className="h-2.5 w-2.5 rounded-full bg-[#4a7bd0]" />
            <h2 className="text-sm font-bold">Product Backlog</h2>
          </div>
          <button
            type="button"
            onClick={onNovoBacklog}
            className="rounded-xl border border-dashed border-[#d8d0c5] bg-white/50 px-4 py-8 text-sm text-[#7a716a] transition-colors hover:border-[#4a7bd0] hover:text-[#4a7bd0]"
          >
            + Criar product backlog
          </button>
        </section>
      )}

      {[...backlogs, ...sprints].map((backlog) => (
        <Backlog
          key={backlog.id}
          backlog={backlog}
          hus={hus.filter((hu) => hu.idBacklog === backlog.id)}
          onNovaHistoria={() => onNovaHistoria(backlog.id)}
          onEditar={() => onEditarBacklog(backlog)}
          onExcluir={() => onExcluirBacklog(backlog)}
          {...resto}
        />
      ))}

      <button
        type="button"
        onClick={onNovaSprint}
        className="flex min-h-[60vh] w-56 shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#d8d0c5] text-sm font-semibold text-[#7a716a] transition-colors hover:border-[#6f9a74] hover:text-[#5f8864]"
      >
        <IconeRaio className="h-6 w-6 text-[#d0a53f]" />
        + Nova Sprint
      </button>
    </div>
  );
}

import Link from 'next/link';
import { IconeMais, IconeVoltar } from '@/components/icones';

interface HeaderProjectProps {
  projectName: string;
  onNovaSprint: () => void;
}

export default function HeaderProject({ projectName, onNovaSprint }: HeaderProjectProps) {
  return (
    <div className="flex shrink-0 items-center justify-between gap-4 border-b border-[#e7e1d8] bg-white px-6 py-4">
      <div className="flex min-w-0 items-center gap-4">
        <Link
          href="/projetos"
          className="flex items-center gap-1.5 text-sm text-[#7a716a] transition-colors hover:text-[#2b2622]"
        >
          <IconeVoltar className="h-3.5 w-3.5" />
          Projetos
        </Link>
        <span className="h-5 w-px bg-[#e7e1d8]" aria-hidden />
        <h1 className="truncate text-lg font-bold text-[#2b2622]">{projectName}</h1>
      </div>

      <button
        type="button"
        onClick={onNovaSprint}
        className="flex shrink-0 items-center gap-1 rounded-lg bg-[#6f9a74] px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#5f8864]"
      >
        <IconeMais className="h-3.5 w-3.5" />
        Sprint
      </button>
    </div>
  );
}

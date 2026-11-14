import type { Epico } from '@/lib/tipos';

interface EpicProps {
  epic: Epico;
  cor: string;
}

export default function Epic({ epic, cor }: EpicProps) {
  return (
    <li className="flex items-center gap-2.5 text-sm">
      <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: cor }} />
      <span className="truncate">{epic.nome}</span>
    </li>
  );
}

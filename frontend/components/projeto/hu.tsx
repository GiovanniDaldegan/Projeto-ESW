import { MSCW, separarHistoria } from '@/lib/historia';
import type { Epico, HistoriaUsuario } from '@/lib/tipos';

interface HUProps {
  hu: HistoriaUsuario;
  epico?: Epico;
  corEpico?: string;
  totalCriterios: number;
  onClick: () => void;
}

const CORES_MSCW = {
  m: 'bg-[#e6eefb] text-[#4a7bd0]',
  s: 'bg-[#e9f1ea] text-[#5f8864]',
  c: 'bg-[#fbf0e3] text-[#b5732f]',
  w: 'bg-[#f1eeea] text-[#7a716a]',
};

function TextoHistoria({ texto }: { texto: string }) {
  const partes = separarHistoria(texto);
  if (!partes) return <>{texto}</>;
  return (
    <>
      Como um <strong className="font-semibold text-[#2b2622]">{partes.papel}</strong>, eu quero{' '}
      <strong className="font-semibold text-[#2b2622]">{partes.acao}</strong> para{' '}
      <strong className="font-semibold text-[#2b2622]">{partes.beneficio}</strong>
    </>
  );
}

export default function HU({ hu, epico, corEpico, totalCriterios, onClick }: HUProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-xl border border-[#e7e1d8] bg-white p-4 text-left shadow-sm transition-all hover:border-[#4a7bd0] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4a7bd0]"
    >
      {epico && (
        <span className="mb-2 flex items-center gap-1.5 text-xs font-semibold" style={{ color: corEpico }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: corEpico }} />
          {epico.nome}
        </span>
      )}

      <p className="text-sm leading-relaxed text-[#7a716a]">
        <TextoHistoria texto={hu.historia} />
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5 text-xs font-semibold">
        {hu.mscw && (
          <span className={`rounded-md px-2 py-0.5 ${CORES_MSCW[hu.mscw]}`}>
            {hu.mscw.toUpperCase()} — {MSCW[hu.mscw]}
          </span>
        )}
        {hu.storyPoints !== null && (
          <span className="rounded-md bg-[#f1eeea] px-2 py-0.5 text-[#5c534c]">{hu.storyPoints} pts</span>
        )}
        {hu.rice !== null && (
          <span className="rounded-md bg-[#e9f1ea] px-2 py-0.5 text-[#5f8864]">RICE: {hu.rice}</span>
        )}
        {totalCriterios > 0 && (
          <span className="rounded-md bg-[#fbf0e3] px-2 py-0.5 text-[#b5732f]">{totalCriterios} CA</span>
        )}
      </div>
    </button>
  );
}

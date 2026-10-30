export interface Projeto {
  id: number;
  nome: string;
  idUsuario: number;
}

interface CardProjetoProps {
  projeto: Projeto;
}

export default function CardProjeto({ projeto }: CardProjetoProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[#e7e1d8] bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <h2 className="text-base font-semibold text-[#2b2622]">{projeto.nome}</h2>
      <span className="w-fit rounded-full bg-[#e6eefb] px-2 py-0.5 text-xs font-semibold text-[#4a7bd0]">
        Projeto #{projeto.id}
      </span>
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { setProjeto } from '@/lib/projeto';

export interface Projeto {
  id: number;
  nome: string;
  idUsuario: number;
}

interface CardProjetoProps {
  projeto: Projeto;
  onEdit?: (projeto: Projeto) => void;
  onDelete?: (id: number) => void;
}

export default function CardProjeto({ projeto, onEdit, onDelete }: CardProjetoProps) {
  const router = useRouter();

  const abrirProjeto = () => {
    setProjeto(projeto);
    router.push('/gerenciar-projeto');
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={abrirProjeto}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') abrirProjeto();
      }}
      className="flex cursor-pointer flex-col gap-4 rounded-2xl border border-[#e7e1d8] bg-white p-5 shadow-sm transition-all hover:border-[#4a7bd0] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4a7bd0]"
    >
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-base font-semibold text-[#2b2622]">{projeto.nome}</h2>

        <div className="flex shrink-0 items-center gap-1">
          {onEdit && (
            <button
              type="button"
              title="Editar projeto"
              onClick={(e) => {
                e.stopPropagation(); // Impede que o clique abra o projeto
                onEdit(projeto);
              }}
              className="rounded-lg p-1.5 text-[#7a716a] transition-colors hover:bg-gray-100 hover:text-[#2b2622]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              </svg>
            </button>
          )}

          {onDelete && (
            <button
              type="button"
              title="Excluir projeto"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(projeto.id);
              }}
              className="rounded-lg p-1.5 text-[#7a716a] transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" x2="10" y1="11" y2="17" />
                <line x1="14" x2="14" y1="11" y2="17" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <span className="w-fit rounded-full bg-[#e6eefb] px-2 py-0.5 text-xs font-semibold text-[#4a7bd0]">
        Projeto #{projeto.id}
      </span>
    </div>
  );
}
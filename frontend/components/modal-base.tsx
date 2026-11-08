'use client';

import { useEffect } from 'react';

interface ModalBaseProps {
  titulo: string;
  onClose: () => void;
  children: React.ReactNode;
  largura?: string;
}

// Moldura comum dos modais: fundo escurecido, título, botão de fechar e Esc para sair
export default function ModalBase({ titulo, onClose, children, largura = 'max-w-md' }: ModalBaseProps) {
  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', aoTeclar);
    return () => window.removeEventListener('keydown', aoTeclar);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2b2622]/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        className={`flex max-h-[92vh] w-full ${largura} flex-col rounded-2xl bg-white text-[#2b2622] shadow-xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#efe9e1] px-6 py-4">
          <h2 className="text-lg font-bold">{titulo}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="rounded-lg px-2 py-1 text-[#7a716a] transition-colors hover:bg-[#f4f1ec] hover:text-[#2b2622]"
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

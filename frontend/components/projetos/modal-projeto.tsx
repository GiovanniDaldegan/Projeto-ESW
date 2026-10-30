'use client';

import { useState } from 'react';
import { API_URL, mensagemDeErro } from '@/lib/api';
import type { Projeto } from './card-projeto';

interface ModalCriarProjetoProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (novoProjeto: Projeto) => void;
  idUsuario: number;
}

export default function ModalCriarProjeto({
  isOpen,
  onClose,
  onSuccess,
  idUsuario,
}: ModalCriarProjetoProps) {
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  if (!isOpen) return null;

  const fechar = () => {
    setNome('');
    setErro(null);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro(null);

    try {
      const response = await fetch(`${API_URL}/projeto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome.trim(),
          idUsuario: Number(idUsuario),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(mensagemDeErro(data, 'Erro ao criar projeto.'));
      }

      onSuccess(data);
      fechar();
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Falha ao conectar com o backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#2b2622]/40 p-4 backdrop-blur-sm"
      onClick={fechar}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-projeto-titulo"
        className="w-full max-w-md rounded-2xl border border-[#e7e1d8] bg-white p-6 text-[#2b2622] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 id="modal-projeto-titulo" className="text-lg font-bold">
            Novo projeto
          </h2>
          <button
            type="button"
            onClick={fechar}
            aria-label="Fechar"
            className="rounded-lg px-2 py-1 text-[#7a716a] transition-colors hover:bg-[#f4f1ec] hover:text-[#2b2622]"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label htmlFor="nome-projeto" className="mb-1.5 block text-sm font-medium">
              Nome do projeto
            </label>
            <input
              id="nome-projeto"
              type="text"
              required
              autoFocus
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: App de Delivery"
              className="w-full rounded-lg border border-[#e7e1d8] bg-[#faf8f5] px-3.5 py-2.5 text-sm placeholder-[#a89f97] transition-all focus:border-[#4a7bd0] focus:outline-none focus:ring-1 focus:ring-[#4a7bd0]"
            />
          </div>

          {erro && (
            <p className="rounded-lg border border-red-200 bg-red-50 p-2.5 text-sm text-red-700">
              {erro}
            </p>
          )}

          <div className="flex justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={fechar}
              className="rounded-lg px-4 py-2 text-sm font-medium text-[#7a716a] transition-colors hover:bg-[#f4f1ec] hover:text-[#2b2622]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || !nome.trim()}
              className="rounded-lg bg-[#4a7bd0] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#3f6cbc] disabled:opacity-50"
            >
              {loading ? 'Criando...' : 'Criar projeto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';

interface ModalCriarProjetoProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (novoProjeto: any) => void;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro(null);

    try {
      // Rota no singular conforme definido no @Controller('projeto')
      const response = await fetch('http://localhost:3001/projeto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome.trim(),
          idUsuario: Number(idUsuario),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Captura mensagens do class-validator (que vêm em array) ou do NotFoundException
        const msg = Array.isArray(data.message) ? data.message.join(', ') : data.message;
        throw new Error(msg || 'Erro ao criar projeto.');
      }

      setNome('');
      onSuccess(data);
      onClose();
    } catch (err: any) {
      setErro(err.message || 'Falha ao conectar com o backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-xl bg-[#1e232d] border border-gray-700/60 shadow-2xl p-6 text-gray-100">
        <div className="flex items-center justify-between border-b border-gray-700/50 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <h2 className="text-base font-semibold text-white">Criar Novo Projeto</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">
              Nome do Projeto
            </label>
            <input
              type="text"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Plataforma de Pedidos Online"
              className="w-full rounded-lg bg-[#141820] border border-gray-700 px-3.5 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="text-xs text-gray-400">
            ID do Usuário Responsável: <span className="font-mono text-gray-200">#{idUsuario}</span>
          </div>

          {erro && (
            <p className="text-xs text-red-400 bg-red-950/40 border border-red-800/40 rounded p-2.5">
              {erro}
            </p>
          )}

          <div className="flex justify-end gap-2.5 pt-2 border-t border-gray-700/50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-white hover:bg-gray-800/60 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || !nome.trim()}
              className="px-4 py-2 text-xs font-medium bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg shadow transition-colors flex items-center gap-1.5"
            >
              {loading ? 'Criando...' : 'Salvar Projeto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import ModalBase from '@/components/modal-base';
import { chamarApi, textoDeErro } from '@/lib/api';
import { botaoPrimario, botaoSecundario, caixaErro, inputClasse, labelClasse } from '@/lib/estilos';
import type { Epico } from '@/lib/tipos';

interface ModalCriarEpicoProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (novoEpico: Epico) => void;
  idProjeto: number;
}

export default function ModalCriarEpico({ isOpen, onClose, onSuccess, idProjeto }: ModalCriarEpicoProps) {
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
      const novo = await chamarApi<Epico>(
        '/epico',
        { method: 'POST', body: { nome: nome.trim(), idProjeto: Number(idProjeto) } },
        'Erro ao cadastrar épico.',
      );
      onSuccess(novo);
      fechar();
    } catch (err) {
      setErro(textoDeErro(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalBase titulo="Novo épico" onClose={fechar}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nome-epico" className={labelClasse}>
            Nome do épico
          </label>
          <input
            id="nome-epico"
            type="text"
            required
            autoFocus
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Autenticação"
            className={inputClasse}
          />
        </div>

        {erro && <p className={caixaErro}>{erro}</p>}

        <div className="flex justify-end gap-2.5 border-t border-[#efe9e1] pt-4">
          <button type="button" onClick={fechar} className={botaoSecundario}>
            Cancelar
          </button>
          <button type="submit" disabled={loading || !nome.trim()} className={botaoPrimario}>
            {loading ? 'Salvando...' : 'Criar épico'}
          </button>
        </div>
      </form>
    </ModalBase>
  );
}

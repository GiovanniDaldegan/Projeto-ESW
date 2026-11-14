'use client';

import { useEffect, useState } from 'react';
import ModalBase from '@/components/modal-base';
import { chamarApi, textoDeErro } from '@/lib/api';
import { botaoPrimario, botaoSecundario, caixaErro, inputClasse, labelClasse } from '@/lib/estilos';
import type { Projeto } from './card-projeto';

interface ModalCriarProjetoProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (projetoSalvo: Projeto) => void;
  idUsuario: number;
  projeto?: Projeto | null;
}

export default function ModalCriarProjeto({
  isOpen,
  onClose,
  onSuccess,
  idUsuario,
  projeto,
}: ModalCriarProjetoProps) {
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    setNome(projeto ? projeto.nome : '');
    setErro(null);
  }, [projeto, isOpen]);

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
      const salvo = projeto
        ? await chamarApi<Projeto>(
            `/projeto/${projeto.id}`,
            { method: 'PATCH', body: { nome: nome.trim() } },
            'Erro ao editar projeto.',
          )
        : await chamarApi<Projeto>(
            '/projeto',
            { method: 'POST', body: { nome: nome.trim(), idUsuario: Number(idUsuario) } },
            'Erro ao criar projeto.',
          );

      onSuccess(salvo);
      fechar();
    } catch (err) {
      setErro(textoDeErro(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalBase titulo={projeto ? 'Editar projeto' : 'Novo projeto'} onClose={fechar}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nome-projeto" className={labelClasse}>
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
            className={inputClasse}
          />
        </div>

        {erro && <p className={caixaErro}>{erro}</p>}

        <div className="flex justify-end gap-2.5 border-t border-[#efe9e1] pt-4">
          <button type="button" onClick={fechar} className={botaoSecundario}>
            Cancelar
          </button>
          <button type="submit" disabled={loading || !nome.trim()} className={botaoPrimario}>
            {loading ? 'Salvando...' : projeto ? 'Salvar' : 'Criar projeto'}
          </button>
        </div>
      </form>
    </ModalBase>
  );
}
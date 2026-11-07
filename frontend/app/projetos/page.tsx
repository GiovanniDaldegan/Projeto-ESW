'use client';

import { useEffect, useState } from 'react';
import { Outfit } from 'next/font/google';
import CardProjeto, { type Projeto } from '@/components/projetos/card-projeto';
import ModalCriarProjeto from '@/components/projetos/modal-projeto';
import { API_URL, mensagemDeErro } from '@/lib/api';
import { getUsuarioLogado, type UsuarioLogado } from '@/lib/usuario-logado';

const outfit = Outfit({ subsets: ['latin'] });

export default function ProjetosPage() {
  // undefined = ainda lendo o localStorage; null = ninguém logado
  const [usuario, setUsuario] = useState<UsuarioLogado | null | undefined>(undefined);
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    let cancelado = false;

    const carregar = async () => {
      const logado = getUsuarioLogado();
      if (cancelado) return;
      setUsuario(logado);
      if (!logado) return;

      try {
        const response = await fetch(`${API_URL}/projeto?idUsuario=${logado.id}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(mensagemDeErro(data, 'Erro ao carregar projetos.'));
        }
        if (!cancelado) setProjetos(data);
      } catch (err) {
        if (!cancelado) {
          setErro(err instanceof Error ? err.message : 'Falha ao conectar com o backend.');
        }
      } finally {
        if (!cancelado) setCarregando(false);
      }
    };

    carregar();
    return () => {
      cancelado = true;
    };
  }, []);

  return (
    <div className={`${outfit.className} flex-1 bg-[#f4f1ec] text-[#2b2622]`}>
      <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
        <header className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Projetos</h1>
            <p className="mt-1 text-sm text-[#7a716a]">Gerencie seus projetos de software</p>
          </div>
          {usuario && (
            <button
              type="button"
              onClick={() => setModalAberto(true)}
              className="shrink-0 rounded-lg bg-[#4a7bd0] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#3f6cbc]"
            >
              + Novo projeto
            </button>
          )}
        </header>

        <section className="mt-8">
          {usuario === null ? (
            <p className="text-sm text-[#7a716a]">Faça login para ver seus projetos.</p>
          ) : usuario === undefined || carregando ? (
            <p className="text-sm text-[#7a716a]">Carregando projetos...</p>
          ) : erro ? (
            <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {erro}
            </p>
          ) : projetos.length === 0 ? (
            <p className="text-sm text-[#7a716a]">
              Você ainda não tem projetos. Clique em &quot;Novo projeto&quot; para começar.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projetos.map((projeto) => (
                <CardProjeto key={projeto.id} projeto={projeto} />
              ))}
            </div>
          )}
        </section>
      </main>

      {usuario && (
        <ModalCriarProjeto
          isOpen={modalAberto}
          onClose={() => setModalAberto(false)}
          onSuccess={(novo) => setProjetos((atuais) => [...atuais, novo])}
          idUsuario={usuario.id}
        />
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Outfit } from 'next/font/google';
import { API_URL, mensagemDeErro } from '@/lib/api';
import { setUsuarioLogado } from '@/lib/usuario-logado';

const outfit = Outfit({ subsets: ['latin'] });

type Modo = 'entrar' | 'cadastrar';

export default function LoginPage() {
  const router = useRouter();
  const [modo, setModo] = useState<Modo>('entrar');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const trocarModo = (novo: Modo) => {
    setModo(novo);
    setErro(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro(null);

    try {
      if (modo === 'cadastrar') {
        const response = await fetch(`${API_URL}/usuario`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome: nome.trim(), email: email.trim(), senha }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(mensagemDeErro(data, 'Erro ao criar conta.'));
        }
        // POST /usuario já devolve { id, nome, email }: entra direto
        setUsuarioLogado(data);
      } else {
        const response = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim(), senha }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(mensagemDeErro(data, 'Erro ao entrar.'));
        }
        setUsuarioLogado(data.usuario);
      }

      router.push('/projetos');
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Falha ao conectar com o backend.');
      setLoading(false);
    }
  };

  const abaClasse = (ativa: boolean) =>
    `flex-1 py-2 text-sm font-semibold transition-colors ${
      ativa ? 'bg-[#4a7bd0] text-white' : 'text-[#5c534c] hover:bg-[#f4f1ec]'
    }`;

  const inputClasse =
    'w-full rounded-lg border border-[#e7e1d8] bg-white px-3.5 py-2.5 text-sm placeholder-[#b5aca4] transition-all focus:border-[#4a7bd0] focus:outline-none focus:ring-1 focus:ring-[#4a7bd0]';

  const labelClasse = 'mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#7a716a]';

  return (
    <div
      className={`${outfit.className} flex flex-1 flex-col items-center justify-center bg-[#f4f1ec] px-4 py-10 text-[#2b2622]`}
    >
      <h1 className="mb-8 text-center text-3xl font-bold">Compreendendo o Ponto</h1>

      <div className="w-full max-w-sm rounded-2xl border border-[#e7e1d8] bg-white p-6 shadow-sm">
        <div className="flex overflow-hidden rounded-lg border border-[#e7e1d8]">
          <button
            type="button"
            onClick={() => trocarModo('entrar')}
            className={abaClasse(modo === 'entrar')}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => trocarModo('cadastrar')}
            className={abaClasse(modo === 'cadastrar')}
          >
            Criar conta
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {modo === 'cadastrar' && (
            <div>
              <label htmlFor="nome" className={labelClasse}>
                Nome
              </label>
              <input
                id="nome"
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome"
                autoComplete="name"
                className={inputClasse}
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className={labelClasse}>
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              autoComplete="email"
              className={inputClasse}
            />
          </div>

          <div>
            <label htmlFor="senha" className={labelClasse}>
              Senha
            </label>
            <input
              id="senha"
              type="password"
              required
              minLength={modo === 'cadastrar' ? 6 : undefined}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              autoComplete={modo === 'cadastrar' ? 'new-password' : 'current-password'}
              className={inputClasse}
            />
          </div>

          {erro && (
            <p className="rounded-lg border border-red-200 bg-red-50 p-2.5 text-sm text-red-700">
              {erro}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#4a7bd0] px-4 py-2.5 text-left text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#3f6cbc] disabled:opacity-50"
          >
            {loading
              ? modo === 'cadastrar'
                ? 'Criando conta...'
                : 'Entrando...'
              : modo === 'cadastrar'
                ? 'Criar conta'
                : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}

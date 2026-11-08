'use client';

import { useRouter } from 'next/navigation';

export default function HeaderApp() {
  const router = useRouter();

  const sair = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('projeto');
    // redirect() não funciona em event handlers; usa o router
    router.replace('/login');
  };

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-[#e7e1d8] bg-white px-6">
      <p className="text-base font-bold text-[#2b2622]">Compreendendo o Ponto</p>
      <button
        type="button"
        onClick={sair}
        className="rounded-lg px-3 py-1.5 text-sm font-medium text-[#7a716a] transition-colors hover:bg-[#f4f1ec] hover:text-[#2b2622]"
      >
        Sair
      </button>
    </header>
  );
}

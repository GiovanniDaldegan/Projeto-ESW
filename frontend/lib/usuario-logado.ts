export interface UsuarioLogado {
  id: number;
  nome: string;
  email: string;
}

// A tela de login deve salvar aqui o `usuario` retornado por POST /auth/login
const CHAVE = 'usuario';

export function getUsuarioLogado(): UsuarioLogado | null {
  try {
    const salvo = localStorage.getItem(CHAVE);
    return salvo ? JSON.parse(salvo) : null;
  } catch {
    return null;
  }
}

export function setUsuarioLogado(usuario: UsuarioLogado) {
  const { id, nome, email } = usuario;
  localStorage.setItem(CHAVE, JSON.stringify({ id, nome, email }));
}

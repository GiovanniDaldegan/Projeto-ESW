export interface ProjetoInfo {
  id: number;
  nome: string;
}

const CHAVE = "projeto";

export function getProjeto(): ProjetoInfo | null {
  try {
    const salvo = localStorage.getItem(CHAVE);
    return salvo ? JSON.parse(salvo) : null;
  } catch {
    return null;
  }
}

export function setProjeto(projeto: ProjetoInfo) {
  const { id, nome } = projeto;
  localStorage.setItem(CHAVE, JSON.stringify({ id, nome }));
}

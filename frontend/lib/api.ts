export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

// Converte a resposta de erro do Nest (class-validator manda array) em texto
export function mensagemDeErro(data: { message?: string | string[] }, padrao: string) {
  const msg = Array.isArray(data.message) ? data.message.join(', ') : data.message;
  return msg || padrao;
}

// Chamada direta ao backend: lança Error com a mensagem do Nest quando a resposta não é ok
export async function chamarApi<T>(
  caminho: string,
  opcoes: { method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'; body?: unknown } = {},
  padrao = 'Erro ao comunicar com o backend.',
): Promise<T> {
  const temBody = opcoes.body !== undefined;
  const response = await fetch(`${API_URL}${caminho}`, {
    method: opcoes.method ?? 'GET',
    headers: temBody ? { 'Content-Type': 'application/json' } : undefined,
    body: temBody ? JSON.stringify(opcoes.body) : undefined,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(mensagemDeErro(data, padrao));
  return data as T;
}

export function textoDeErro(err: unknown) {
  // fetch lança TypeError quando o backend está fora do ar
  if (err instanceof TypeError || !(err instanceof Error)) return 'Falha ao conectar com o backend.';
  return err.message;
}

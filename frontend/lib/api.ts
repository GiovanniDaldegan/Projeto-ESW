export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

// Converte a resposta de erro do Nest (class-validator manda array) em texto
export function mensagemDeErro(data: { message?: string | string[] }, padrao: string) {
  const msg = Array.isArray(data.message) ? data.message.join(', ') : data.message;
  return msg || padrao;
}

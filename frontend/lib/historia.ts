export const MSCW = {
  m: 'Must Have',
  s: 'Should Have',
  c: 'Could Have',
  w: "Won't Have",
} as const;

export type Mscw = keyof typeof MSCW;

export function montarHistoria(papel: string, acao: string, beneficio: string) {
  return `Como um ${papel.trim()}, eu quero ${acao.trim()} para ${beneficio.trim()}`;
}

export function separarHistoria(texto: string) {
  const partes = texto.match(/^Como uma? ([\s\S]+?), eu quero ([\s\S]+?) para ([\s\S]+)$/);
  if (!partes) return null;
  return { papel: partes[1], acao: partes[2], beneficio: partes[3] };
}

// RICE = (Reach × Impact × Confidence%) / Esforço — o esforço é a pontuação em story points
export function calcularRice(
  reach: number | null,
  impact: number | null,
  confidence: number | null,
  esforco: number | null,
) {
  if (reach === null || impact === null || confidence === null || !esforco) return null;
  return Math.round(((reach * impact * (confidence / 100)) / esforco) * 10) / 10;
}

// Lê só a parte da data do ISO para não sofrer com fuso horário
export function formatarData(iso: string | null) {
  if (!iso) return '';
  const [ano, mes, dia] = iso.slice(0, 10).split('-');
  return `${dia}/${mes}/${ano}`;
}

export const CORES_EPICO = ['#4a7bd0', '#6f9a74', '#d08a4a', '#a46cc4', '#c95f6f', '#3f9ea3'];

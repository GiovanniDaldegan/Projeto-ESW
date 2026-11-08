// Formato das entidades como o backend devolve
export interface Backlog {
  id: number;
  idProjeto: number;
  nome: string;
  sprint: boolean;
  init: string | null;
  finish: string | null;
}

export interface Epico {
  id: number;
  idProjeto: number;
  nome: string;
}

export interface HistoriaUsuario {
  id: number;
  idBacklog: number;
  idEpico: number | null;
  historia: string;
  mscw: 'm' | 's' | 'c' | 'w' | null;
  storyPoints: number | null;
  reach: number | null;
  impact: number | null;
  confidence: number | null;
  rice: number | null;
}

export interface CriterioAceitacao {
  id: number;
  idHu: number;
  dado: string;
  quando: string;
  entao: string;
}

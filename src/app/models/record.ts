export interface Record {

  id?: string;
  numeroOS?: string;
  nomeCliente?: string;
  vendedor?: string;
  tipoServico?: string;
  materialConferido?: string[];
  ferramentasExecucao?: string;
  data?: number;
  horaSaida?: string;
  horaChegada?: string;
  concluida?: string;
  observacoes?: string;
  usuarioId?: string;
}

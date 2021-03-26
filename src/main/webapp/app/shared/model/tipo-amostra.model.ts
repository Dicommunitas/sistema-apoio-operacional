import { IAmostra } from 'app/shared/model/amostra.model';

export interface ITipoAmostra {
  id?: number;
  descricao?: string;
  tipoAmostra?: IAmostra;
  amostra?: IAmostra;
}

export class TipoAmostra implements ITipoAmostra {
  constructor(public id?: number, public descricao?: string, public tipoAmostra?: IAmostra, public amostra?: IAmostra) {}
}

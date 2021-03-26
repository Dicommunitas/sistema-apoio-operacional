import { IAmostra } from 'app/shared/model/amostra.model';

export interface ITipoAmostra {
  id?: number;
  descricao?: string;
  amostra?: IAmostra;
}

export class TipoAmostra implements ITipoAmostra {
  constructor(public id?: number, public descricao?: string, public amostra?: IAmostra) {}
}

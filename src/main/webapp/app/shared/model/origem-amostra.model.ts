import { IAmostra } from 'app/shared/model/amostra.model';

export interface IOrigemAmostra {
  id?: number;
  descricao?: string;
  origemAmostra?: IAmostra;
  amostra?: IAmostra;
}

export class OrigemAmostra implements IOrigemAmostra {
  constructor(public id?: number, public descricao?: string, public origemAmostra?: IAmostra, public amostra?: IAmostra) {}
}

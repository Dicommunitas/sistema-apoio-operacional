export interface ITipoAmostra {
  id?: number;
  descricao?: string;
}

export class TipoAmostra implements ITipoAmostra {
  constructor(public id?: number, public descricao?: string) {}
}

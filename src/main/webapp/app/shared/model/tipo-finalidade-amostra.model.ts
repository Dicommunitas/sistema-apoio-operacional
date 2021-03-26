export interface ITipoFinalidadeAmostra {
  id?: number;
  descricao?: string;
}

export class TipoFinalidadeAmostra implements ITipoFinalidadeAmostra {
  constructor(public id?: number, public descricao?: string) {}
}

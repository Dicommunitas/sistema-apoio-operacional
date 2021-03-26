export interface ITipoRelatorio {
  id?: number;
  descricao?: string;
}

export class TipoRelatorio implements ITipoRelatorio {
  constructor(public id?: number, public descricao?: string) {}
}

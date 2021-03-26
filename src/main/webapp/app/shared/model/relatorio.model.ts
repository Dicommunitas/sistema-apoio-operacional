export interface IRelatorio {
  id?: number;
  descricao?: any;
}

export class Relatorio implements IRelatorio {
  constructor(public id?: number, public descricao?: any) {}
}

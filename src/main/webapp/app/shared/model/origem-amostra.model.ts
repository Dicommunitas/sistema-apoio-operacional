export interface IOrigemAmostra {
  id?: number;
  descricao?: string;
}

export class OrigemAmostra implements IOrigemAmostra {
  constructor(public id?: number, public descricao?: string) {}
}

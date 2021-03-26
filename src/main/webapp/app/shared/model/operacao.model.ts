import { Moment } from 'moment';

export interface IOperacao {
  id?: number;
  descricao?: string;
  inicio?: Moment;
  fim?: Moment;
  quantidadeAmostras?: number;
  observacao?: any;
}

export class Operacao implements IOperacao {
  constructor(
    public id?: number,
    public descricao?: string,
    public inicio?: Moment,
    public fim?: Moment,
    public quantidadeAmostras?: number,
    public observacao?: any
  ) {}
}

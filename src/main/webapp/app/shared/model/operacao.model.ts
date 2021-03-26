import { Moment } from 'moment';
import { IAmostra } from 'app/shared/model/amostra.model';

export interface IOperacao {
  id?: number;
  descricao?: string;
  inicio?: Moment;
  fim?: Moment;
  quantidadeAmostras?: number;
  observacao?: string;
  operacao?: IAmostra;
}

export class Operacao implements IOperacao {
  constructor(
    public id?: number,
    public descricao?: string,
    public inicio?: Moment,
    public fim?: Moment,
    public quantidadeAmostras?: number,
    public observacao?: string,
    public operacao?: IAmostra
  ) {}
}

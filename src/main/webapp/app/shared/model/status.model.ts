import { Moment } from 'moment';
import { SimNao } from 'app/shared/model/enumerations/sim-nao.model';

export interface IStatus {
  id?: number;
  descricao?: string;
  prazo?: Moment;
  solicitarFinalizacao?: SimNao;
}

export class Status implements IStatus {
  constructor(public id?: number, public descricao?: string, public prazo?: Moment, public solicitarFinalizacao?: SimNao) {}
}

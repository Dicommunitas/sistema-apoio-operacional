import { Moment } from 'moment';
import { IProblema } from 'app/shared/model/problema.model';
import { SimNao } from 'app/shared/model/enumerations/sim-nao.model';

export interface IStatus {
  id?: number;
  descricao?: any;
  prazo?: Moment;
  solicitarFinalizacao?: SimNao;
  statuses?: IProblema[];
}

export class Status implements IStatus {
  constructor(
    public id?: number,
    public descricao?: any,
    public prazo?: Moment,
    public solicitarFinalizacao?: SimNao,
    public statuses?: IProblema[]
  ) {}
}

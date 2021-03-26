import { Moment } from 'moment';
import { IProblema } from 'app/shared/model/problema.model';
import { SimNao } from 'app/shared/model/enumerations/sim-nao.model';

export interface IStatus {
  id?: number;
  descricao?: string;
  prazo?: Moment;
  solicitarFinalizacao?: SimNao;
  problema?: IProblema;
}

export class Status implements IStatus {
  constructor(
    public id?: number,
    public descricao?: string,
    public prazo?: Moment,
    public solicitarFinalizacao?: SimNao,
    public problema?: IProblema
  ) {}
}

import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IProblema } from 'app/shared/model/problema.model';
import { SimNao } from 'app/shared/model/enumerations/sim-nao.model';

export interface IStatus {
  id?: number;
  descricao?: string;
  prazo?: Moment;
  solicitarFinalizacao?: SimNao;
  responsavel1s?: IUser[];
  responsavel2s?: IUser[];
  problema?: IProblema;
}

export class Status implements IStatus {
  constructor(
    public id?: number,
    public descricao?: string,
    public prazo?: Moment,
    public solicitarFinalizacao?: SimNao,
    public responsavel1s?: IUser[],
    public responsavel2s?: IUser[],
    public problema?: IProblema
  ) {}
}

import { IStatus } from 'app/shared/model/status.model';
import { Criticidade } from 'app/shared/model/enumerations/criticidade.model';
import { SimNao } from 'app/shared/model/enumerations/sim-nao.model';

export interface IProblema {
  id?: number;
  descricao?: any;
  criticidade?: Criticidade;
  aceitarFinalizacao?: SimNao;
  fotoContentType?: string;
  foto?: any;
  statuses?: IStatus[];
}

export class Problema implements IProblema {
  constructor(
    public id?: number,
    public descricao?: any,
    public criticidade?: Criticidade,
    public aceitarFinalizacao?: SimNao,
    public fotoContentType?: string,
    public foto?: any,
    public statuses?: IStatus[]
  ) {}
}

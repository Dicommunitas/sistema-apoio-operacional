import { Criticidade } from 'app/shared/model/enumerations/criticidade.model';
import { SimNao } from 'app/shared/model/enumerations/sim-nao.model';

export interface IProblema {
  id?: number;
  descricao?: string;
  criticidade?: Criticidade;
  aceitarFinalizacao?: SimNao;
  fotoContentType?: string;
  foto?: any;
}

export class Problema implements IProblema {
  constructor(
    public id?: number,
    public descricao?: string,
    public criticidade?: Criticidade,
    public aceitarFinalizacao?: SimNao,
    public fotoContentType?: string,
    public foto?: any
  ) {}
}
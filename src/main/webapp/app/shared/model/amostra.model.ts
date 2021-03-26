import { Moment } from 'moment';
import { IFinalidadeAmostra } from 'app/shared/model/finalidade-amostra.model';
import { SimNao } from 'app/shared/model/enumerations/sim-nao.model';

export interface IAmostra {
  id?: number;
  dataHora?: Moment;
  observacao?: string;
  identificacaoOutroSistema?: string;
  amostraNoLaboratorio?: SimNao;
  amostras?: IFinalidadeAmostra[];
}

export class Amostra implements IAmostra {
  constructor(
    public id?: number,
    public dataHora?: Moment,
    public observacao?: string,
    public identificacaoOutroSistema?: string,
    public amostraNoLaboratorio?: SimNao,
    public amostras?: IFinalidadeAmostra[]
  ) {}
}
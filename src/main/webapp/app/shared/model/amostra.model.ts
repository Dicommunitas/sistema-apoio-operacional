import { Moment } from 'moment';
import { IOperacao } from 'app/shared/model/operacao.model';
import { IOrigemAmostra } from 'app/shared/model/origem-amostra.model';
import { ITipoAmostra } from 'app/shared/model/tipo-amostra.model';
import { IFinalidadeAmostra } from 'app/shared/model/finalidade-amostra.model';
import { SimNao } from 'app/shared/model/enumerations/sim-nao.model';

export interface IAmostra {
  id?: number;
  dataHora?: Moment;
  observacao?: string;
  identificacaoOutroSistema?: string;
  amostraNoLaboratorio?: SimNao;
  operacao?: IOperacao;
  origemAmostra?: IOrigemAmostra;
  tipoAmostra?: ITipoAmostra;
  finalidadeAmostra?: IFinalidadeAmostra;
}

export class Amostra implements IAmostra {
  constructor(
    public id?: number,
    public dataHora?: Moment,
    public observacao?: string,
    public identificacaoOutroSistema?: string,
    public amostraNoLaboratorio?: SimNao,
    public operacao?: IOperacao,
    public origemAmostra?: IOrigemAmostra,
    public tipoAmostra?: ITipoAmostra,
    public finalidadeAmostra?: IFinalidadeAmostra
  ) {}
}

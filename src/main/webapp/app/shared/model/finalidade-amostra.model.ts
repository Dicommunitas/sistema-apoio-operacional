import { IAmostra } from 'app/shared/model/amostra.model';
import { ITipoFinalidadeAmostra } from 'app/shared/model/tipo-finalidade-amostra.model';

export interface IFinalidadeAmostra {
  id?: number;
  lacre?: string;
  amostras?: IAmostra[];
  tipoFinalidadeAmostra?: ITipoFinalidadeAmostra;
}

export class FinalidadeAmostra implements IFinalidadeAmostra {
  constructor(
    public id?: number,
    public lacre?: string,
    public amostras?: IAmostra[],
    public tipoFinalidadeAmostra?: ITipoFinalidadeAmostra
  ) {}
}

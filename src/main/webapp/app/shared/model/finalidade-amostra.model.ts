import { ITipoFinalidadeAmostra } from 'app/shared/model/tipo-finalidade-amostra.model';

export interface IFinalidadeAmostra {
  id?: number;
  lacre?: string;
  tipoFinalidadeAmostra?: ITipoFinalidadeAmostra;
}

export class FinalidadeAmostra implements IFinalidadeAmostra {
  constructor(public id?: number, public lacre?: string, public tipoFinalidadeAmostra?: ITipoFinalidadeAmostra) {}
}

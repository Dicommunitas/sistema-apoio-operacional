import { ITipoFinalidadeAmostra } from 'app/shared/model/tipo-finalidade-amostra.model';
import { IAmostra } from 'app/shared/model/amostra.model';

export interface IFinalidadeAmostra {
  id?: number;
  lacre?: string;
  finalidadesAmostras?: ITipoFinalidadeAmostra[];
  finalidadeAmostra?: IAmostra;
  amostra?: IAmostra;
}

export class FinalidadeAmostra implements IFinalidadeAmostra {
  constructor(
    public id?: number,
    public lacre?: string,
    public finalidadesAmostras?: ITipoFinalidadeAmostra[],
    public finalidadeAmostra?: IAmostra,
    public amostra?: IAmostra
  ) {}
}

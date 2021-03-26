import { IFinalidadeAmostra } from 'app/shared/model/finalidade-amostra.model';

export interface ITipoFinalidadeAmostra {
  id?: number;
  descricao?: string;
  tipoFinalidadeAmostra?: IFinalidadeAmostra;
  finalidadeAmostra?: IFinalidadeAmostra;
}

export class TipoFinalidadeAmostra implements ITipoFinalidadeAmostra {
  constructor(
    public id?: number,
    public descricao?: string,
    public tipoFinalidadeAmostra?: IFinalidadeAmostra,
    public finalidadeAmostra?: IFinalidadeAmostra
  ) {}
}

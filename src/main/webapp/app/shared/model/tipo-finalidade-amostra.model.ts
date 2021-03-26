import { IFinalidadeAmostra } from 'app/shared/model/finalidade-amostra.model';

export interface ITipoFinalidadeAmostra {
  id?: number;
  descricao?: string;
  finalidadeAmostras?: IFinalidadeAmostra[];
}

export class TipoFinalidadeAmostra implements ITipoFinalidadeAmostra {
  constructor(public id?: number, public descricao?: string, public finalidadeAmostras?: IFinalidadeAmostra[]) {}
}

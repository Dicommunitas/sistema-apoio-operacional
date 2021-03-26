import { IAmostra } from 'app/shared/model/amostra.model';

export interface IFinalidadeAmostra {
  id?: number;
  lacre?: string;
  amostra?: IAmostra;
}

export class FinalidadeAmostra implements IFinalidadeAmostra {
  constructor(public id?: number, public lacre?: string, public amostra?: IAmostra) {}
}

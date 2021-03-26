export interface IFinalidadeAmostra {
  id?: number;
  lacre?: string;
}

export class FinalidadeAmostra implements IFinalidadeAmostra {
  constructor(public id?: number, public lacre?: string) {}
}

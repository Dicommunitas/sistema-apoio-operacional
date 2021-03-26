import { ITipoRelatorio } from 'app/shared/model/tipo-relatorio.model';

export interface IRelatorio {
  id?: number;
  descricao?: any;
  relatorios?: ITipoRelatorio[];
}

export class Relatorio implements IRelatorio {
  constructor(public id?: number, public descricao?: any, public relatorios?: ITipoRelatorio[]) {}
}

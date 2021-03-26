import { IRelatorio } from 'app/shared/model/relatorio.model';

export interface ITipoRelatorio {
  id?: number;
  descricao?: string;
  relatorios?: IRelatorio;
}

export class TipoRelatorio implements ITipoRelatorio {
  constructor(public id?: number, public descricao?: string, public relatorios?: IRelatorio) {}
}

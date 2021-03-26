import { IRelatorio } from 'app/shared/model/relatorio.model';

export interface ITipoRelatorio {
  id?: number;
  descricao?: string;
  tipoRelatorio?: IRelatorio;
}

export class TipoRelatorio implements ITipoRelatorio {
  constructor(public id?: number, public descricao?: string, public tipoRelatorio?: IRelatorio) {}
}

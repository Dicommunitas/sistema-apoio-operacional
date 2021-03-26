import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { ITipoRelatorio } from 'app/shared/model/tipo-relatorio.model';

type EntityResponseType = HttpResponse<ITipoRelatorio>;
type EntityArrayResponseType = HttpResponse<ITipoRelatorio[]>;

@Injectable({ providedIn: 'root' })
export class TipoRelatorioService {
  public resourceUrl = SERVER_API_URL + 'api/tipo-relatorios';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/tipo-relatorios';

  constructor(protected http: HttpClient) {}

  create(tipoRelatorio: ITipoRelatorio): Observable<EntityResponseType> {
    return this.http.post<ITipoRelatorio>(this.resourceUrl, tipoRelatorio, { observe: 'response' });
  }

  update(tipoRelatorio: ITipoRelatorio): Observable<EntityResponseType> {
    return this.http.put<ITipoRelatorio>(this.resourceUrl, tipoRelatorio, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoRelatorio>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoRelatorio[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoRelatorio[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}

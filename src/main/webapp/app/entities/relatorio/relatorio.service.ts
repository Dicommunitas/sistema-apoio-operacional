import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IRelatorio } from 'app/shared/model/relatorio.model';

type EntityResponseType = HttpResponse<IRelatorio>;
type EntityArrayResponseType = HttpResponse<IRelatorio[]>;

@Injectable({ providedIn: 'root' })
export class RelatorioService {
  public resourceUrl = SERVER_API_URL + 'api/relatorios';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/relatorios';

  constructor(protected http: HttpClient) {}

  create(relatorio: IRelatorio): Observable<EntityResponseType> {
    return this.http.post<IRelatorio>(this.resourceUrl, relatorio, { observe: 'response' });
  }

  update(relatorio: IRelatorio): Observable<EntityResponseType> {
    return this.http.put<IRelatorio>(this.resourceUrl, relatorio, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRelatorio>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRelatorio[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRelatorio[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}

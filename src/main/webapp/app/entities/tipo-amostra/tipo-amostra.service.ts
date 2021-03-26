import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { ITipoAmostra } from 'app/shared/model/tipo-amostra.model';

type EntityResponseType = HttpResponse<ITipoAmostra>;
type EntityArrayResponseType = HttpResponse<ITipoAmostra[]>;

@Injectable({ providedIn: 'root' })
export class TipoAmostraService {
  public resourceUrl = SERVER_API_URL + 'api/tipo-amostras';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/tipo-amostras';

  constructor(protected http: HttpClient) {}

  create(tipoAmostra: ITipoAmostra): Observable<EntityResponseType> {
    return this.http.post<ITipoAmostra>(this.resourceUrl, tipoAmostra, { observe: 'response' });
  }

  update(tipoAmostra: ITipoAmostra): Observable<EntityResponseType> {
    return this.http.put<ITipoAmostra>(this.resourceUrl, tipoAmostra, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoAmostra>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoAmostra[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoAmostra[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}

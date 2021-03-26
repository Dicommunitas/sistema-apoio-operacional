import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { ITipoFinalidadeAmostra } from 'app/shared/model/tipo-finalidade-amostra.model';

type EntityResponseType = HttpResponse<ITipoFinalidadeAmostra>;
type EntityArrayResponseType = HttpResponse<ITipoFinalidadeAmostra[]>;

@Injectable({ providedIn: 'root' })
export class TipoFinalidadeAmostraService {
  public resourceUrl = SERVER_API_URL + 'api/tipo-finalidade-amostras';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/tipo-finalidade-amostras';

  constructor(protected http: HttpClient) {}

  create(tipoFinalidadeAmostra: ITipoFinalidadeAmostra): Observable<EntityResponseType> {
    return this.http.post<ITipoFinalidadeAmostra>(this.resourceUrl, tipoFinalidadeAmostra, { observe: 'response' });
  }

  update(tipoFinalidadeAmostra: ITipoFinalidadeAmostra): Observable<EntityResponseType> {
    return this.http.put<ITipoFinalidadeAmostra>(this.resourceUrl, tipoFinalidadeAmostra, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoFinalidadeAmostra>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoFinalidadeAmostra[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoFinalidadeAmostra[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}

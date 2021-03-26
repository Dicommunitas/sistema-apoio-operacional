import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { IFinalidadeAmostra } from 'app/shared/model/finalidade-amostra.model';

type EntityResponseType = HttpResponse<IFinalidadeAmostra>;
type EntityArrayResponseType = HttpResponse<IFinalidadeAmostra[]>;

@Injectable({ providedIn: 'root' })
export class FinalidadeAmostraService {
  public resourceUrl = SERVER_API_URL + 'api/finalidade-amostras';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/finalidade-amostras';

  constructor(protected http: HttpClient) {}

  create(finalidadeAmostra: IFinalidadeAmostra): Observable<EntityResponseType> {
    return this.http.post<IFinalidadeAmostra>(this.resourceUrl, finalidadeAmostra, { observe: 'response' });
  }

  update(finalidadeAmostra: IFinalidadeAmostra): Observable<EntityResponseType> {
    return this.http.put<IFinalidadeAmostra>(this.resourceUrl, finalidadeAmostra, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFinalidadeAmostra>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFinalidadeAmostra[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFinalidadeAmostra[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { IProblema } from 'app/shared/model/problema.model';

type EntityResponseType = HttpResponse<IProblema>;
type EntityArrayResponseType = HttpResponse<IProblema[]>;

@Injectable({ providedIn: 'root' })
export class ProblemaService {
  public resourceUrl = SERVER_API_URL + 'api/problemas';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/problemas';

  constructor(protected http: HttpClient) {}

  create(problema: IProblema): Observable<EntityResponseType> {
    return this.http.post<IProblema>(this.resourceUrl, problema, { observe: 'response' });
  }

  update(problema: IProblema): Observable<EntityResponseType> {
    return this.http.put<IProblema>(this.resourceUrl, problema, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProblema>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProblema[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProblema[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}

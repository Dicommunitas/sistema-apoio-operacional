import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { IAmostra } from 'app/shared/model/amostra.model';

type EntityResponseType = HttpResponse<IAmostra>;
type EntityArrayResponseType = HttpResponse<IAmostra[]>;

@Injectable({ providedIn: 'root' })
export class AmostraService {
  public resourceUrl = SERVER_API_URL + 'api/amostras';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/amostras';

  constructor(protected http: HttpClient) {}

  create(amostra: IAmostra): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(amostra);
    return this.http
      .post<IAmostra>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(amostra: IAmostra): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(amostra);
    return this.http
      .put<IAmostra>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAmostra>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAmostra[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAmostra[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(amostra: IAmostra): IAmostra {
    const copy: IAmostra = Object.assign({}, amostra, {
      dataHora: amostra.dataHora && amostra.dataHora.isValid() ? amostra.dataHora.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataHora = res.body.dataHora ? moment(res.body.dataHora) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((amostra: IAmostra) => {
        amostra.dataHora = amostra.dataHora ? moment(amostra.dataHora) : undefined;
      });
    }
    return res;
  }
}

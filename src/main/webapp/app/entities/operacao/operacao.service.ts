import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, SearchWithPagination } from 'app/shared/util/request-util';
import { IOperacao } from 'app/shared/model/operacao.model';

type EntityResponseType = HttpResponse<IOperacao>;
type EntityArrayResponseType = HttpResponse<IOperacao[]>;

@Injectable({ providedIn: 'root' })
export class OperacaoService {
  public resourceUrl = SERVER_API_URL + 'api/operacaos';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/operacaos';

  constructor(protected http: HttpClient) {}

  create(operacao: IOperacao): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(operacao);
    return this.http
      .post<IOperacao>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(operacao: IOperacao): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(operacao);
    return this.http
      .put<IOperacao>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IOperacao>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IOperacao[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IOperacao[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(operacao: IOperacao): IOperacao {
    const copy: IOperacao = Object.assign({}, operacao, {
      inicio: operacao.inicio && operacao.inicio.isValid() ? operacao.inicio.toJSON() : undefined,
      fim: operacao.fim && operacao.fim.isValid() ? operacao.fim.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.inicio = res.body.inicio ? moment(res.body.inicio) : undefined;
      res.body.fim = res.body.fim ? moment(res.body.fim) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((operacao: IOperacao) => {
        operacao.inicio = operacao.inicio ? moment(operacao.inicio) : undefined;
        operacao.fim = operacao.fim ? moment(operacao.fim) : undefined;
      });
    }
    return res;
  }
}

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IOperacao, Operacao } from 'app/shared/model/operacao.model';
import { OperacaoService } from './operacao.service';
import { OperacaoComponent } from './operacao.component';
import { OperacaoDetailComponent } from './operacao-detail.component';
import { OperacaoUpdateComponent } from './operacao-update.component';

@Injectable({ providedIn: 'root' })
export class OperacaoResolve implements Resolve<IOperacao> {
  constructor(private service: OperacaoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOperacao> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((operacao: HttpResponse<Operacao>) => {
          if (operacao.body) {
            return of(operacao.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Operacao());
  }
}

export const operacaoRoute: Routes = [
  {
    path: '',
    component: OperacaoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sistemaApoioOperacionalApp.operacao.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OperacaoDetailComponent,
    resolve: {
      operacao: OperacaoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sistemaApoioOperacionalApp.operacao.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OperacaoUpdateComponent,
    resolve: {
      operacao: OperacaoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sistemaApoioOperacionalApp.operacao.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OperacaoUpdateComponent,
    resolve: {
      operacao: OperacaoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sistemaApoioOperacionalApp.operacao.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

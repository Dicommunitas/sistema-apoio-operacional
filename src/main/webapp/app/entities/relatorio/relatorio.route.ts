import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRelatorio, Relatorio } from 'app/shared/model/relatorio.model';
import { RelatorioService } from './relatorio.service';
import { RelatorioComponent } from './relatorio.component';
import { RelatorioDetailComponent } from './relatorio-detail.component';
import { RelatorioUpdateComponent } from './relatorio-update.component';

@Injectable({ providedIn: 'root' })
export class RelatorioResolve implements Resolve<IRelatorio> {
  constructor(private service: RelatorioService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRelatorio> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((relatorio: HttpResponse<Relatorio>) => {
          if (relatorio.body) {
            return of(relatorio.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Relatorio());
  }
}

export const relatorioRoute: Routes = [
  {
    path: '',
    component: RelatorioComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sistemaApoioOperacionalApp.relatorio.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RelatorioDetailComponent,
    resolve: {
      relatorio: RelatorioResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sistemaApoioOperacionalApp.relatorio.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RelatorioUpdateComponent,
    resolve: {
      relatorio: RelatorioResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sistemaApoioOperacionalApp.relatorio.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RelatorioUpdateComponent,
    resolve: {
      relatorio: RelatorioResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sistemaApoioOperacionalApp.relatorio.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

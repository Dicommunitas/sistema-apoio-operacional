import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITipoRelatorio, TipoRelatorio } from 'app/shared/model/tipo-relatorio.model';
import { TipoRelatorioService } from './tipo-relatorio.service';
import { TipoRelatorioComponent } from './tipo-relatorio.component';
import { TipoRelatorioDetailComponent } from './tipo-relatorio-detail.component';
import { TipoRelatorioUpdateComponent } from './tipo-relatorio-update.component';

@Injectable({ providedIn: 'root' })
export class TipoRelatorioResolve implements Resolve<ITipoRelatorio> {
  constructor(private service: TipoRelatorioService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipoRelatorio> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tipoRelatorio: HttpResponse<TipoRelatorio>) => {
          if (tipoRelatorio.body) {
            return of(tipoRelatorio.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TipoRelatorio());
  }
}

export const tipoRelatorioRoute: Routes = [
  {
    path: '',
    component: TipoRelatorioComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sistemaApoioOperacionalApp.tipoRelatorio.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TipoRelatorioDetailComponent,
    resolve: {
      tipoRelatorio: TipoRelatorioResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sistemaApoioOperacionalApp.tipoRelatorio.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TipoRelatorioUpdateComponent,
    resolve: {
      tipoRelatorio: TipoRelatorioResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sistemaApoioOperacionalApp.tipoRelatorio.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TipoRelatorioUpdateComponent,
    resolve: {
      tipoRelatorio: TipoRelatorioResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sistemaApoioOperacionalApp.tipoRelatorio.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

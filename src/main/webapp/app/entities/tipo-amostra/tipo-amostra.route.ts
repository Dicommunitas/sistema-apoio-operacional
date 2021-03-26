import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITipoAmostra, TipoAmostra } from 'app/shared/model/tipo-amostra.model';
import { TipoAmostraService } from './tipo-amostra.service';
import { TipoAmostraComponent } from './tipo-amostra.component';
import { TipoAmostraDetailComponent } from './tipo-amostra-detail.component';
import { TipoAmostraUpdateComponent } from './tipo-amostra-update.component';

@Injectable({ providedIn: 'root' })
export class TipoAmostraResolve implements Resolve<ITipoAmostra> {
  constructor(private service: TipoAmostraService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipoAmostra> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tipoAmostra: HttpResponse<TipoAmostra>) => {
          if (tipoAmostra.body) {
            return of(tipoAmostra.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TipoAmostra());
  }
}

export const tipoAmostraRoute: Routes = [
  {
    path: '',
    component: TipoAmostraComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sistemaApoioOperacionalApp.tipoAmostra.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TipoAmostraDetailComponent,
    resolve: {
      tipoAmostra: TipoAmostraResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sistemaApoioOperacionalApp.tipoAmostra.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TipoAmostraUpdateComponent,
    resolve: {
      tipoAmostra: TipoAmostraResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sistemaApoioOperacionalApp.tipoAmostra.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TipoAmostraUpdateComponent,
    resolve: {
      tipoAmostra: TipoAmostraResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sistemaApoioOperacionalApp.tipoAmostra.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

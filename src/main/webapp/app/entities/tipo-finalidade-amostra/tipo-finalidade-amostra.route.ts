import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITipoFinalidadeAmostra, TipoFinalidadeAmostra } from 'app/shared/model/tipo-finalidade-amostra.model';
import { TipoFinalidadeAmostraService } from './tipo-finalidade-amostra.service';
import { TipoFinalidadeAmostraComponent } from './tipo-finalidade-amostra.component';
import { TipoFinalidadeAmostraDetailComponent } from './tipo-finalidade-amostra-detail.component';
import { TipoFinalidadeAmostraUpdateComponent } from './tipo-finalidade-amostra-update.component';

@Injectable({ providedIn: 'root' })
export class TipoFinalidadeAmostraResolve implements Resolve<ITipoFinalidadeAmostra> {
  constructor(private service: TipoFinalidadeAmostraService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITipoFinalidadeAmostra> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tipoFinalidadeAmostra: HttpResponse<TipoFinalidadeAmostra>) => {
          if (tipoFinalidadeAmostra.body) {
            return of(tipoFinalidadeAmostra.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TipoFinalidadeAmostra());
  }
}

export const tipoFinalidadeAmostraRoute: Routes = [
  {
    path: '',
    component: TipoFinalidadeAmostraComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sistemaApoioOperacionalApp.tipoFinalidadeAmostra.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TipoFinalidadeAmostraDetailComponent,
    resolve: {
      tipoFinalidadeAmostra: TipoFinalidadeAmostraResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sistemaApoioOperacionalApp.tipoFinalidadeAmostra.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TipoFinalidadeAmostraUpdateComponent,
    resolve: {
      tipoFinalidadeAmostra: TipoFinalidadeAmostraResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sistemaApoioOperacionalApp.tipoFinalidadeAmostra.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TipoFinalidadeAmostraUpdateComponent,
    resolve: {
      tipoFinalidadeAmostra: TipoFinalidadeAmostraResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sistemaApoioOperacionalApp.tipoFinalidadeAmostra.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

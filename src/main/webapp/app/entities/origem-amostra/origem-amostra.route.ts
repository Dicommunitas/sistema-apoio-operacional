import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IOrigemAmostra, OrigemAmostra } from 'app/shared/model/origem-amostra.model';
import { OrigemAmostraService } from './origem-amostra.service';
import { OrigemAmostraComponent } from './origem-amostra.component';
import { OrigemAmostraDetailComponent } from './origem-amostra-detail.component';
import { OrigemAmostraUpdateComponent } from './origem-amostra-update.component';

@Injectable({ providedIn: 'root' })
export class OrigemAmostraResolve implements Resolve<IOrigemAmostra> {
  constructor(private service: OrigemAmostraService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOrigemAmostra> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((origemAmostra: HttpResponse<OrigemAmostra>) => {
          if (origemAmostra.body) {
            return of(origemAmostra.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new OrigemAmostra());
  }
}

export const origemAmostraRoute: Routes = [
  {
    path: '',
    component: OrigemAmostraComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sistemaApoioOperacionalApp.origemAmostra.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OrigemAmostraDetailComponent,
    resolve: {
      origemAmostra: OrigemAmostraResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sistemaApoioOperacionalApp.origemAmostra.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OrigemAmostraUpdateComponent,
    resolve: {
      origemAmostra: OrigemAmostraResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sistemaApoioOperacionalApp.origemAmostra.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OrigemAmostraUpdateComponent,
    resolve: {
      origemAmostra: OrigemAmostraResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sistemaApoioOperacionalApp.origemAmostra.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

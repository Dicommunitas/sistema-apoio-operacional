import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAmostra, Amostra } from 'app/shared/model/amostra.model';
import { AmostraService } from './amostra.service';
import { AmostraComponent } from './amostra.component';
import { AmostraDetailComponent } from './amostra-detail.component';
import { AmostraUpdateComponent } from './amostra-update.component';

@Injectable({ providedIn: 'root' })
export class AmostraResolve implements Resolve<IAmostra> {
  constructor(private service: AmostraService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAmostra> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((amostra: HttpResponse<Amostra>) => {
          if (amostra.body) {
            return of(amostra.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Amostra());
  }
}

export const amostraRoute: Routes = [
  {
    path: '',
    component: AmostraComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'sistemaApoioOperacionalApp.amostra.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AmostraDetailComponent,
    resolve: {
      amostra: AmostraResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sistemaApoioOperacionalApp.amostra.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AmostraUpdateComponent,
    resolve: {
      amostra: AmostraResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sistemaApoioOperacionalApp.amostra.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AmostraUpdateComponent,
    resolve: {
      amostra: AmostraResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sistemaApoioOperacionalApp.amostra.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

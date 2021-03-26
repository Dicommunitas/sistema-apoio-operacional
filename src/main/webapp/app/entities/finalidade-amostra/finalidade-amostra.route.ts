import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFinalidadeAmostra, FinalidadeAmostra } from 'app/shared/model/finalidade-amostra.model';
import { FinalidadeAmostraService } from './finalidade-amostra.service';
import { FinalidadeAmostraComponent } from './finalidade-amostra.component';
import { FinalidadeAmostraDetailComponent } from './finalidade-amostra-detail.component';
import { FinalidadeAmostraUpdateComponent } from './finalidade-amostra-update.component';

@Injectable({ providedIn: 'root' })
export class FinalidadeAmostraResolve implements Resolve<IFinalidadeAmostra> {
  constructor(private service: FinalidadeAmostraService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFinalidadeAmostra> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((finalidadeAmostra: HttpResponse<FinalidadeAmostra>) => {
          if (finalidadeAmostra.body) {
            return of(finalidadeAmostra.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new FinalidadeAmostra());
  }
}

export const finalidadeAmostraRoute: Routes = [
  {
    path: '',
    component: FinalidadeAmostraComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sistemaApoioOperacionalApp.finalidadeAmostra.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FinalidadeAmostraDetailComponent,
    resolve: {
      finalidadeAmostra: FinalidadeAmostraResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sistemaApoioOperacionalApp.finalidadeAmostra.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FinalidadeAmostraUpdateComponent,
    resolve: {
      finalidadeAmostra: FinalidadeAmostraResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sistemaApoioOperacionalApp.finalidadeAmostra.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FinalidadeAmostraUpdateComponent,
    resolve: {
      finalidadeAmostra: FinalidadeAmostraResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'sistemaApoioOperacionalApp.finalidadeAmostra.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];

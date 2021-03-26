import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SistemaApoioOperacionalSharedModule } from 'app/shared/shared.module';
import { TipoFinalidadeAmostraComponent } from './tipo-finalidade-amostra.component';
import { TipoFinalidadeAmostraDetailComponent } from './tipo-finalidade-amostra-detail.component';
import { TipoFinalidadeAmostraUpdateComponent } from './tipo-finalidade-amostra-update.component';
import { TipoFinalidadeAmostraDeleteDialogComponent } from './tipo-finalidade-amostra-delete-dialog.component';
import { tipoFinalidadeAmostraRoute } from './tipo-finalidade-amostra.route';

@NgModule({
  imports: [SistemaApoioOperacionalSharedModule, RouterModule.forChild(tipoFinalidadeAmostraRoute)],
  declarations: [
    TipoFinalidadeAmostraComponent,
    TipoFinalidadeAmostraDetailComponent,
    TipoFinalidadeAmostraUpdateComponent,
    TipoFinalidadeAmostraDeleteDialogComponent,
  ],
  entryComponents: [TipoFinalidadeAmostraDeleteDialogComponent],
})
export class SistemaApoioOperacionalTipoFinalidadeAmostraModule {}

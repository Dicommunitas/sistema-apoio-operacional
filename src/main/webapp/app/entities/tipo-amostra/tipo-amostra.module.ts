import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SistemaApoioOperacionalSharedModule } from 'app/shared/shared.module';
import { TipoAmostraComponent } from './tipo-amostra.component';
import { TipoAmostraDetailComponent } from './tipo-amostra-detail.component';
import { TipoAmostraUpdateComponent } from './tipo-amostra-update.component';
import { TipoAmostraDeleteDialogComponent } from './tipo-amostra-delete-dialog.component';
import { tipoAmostraRoute } from './tipo-amostra.route';

@NgModule({
  imports: [SistemaApoioOperacionalSharedModule, RouterModule.forChild(tipoAmostraRoute)],
  declarations: [TipoAmostraComponent, TipoAmostraDetailComponent, TipoAmostraUpdateComponent, TipoAmostraDeleteDialogComponent],
  entryComponents: [TipoAmostraDeleteDialogComponent],
})
export class SistemaApoioOperacionalTipoAmostraModule {}

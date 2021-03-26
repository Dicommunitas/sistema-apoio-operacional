import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SistemaApoioOperacionalSharedModule } from 'app/shared/shared.module';
import { AmostraComponent } from './amostra.component';
import { AmostraDetailComponent } from './amostra-detail.component';
import { AmostraUpdateComponent } from './amostra-update.component';
import { AmostraDeleteDialogComponent } from './amostra-delete-dialog.component';
import { amostraRoute } from './amostra.route';

@NgModule({
  imports: [SistemaApoioOperacionalSharedModule, RouterModule.forChild(amostraRoute)],
  declarations: [AmostraComponent, AmostraDetailComponent, AmostraUpdateComponent, AmostraDeleteDialogComponent],
  entryComponents: [AmostraDeleteDialogComponent],
})
export class SistemaApoioOperacionalAmostraModule {}

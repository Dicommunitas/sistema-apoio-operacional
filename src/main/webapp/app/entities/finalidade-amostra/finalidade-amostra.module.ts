import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SistemaApoioOperacionalSharedModule } from 'app/shared/shared.module';
import { FinalidadeAmostraComponent } from './finalidade-amostra.component';
import { FinalidadeAmostraDetailComponent } from './finalidade-amostra-detail.component';
import { FinalidadeAmostraUpdateComponent } from './finalidade-amostra-update.component';
import { FinalidadeAmostraDeleteDialogComponent } from './finalidade-amostra-delete-dialog.component';
import { finalidadeAmostraRoute } from './finalidade-amostra.route';

@NgModule({
  imports: [SistemaApoioOperacionalSharedModule, RouterModule.forChild(finalidadeAmostraRoute)],
  declarations: [
    FinalidadeAmostraComponent,
    FinalidadeAmostraDetailComponent,
    FinalidadeAmostraUpdateComponent,
    FinalidadeAmostraDeleteDialogComponent,
  ],
  entryComponents: [FinalidadeAmostraDeleteDialogComponent],
})
export class SistemaApoioOperacionalFinalidadeAmostraModule {}

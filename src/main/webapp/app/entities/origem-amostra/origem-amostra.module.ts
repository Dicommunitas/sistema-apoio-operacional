import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SistemaApoioOperacionalSharedModule } from 'app/shared/shared.module';
import { OrigemAmostraComponent } from './origem-amostra.component';
import { OrigemAmostraDetailComponent } from './origem-amostra-detail.component';
import { OrigemAmostraUpdateComponent } from './origem-amostra-update.component';
import { OrigemAmostraDeleteDialogComponent } from './origem-amostra-delete-dialog.component';
import { origemAmostraRoute } from './origem-amostra.route';

@NgModule({
  imports: [SistemaApoioOperacionalSharedModule, RouterModule.forChild(origemAmostraRoute)],
  declarations: [OrigemAmostraComponent, OrigemAmostraDetailComponent, OrigemAmostraUpdateComponent, OrigemAmostraDeleteDialogComponent],
  entryComponents: [OrigemAmostraDeleteDialogComponent],
})
export class SistemaApoioOperacionalOrigemAmostraModule {}

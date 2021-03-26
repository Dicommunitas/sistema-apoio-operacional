import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SistemaApoioOperacionalSharedModule } from 'app/shared/shared.module';
import { ProblemaComponent } from './problema.component';
import { ProblemaDetailComponent } from './problema-detail.component';
import { ProblemaUpdateComponent } from './problema-update.component';
import { ProblemaDeleteDialogComponent } from './problema-delete-dialog.component';
import { problemaRoute } from './problema.route';

@NgModule({
  imports: [SistemaApoioOperacionalSharedModule, RouterModule.forChild(problemaRoute)],
  declarations: [ProblemaComponent, ProblemaDetailComponent, ProblemaUpdateComponent, ProblemaDeleteDialogComponent],
  entryComponents: [ProblemaDeleteDialogComponent],
})
export class SistemaApoioOperacionalProblemaModule {}

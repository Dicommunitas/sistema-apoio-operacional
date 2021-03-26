import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SistemaApoioOperacionalSharedModule } from 'app/shared/shared.module';
import { RelatorioComponent } from './relatorio.component';
import { RelatorioDetailComponent } from './relatorio-detail.component';
import { RelatorioUpdateComponent } from './relatorio-update.component';
import { RelatorioDeleteDialogComponent } from './relatorio-delete-dialog.component';
import { relatorioRoute } from './relatorio.route';

@NgModule({
  imports: [SistemaApoioOperacionalSharedModule, RouterModule.forChild(relatorioRoute)],
  declarations: [RelatorioComponent, RelatorioDetailComponent, RelatorioUpdateComponent, RelatorioDeleteDialogComponent],
  entryComponents: [RelatorioDeleteDialogComponent],
})
export class SistemaApoioOperacionalRelatorioModule {}

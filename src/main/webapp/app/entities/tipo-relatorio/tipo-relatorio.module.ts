import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SistemaApoioOperacionalSharedModule } from 'app/shared/shared.module';
import { TipoRelatorioComponent } from './tipo-relatorio.component';
import { TipoRelatorioDetailComponent } from './tipo-relatorio-detail.component';
import { TipoRelatorioUpdateComponent } from './tipo-relatorio-update.component';
import { TipoRelatorioDeleteDialogComponent } from './tipo-relatorio-delete-dialog.component';
import { tipoRelatorioRoute } from './tipo-relatorio.route';

@NgModule({
  imports: [SistemaApoioOperacionalSharedModule, RouterModule.forChild(tipoRelatorioRoute)],
  declarations: [TipoRelatorioComponent, TipoRelatorioDetailComponent, TipoRelatorioUpdateComponent, TipoRelatorioDeleteDialogComponent],
  entryComponents: [TipoRelatorioDeleteDialogComponent],
})
export class SistemaApoioOperacionalTipoRelatorioModule {}

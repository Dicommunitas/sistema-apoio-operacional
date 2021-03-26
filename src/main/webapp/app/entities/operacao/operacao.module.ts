import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SistemaApoioOperacionalSharedModule } from 'app/shared/shared.module';
import { OperacaoComponent } from './operacao.component';
import { OperacaoDetailComponent } from './operacao-detail.component';
import { OperacaoUpdateComponent } from './operacao-update.component';
import { OperacaoDeleteDialogComponent } from './operacao-delete-dialog.component';
import { operacaoRoute } from './operacao.route';

@NgModule({
  imports: [SistemaApoioOperacionalSharedModule, RouterModule.forChild(operacaoRoute)],
  declarations: [OperacaoComponent, OperacaoDetailComponent, OperacaoUpdateComponent, OperacaoDeleteDialogComponent],
  entryComponents: [OperacaoDeleteDialogComponent],
})
export class SistemaApoioOperacionalOperacaoModule {}

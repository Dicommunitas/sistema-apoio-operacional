import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoRelatorio } from 'app/shared/model/tipo-relatorio.model';
import { TipoRelatorioService } from './tipo-relatorio.service';

@Component({
  templateUrl: './tipo-relatorio-delete-dialog.component.html',
})
export class TipoRelatorioDeleteDialogComponent {
  tipoRelatorio?: ITipoRelatorio;

  constructor(
    protected tipoRelatorioService: TipoRelatorioService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoRelatorioService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tipoRelatorioListModification');
      this.activeModal.close();
    });
  }
}

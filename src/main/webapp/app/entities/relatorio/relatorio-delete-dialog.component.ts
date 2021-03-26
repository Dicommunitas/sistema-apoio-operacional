import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRelatorio } from 'app/shared/model/relatorio.model';
import { RelatorioService } from './relatorio.service';

@Component({
  templateUrl: './relatorio-delete-dialog.component.html',
})
export class RelatorioDeleteDialogComponent {
  relatorio?: IRelatorio;

  constructor(protected relatorioService: RelatorioService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.relatorioService.delete(id).subscribe(() => {
      this.eventManager.broadcast('relatorioListModification');
      this.activeModal.close();
    });
  }
}

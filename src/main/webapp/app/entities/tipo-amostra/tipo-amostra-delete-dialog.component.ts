import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoAmostra } from 'app/shared/model/tipo-amostra.model';
import { TipoAmostraService } from './tipo-amostra.service';

@Component({
  templateUrl: './tipo-amostra-delete-dialog.component.html',
})
export class TipoAmostraDeleteDialogComponent {
  tipoAmostra?: ITipoAmostra;

  constructor(
    protected tipoAmostraService: TipoAmostraService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoAmostraService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tipoAmostraListModification');
      this.activeModal.close();
    });
  }
}

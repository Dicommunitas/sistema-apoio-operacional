import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAmostra } from 'app/shared/model/amostra.model';
import { AmostraService } from './amostra.service';

@Component({
  templateUrl: './amostra-delete-dialog.component.html',
})
export class AmostraDeleteDialogComponent {
  amostra?: IAmostra;

  constructor(protected amostraService: AmostraService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.amostraService.delete(id).subscribe(() => {
      this.eventManager.broadcast('amostraListModification');
      this.activeModal.close();
    });
  }
}

import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFinalidadeAmostra } from 'app/shared/model/finalidade-amostra.model';
import { FinalidadeAmostraService } from './finalidade-amostra.service';

@Component({
  templateUrl: './finalidade-amostra-delete-dialog.component.html',
})
export class FinalidadeAmostraDeleteDialogComponent {
  finalidadeAmostra?: IFinalidadeAmostra;

  constructor(
    protected finalidadeAmostraService: FinalidadeAmostraService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.finalidadeAmostraService.delete(id).subscribe(() => {
      this.eventManager.broadcast('finalidadeAmostraListModification');
      this.activeModal.close();
    });
  }
}

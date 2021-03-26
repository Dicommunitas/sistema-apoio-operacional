import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoFinalidadeAmostra } from 'app/shared/model/tipo-finalidade-amostra.model';
import { TipoFinalidadeAmostraService } from './tipo-finalidade-amostra.service';

@Component({
  templateUrl: './tipo-finalidade-amostra-delete-dialog.component.html',
})
export class TipoFinalidadeAmostraDeleteDialogComponent {
  tipoFinalidadeAmostra?: ITipoFinalidadeAmostra;

  constructor(
    protected tipoFinalidadeAmostraService: TipoFinalidadeAmostraService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoFinalidadeAmostraService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tipoFinalidadeAmostraListModification');
      this.activeModal.close();
    });
  }
}

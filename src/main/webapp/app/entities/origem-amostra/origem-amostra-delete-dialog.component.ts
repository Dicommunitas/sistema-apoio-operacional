import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOrigemAmostra } from 'app/shared/model/origem-amostra.model';
import { OrigemAmostraService } from './origem-amostra.service';

@Component({
  templateUrl: './origem-amostra-delete-dialog.component.html',
})
export class OrigemAmostraDeleteDialogComponent {
  origemAmostra?: IOrigemAmostra;

  constructor(
    protected origemAmostraService: OrigemAmostraService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.origemAmostraService.delete(id).subscribe(() => {
      this.eventManager.broadcast('origemAmostraListModification');
      this.activeModal.close();
    });
  }
}

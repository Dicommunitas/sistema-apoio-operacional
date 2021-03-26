import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProblema } from 'app/shared/model/problema.model';
import { ProblemaService } from './problema.service';

@Component({
  templateUrl: './problema-delete-dialog.component.html',
})
export class ProblemaDeleteDialogComponent {
  problema?: IProblema;

  constructor(protected problemaService: ProblemaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.problemaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('problemaListModification');
      this.activeModal.close();
    });
  }
}

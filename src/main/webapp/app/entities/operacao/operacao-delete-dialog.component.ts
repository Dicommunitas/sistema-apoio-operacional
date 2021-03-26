import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOperacao } from 'app/shared/model/operacao.model';
import { OperacaoService } from './operacao.service';

@Component({
  templateUrl: './operacao-delete-dialog.component.html',
})
export class OperacaoDeleteDialogComponent {
  operacao?: IOperacao;

  constructor(protected operacaoService: OperacaoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.operacaoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('operacaoListModification');
      this.activeModal.close();
    });
  }
}

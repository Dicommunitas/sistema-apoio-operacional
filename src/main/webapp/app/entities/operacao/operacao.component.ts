import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IOperacao } from 'app/shared/model/operacao.model';
import { OperacaoService } from './operacao.service';
import { OperacaoDeleteDialogComponent } from './operacao-delete-dialog.component';

@Component({
  selector: 'jhi-operacao',
  templateUrl: './operacao.component.html',
})
export class OperacaoComponent implements OnInit, OnDestroy {
  operacaos?: IOperacao[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected operacaoService: OperacaoService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll(): void {
    if (this.currentSearch) {
      this.operacaoService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IOperacao[]>) => (this.operacaos = res.body || []));
      return;
    }

    this.operacaoService.query().subscribe((res: HttpResponse<IOperacao[]>) => (this.operacaos = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInOperacaos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IOperacao): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInOperacaos(): void {
    this.eventSubscriber = this.eventManager.subscribe('operacaoListModification', () => this.loadAll());
  }

  delete(operacao: IOperacao): void {
    const modalRef = this.modalService.open(OperacaoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.operacao = operacao;
  }
}

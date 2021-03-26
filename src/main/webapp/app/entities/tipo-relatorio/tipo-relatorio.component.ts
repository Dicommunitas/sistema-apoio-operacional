import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipoRelatorio } from 'app/shared/model/tipo-relatorio.model';
import { TipoRelatorioService } from './tipo-relatorio.service';
import { TipoRelatorioDeleteDialogComponent } from './tipo-relatorio-delete-dialog.component';

@Component({
  selector: 'jhi-tipo-relatorio',
  templateUrl: './tipo-relatorio.component.html',
})
export class TipoRelatorioComponent implements OnInit, OnDestroy {
  tipoRelatorios?: ITipoRelatorio[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected tipoRelatorioService: TipoRelatorioService,
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
      this.tipoRelatorioService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<ITipoRelatorio[]>) => (this.tipoRelatorios = res.body || []));
      return;
    }

    this.tipoRelatorioService.query().subscribe((res: HttpResponse<ITipoRelatorio[]>) => (this.tipoRelatorios = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTipoRelatorios();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITipoRelatorio): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTipoRelatorios(): void {
    this.eventSubscriber = this.eventManager.subscribe('tipoRelatorioListModification', () => this.loadAll());
  }

  delete(tipoRelatorio: ITipoRelatorio): void {
    const modalRef = this.modalService.open(TipoRelatorioDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tipoRelatorio = tipoRelatorio;
  }
}

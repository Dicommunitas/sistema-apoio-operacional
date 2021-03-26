import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipoAmostra } from 'app/shared/model/tipo-amostra.model';
import { TipoAmostraService } from './tipo-amostra.service';
import { TipoAmostraDeleteDialogComponent } from './tipo-amostra-delete-dialog.component';

@Component({
  selector: 'jhi-tipo-amostra',
  templateUrl: './tipo-amostra.component.html',
})
export class TipoAmostraComponent implements OnInit, OnDestroy {
  tipoAmostras?: ITipoAmostra[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected tipoAmostraService: TipoAmostraService,
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
      this.tipoAmostraService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<ITipoAmostra[]>) => (this.tipoAmostras = res.body || []));
      return;
    }

    this.tipoAmostraService.query().subscribe((res: HttpResponse<ITipoAmostra[]>) => (this.tipoAmostras = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTipoAmostras();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITipoAmostra): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTipoAmostras(): void {
    this.eventSubscriber = this.eventManager.subscribe('tipoAmostraListModification', () => this.loadAll());
  }

  delete(tipoAmostra: ITipoAmostra): void {
    const modalRef = this.modalService.open(TipoAmostraDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tipoAmostra = tipoAmostra;
  }
}

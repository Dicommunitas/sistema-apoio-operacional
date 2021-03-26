import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFinalidadeAmostra } from 'app/shared/model/finalidade-amostra.model';
import { FinalidadeAmostraService } from './finalidade-amostra.service';
import { FinalidadeAmostraDeleteDialogComponent } from './finalidade-amostra-delete-dialog.component';

@Component({
  selector: 'jhi-finalidade-amostra',
  templateUrl: './finalidade-amostra.component.html',
})
export class FinalidadeAmostraComponent implements OnInit, OnDestroy {
  finalidadeAmostras?: IFinalidadeAmostra[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected finalidadeAmostraService: FinalidadeAmostraService,
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
      this.finalidadeAmostraService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IFinalidadeAmostra[]>) => (this.finalidadeAmostras = res.body || []));
      return;
    }

    this.finalidadeAmostraService
      .query()
      .subscribe((res: HttpResponse<IFinalidadeAmostra[]>) => (this.finalidadeAmostras = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFinalidadeAmostras();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFinalidadeAmostra): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFinalidadeAmostras(): void {
    this.eventSubscriber = this.eventManager.subscribe('finalidadeAmostraListModification', () => this.loadAll());
  }

  delete(finalidadeAmostra: IFinalidadeAmostra): void {
    const modalRef = this.modalService.open(FinalidadeAmostraDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.finalidadeAmostra = finalidadeAmostra;
  }
}

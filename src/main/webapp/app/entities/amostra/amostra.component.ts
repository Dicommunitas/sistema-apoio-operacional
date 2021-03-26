import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAmostra } from 'app/shared/model/amostra.model';
import { AmostraService } from './amostra.service';
import { AmostraDeleteDialogComponent } from './amostra-delete-dialog.component';

@Component({
  selector: 'jhi-amostra',
  templateUrl: './amostra.component.html',
})
export class AmostraComponent implements OnInit, OnDestroy {
  amostras?: IAmostra[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected amostraService: AmostraService,
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
      this.amostraService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IAmostra[]>) => (this.amostras = res.body || []));
      return;
    }

    this.amostraService.query().subscribe((res: HttpResponse<IAmostra[]>) => (this.amostras = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAmostras();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAmostra): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAmostras(): void {
    this.eventSubscriber = this.eventManager.subscribe('amostraListModification', () => this.loadAll());
  }

  delete(amostra: IAmostra): void {
    const modalRef = this.modalService.open(AmostraDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.amostra = amostra;
  }
}

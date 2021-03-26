import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IOrigemAmostra } from 'app/shared/model/origem-amostra.model';
import { OrigemAmostraService } from './origem-amostra.service';
import { OrigemAmostraDeleteDialogComponent } from './origem-amostra-delete-dialog.component';

@Component({
  selector: 'jhi-origem-amostra',
  templateUrl: './origem-amostra.component.html',
})
export class OrigemAmostraComponent implements OnInit, OnDestroy {
  origemAmostras?: IOrigemAmostra[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected origemAmostraService: OrigemAmostraService,
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
      this.origemAmostraService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IOrigemAmostra[]>) => (this.origemAmostras = res.body || []));
      return;
    }

    this.origemAmostraService.query().subscribe((res: HttpResponse<IOrigemAmostra[]>) => (this.origemAmostras = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInOrigemAmostras();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IOrigemAmostra): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInOrigemAmostras(): void {
    this.eventSubscriber = this.eventManager.subscribe('origemAmostraListModification', () => this.loadAll());
  }

  delete(origemAmostra: IOrigemAmostra): void {
    const modalRef = this.modalService.open(OrigemAmostraDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.origemAmostra = origemAmostra;
  }
}

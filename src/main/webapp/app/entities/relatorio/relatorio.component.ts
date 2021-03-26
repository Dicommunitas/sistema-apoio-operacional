import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRelatorio } from 'app/shared/model/relatorio.model';
import { RelatorioService } from './relatorio.service';
import { RelatorioDeleteDialogComponent } from './relatorio-delete-dialog.component';

@Component({
  selector: 'jhi-relatorio',
  templateUrl: './relatorio.component.html',
})
export class RelatorioComponent implements OnInit, OnDestroy {
  relatorios?: IRelatorio[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected relatorioService: RelatorioService,
    protected dataUtils: JhiDataUtils,
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
      this.relatorioService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IRelatorio[]>) => (this.relatorios = res.body || []));
      return;
    }

    this.relatorioService.query().subscribe((res: HttpResponse<IRelatorio[]>) => (this.relatorios = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRelatorios();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRelatorio): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInRelatorios(): void {
    this.eventSubscriber = this.eventManager.subscribe('relatorioListModification', () => this.loadAll());
  }

  delete(relatorio: IRelatorio): void {
    const modalRef = this.modalService.open(RelatorioDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.relatorio = relatorio;
  }
}

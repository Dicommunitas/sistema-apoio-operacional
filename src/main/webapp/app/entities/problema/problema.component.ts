import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProblema } from 'app/shared/model/problema.model';
import { ProblemaService } from './problema.service';
import { ProblemaDeleteDialogComponent } from './problema-delete-dialog.component';

@Component({
  selector: 'jhi-problema',
  templateUrl: './problema.component.html',
})
export class ProblemaComponent implements OnInit, OnDestroy {
  problemas?: IProblema[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected problemaService: ProblemaService,
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
      this.problemaService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IProblema[]>) => (this.problemas = res.body || []));
      return;
    }

    this.problemaService.query().subscribe((res: HttpResponse<IProblema[]>) => (this.problemas = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProblemas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProblema): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInProblemas(): void {
    this.eventSubscriber = this.eventManager.subscribe('problemaListModification', () => this.loadAll());
  }

  delete(problema: IProblema): void {
    const modalRef = this.modalService.open(ProblemaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.problema = problema;
  }
}

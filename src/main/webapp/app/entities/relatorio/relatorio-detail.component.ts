import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IRelatorio } from 'app/shared/model/relatorio.model';

@Component({
  selector: 'jhi-relatorio-detail',
  templateUrl: './relatorio-detail.component.html',
})
export class RelatorioDetailComponent implements OnInit {
  relatorio: IRelatorio | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ relatorio }) => (this.relatorio = relatorio));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}

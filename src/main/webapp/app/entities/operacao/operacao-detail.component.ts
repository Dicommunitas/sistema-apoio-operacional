import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IOperacao } from 'app/shared/model/operacao.model';

@Component({
  selector: 'jhi-operacao-detail',
  templateUrl: './operacao-detail.component.html',
})
export class OperacaoDetailComponent implements OnInit {
  operacao: IOperacao | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ operacao }) => (this.operacao = operacao));
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

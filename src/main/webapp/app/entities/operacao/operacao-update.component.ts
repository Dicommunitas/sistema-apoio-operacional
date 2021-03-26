import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IOperacao, Operacao } from 'app/shared/model/operacao.model';
import { OperacaoService } from './operacao.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'jhi-operacao-update',
  templateUrl: './operacao-update.component.html',
})
export class OperacaoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    descricao: [null, [Validators.required]],
    inicio: [],
    fim: [],
    quantidadeAmostras: [null, [Validators.required]],
    observacao: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected operacaoService: OperacaoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ operacao }) => {
      if (!operacao.id) {
        const today = moment().startOf('day');
        operacao.inicio = today;
        operacao.fim = today;
      }

      this.updateForm(operacao);
    });
  }

  updateForm(operacao: IOperacao): void {
    this.editForm.patchValue({
      id: operacao.id,
      descricao: operacao.descricao,
      inicio: operacao.inicio ? operacao.inicio.format(DATE_TIME_FORMAT) : null,
      fim: operacao.fim ? operacao.fim.format(DATE_TIME_FORMAT) : null,
      quantidadeAmostras: operacao.quantidadeAmostras,
      observacao: operacao.observacao,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: any, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('sistemaApoioOperacionalApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const operacao = this.createFromForm();
    if (operacao.id !== undefined) {
      this.subscribeToSaveResponse(this.operacaoService.update(operacao));
    } else {
      this.subscribeToSaveResponse(this.operacaoService.create(operacao));
    }
  }

  private createFromForm(): IOperacao {
    return {
      ...new Operacao(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      inicio: this.editForm.get(['inicio'])!.value ? moment(this.editForm.get(['inicio'])!.value, DATE_TIME_FORMAT) : undefined,
      fim: this.editForm.get(['fim'])!.value ? moment(this.editForm.get(['fim'])!.value, DATE_TIME_FORMAT) : undefined,
      quantidadeAmostras: this.editForm.get(['quantidadeAmostras'])!.value,
      observacao: this.editForm.get(['observacao'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOperacao>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}

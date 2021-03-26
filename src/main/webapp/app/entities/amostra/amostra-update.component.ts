import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IAmostra, Amostra } from 'app/shared/model/amostra.model';
import { AmostraService } from './amostra.service';
import { IOperacao } from 'app/shared/model/operacao.model';
import { OperacaoService } from 'app/entities/operacao/operacao.service';
import { IOrigemAmostra } from 'app/shared/model/origem-amostra.model';
import { OrigemAmostraService } from 'app/entities/origem-amostra/origem-amostra.service';
import { ITipoAmostra } from 'app/shared/model/tipo-amostra.model';
import { TipoAmostraService } from 'app/entities/tipo-amostra/tipo-amostra.service';
import { IFinalidadeAmostra } from 'app/shared/model/finalidade-amostra.model';
import { FinalidadeAmostraService } from 'app/entities/finalidade-amostra/finalidade-amostra.service';

type SelectableEntity = IOperacao | IOrigemAmostra | ITipoAmostra | IFinalidadeAmostra;

@Component({
  selector: 'jhi-amostra-update',
  templateUrl: './amostra-update.component.html',
})
export class AmostraUpdateComponent implements OnInit {
  isSaving = false;
  operacaos: IOperacao[] = [];
  origemamostras: IOrigemAmostra[] = [];
  tipoamostras: ITipoAmostra[] = [];
  finalidadeamostras: IFinalidadeAmostra[] = [];

  editForm = this.fb.group({
    id: [],
    dataHora: [null, [Validators.required]],
    observacao: [],
    identificacaoOutroSistema: [],
    amostraNoLaboratorio: [],
    operacao: [],
    origemAmostra: [],
    tipoAmostra: [],
    finalidadeAmostra: [],
  });

  constructor(
    protected amostraService: AmostraService,
    protected operacaoService: OperacaoService,
    protected origemAmostraService: OrigemAmostraService,
    protected tipoAmostraService: TipoAmostraService,
    protected finalidadeAmostraService: FinalidadeAmostraService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ amostra }) => {
      if (!amostra.id) {
        const today = moment().startOf('day');
        amostra.dataHora = today;
      }

      this.updateForm(amostra);

      this.operacaoService.query().subscribe((res: HttpResponse<IOperacao[]>) => (this.operacaos = res.body || []));

      this.origemAmostraService.query().subscribe((res: HttpResponse<IOrigemAmostra[]>) => (this.origemamostras = res.body || []));

      this.tipoAmostraService.query().subscribe((res: HttpResponse<ITipoAmostra[]>) => (this.tipoamostras = res.body || []));

      this.finalidadeAmostraService
        .query()
        .subscribe((res: HttpResponse<IFinalidadeAmostra[]>) => (this.finalidadeamostras = res.body || []));
    });
  }

  updateForm(amostra: IAmostra): void {
    this.editForm.patchValue({
      id: amostra.id,
      dataHora: amostra.dataHora ? amostra.dataHora.format(DATE_TIME_FORMAT) : null,
      observacao: amostra.observacao,
      identificacaoOutroSistema: amostra.identificacaoOutroSistema,
      amostraNoLaboratorio: amostra.amostraNoLaboratorio,
      operacao: amostra.operacao,
      origemAmostra: amostra.origemAmostra,
      tipoAmostra: amostra.tipoAmostra,
      finalidadeAmostra: amostra.finalidadeAmostra,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const amostra = this.createFromForm();
    if (amostra.id !== undefined) {
      this.subscribeToSaveResponse(this.amostraService.update(amostra));
    } else {
      this.subscribeToSaveResponse(this.amostraService.create(amostra));
    }
  }

  private createFromForm(): IAmostra {
    return {
      ...new Amostra(),
      id: this.editForm.get(['id'])!.value,
      dataHora: this.editForm.get(['dataHora'])!.value ? moment(this.editForm.get(['dataHora'])!.value, DATE_TIME_FORMAT) : undefined,
      observacao: this.editForm.get(['observacao'])!.value,
      identificacaoOutroSistema: this.editForm.get(['identificacaoOutroSistema'])!.value,
      amostraNoLaboratorio: this.editForm.get(['amostraNoLaboratorio'])!.value,
      operacao: this.editForm.get(['operacao'])!.value,
      origemAmostra: this.editForm.get(['origemAmostra'])!.value,
      tipoAmostra: this.editForm.get(['tipoAmostra'])!.value,
      finalidadeAmostra: this.editForm.get(['finalidadeAmostra'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAmostra>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}

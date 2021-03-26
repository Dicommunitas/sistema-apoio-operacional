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

@Component({
  selector: 'jhi-amostra-update',
  templateUrl: './amostra-update.component.html',
})
export class AmostraUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    dataHora: [null, [Validators.required]],
    observacao: [],
    identificacaoOutroSistema: [],
    amostraNoLaboratorio: [],
  });

  constructor(protected amostraService: AmostraService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ amostra }) => {
      if (!amostra.id) {
        const today = moment().startOf('day');
        amostra.dataHora = today;
      }

      this.updateForm(amostra);
    });
  }

  updateForm(amostra: IAmostra): void {
    this.editForm.patchValue({
      id: amostra.id,
      dataHora: amostra.dataHora ? amostra.dataHora.format(DATE_TIME_FORMAT) : null,
      observacao: amostra.observacao,
      identificacaoOutroSistema: amostra.identificacaoOutroSistema,
      amostraNoLaboratorio: amostra.amostraNoLaboratorio,
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
}

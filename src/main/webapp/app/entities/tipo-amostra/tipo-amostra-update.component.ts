import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITipoAmostra, TipoAmostra } from 'app/shared/model/tipo-amostra.model';
import { TipoAmostraService } from './tipo-amostra.service';

@Component({
  selector: 'jhi-tipo-amostra-update',
  templateUrl: './tipo-amostra-update.component.html',
})
export class TipoAmostraUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    descricao: [null, [Validators.required]],
  });

  constructor(protected tipoAmostraService: TipoAmostraService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoAmostra }) => {
      this.updateForm(tipoAmostra);
    });
  }

  updateForm(tipoAmostra: ITipoAmostra): void {
    this.editForm.patchValue({
      id: tipoAmostra.id,
      descricao: tipoAmostra.descricao,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipoAmostra = this.createFromForm();
    if (tipoAmostra.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoAmostraService.update(tipoAmostra));
    } else {
      this.subscribeToSaveResponse(this.tipoAmostraService.create(tipoAmostra));
    }
  }

  private createFromForm(): ITipoAmostra {
    return {
      ...new TipoAmostra(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoAmostra>>): void {
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

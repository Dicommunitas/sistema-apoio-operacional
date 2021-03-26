import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITipoFinalidadeAmostra, TipoFinalidadeAmostra } from 'app/shared/model/tipo-finalidade-amostra.model';
import { TipoFinalidadeAmostraService } from './tipo-finalidade-amostra.service';
import { IFinalidadeAmostra } from 'app/shared/model/finalidade-amostra.model';
import { FinalidadeAmostraService } from 'app/entities/finalidade-amostra/finalidade-amostra.service';

@Component({
  selector: 'jhi-tipo-finalidade-amostra-update',
  templateUrl: './tipo-finalidade-amostra-update.component.html',
})
export class TipoFinalidadeAmostraUpdateComponent implements OnInit {
  isSaving = false;
  finalidadeamostras: IFinalidadeAmostra[] = [];

  editForm = this.fb.group({
    id: [],
    descricao: [null, [Validators.required]],
    tipoFinalidadeAmostra: [],
  });

  constructor(
    protected tipoFinalidadeAmostraService: TipoFinalidadeAmostraService,
    protected finalidadeAmostraService: FinalidadeAmostraService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoFinalidadeAmostra }) => {
      this.updateForm(tipoFinalidadeAmostra);

      this.finalidadeAmostraService
        .query()
        .subscribe((res: HttpResponse<IFinalidadeAmostra[]>) => (this.finalidadeamostras = res.body || []));
    });
  }

  updateForm(tipoFinalidadeAmostra: ITipoFinalidadeAmostra): void {
    this.editForm.patchValue({
      id: tipoFinalidadeAmostra.id,
      descricao: tipoFinalidadeAmostra.descricao,
      tipoFinalidadeAmostra: tipoFinalidadeAmostra.tipoFinalidadeAmostra,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipoFinalidadeAmostra = this.createFromForm();
    if (tipoFinalidadeAmostra.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoFinalidadeAmostraService.update(tipoFinalidadeAmostra));
    } else {
      this.subscribeToSaveResponse(this.tipoFinalidadeAmostraService.create(tipoFinalidadeAmostra));
    }
  }

  private createFromForm(): ITipoFinalidadeAmostra {
    return {
      ...new TipoFinalidadeAmostra(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      tipoFinalidadeAmostra: this.editForm.get(['tipoFinalidadeAmostra'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoFinalidadeAmostra>>): void {
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

  trackById(index: number, item: IFinalidadeAmostra): any {
    return item.id;
  }
}

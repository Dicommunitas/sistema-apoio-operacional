import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFinalidadeAmostra, FinalidadeAmostra } from 'app/shared/model/finalidade-amostra.model';
import { FinalidadeAmostraService } from './finalidade-amostra.service';
import { ITipoFinalidadeAmostra } from 'app/shared/model/tipo-finalidade-amostra.model';
import { TipoFinalidadeAmostraService } from 'app/entities/tipo-finalidade-amostra/tipo-finalidade-amostra.service';

@Component({
  selector: 'jhi-finalidade-amostra-update',
  templateUrl: './finalidade-amostra-update.component.html',
})
export class FinalidadeAmostraUpdateComponent implements OnInit {
  isSaving = false;
  tipofinalidadeamostras: ITipoFinalidadeAmostra[] = [];

  editForm = this.fb.group({
    id: [],
    lacre: [null, [Validators.required]],
    tipoFinalidadeAmostra: [],
  });

  constructor(
    protected finalidadeAmostraService: FinalidadeAmostraService,
    protected tipoFinalidadeAmostraService: TipoFinalidadeAmostraService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ finalidadeAmostra }) => {
      this.updateForm(finalidadeAmostra);

      this.tipoFinalidadeAmostraService
        .query()
        .subscribe((res: HttpResponse<ITipoFinalidadeAmostra[]>) => (this.tipofinalidadeamostras = res.body || []));
    });
  }

  updateForm(finalidadeAmostra: IFinalidadeAmostra): void {
    this.editForm.patchValue({
      id: finalidadeAmostra.id,
      lacre: finalidadeAmostra.lacre,
      tipoFinalidadeAmostra: finalidadeAmostra.tipoFinalidadeAmostra,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const finalidadeAmostra = this.createFromForm();
    if (finalidadeAmostra.id !== undefined) {
      this.subscribeToSaveResponse(this.finalidadeAmostraService.update(finalidadeAmostra));
    } else {
      this.subscribeToSaveResponse(this.finalidadeAmostraService.create(finalidadeAmostra));
    }
  }

  private createFromForm(): IFinalidadeAmostra {
    return {
      ...new FinalidadeAmostra(),
      id: this.editForm.get(['id'])!.value,
      lacre: this.editForm.get(['lacre'])!.value,
      tipoFinalidadeAmostra: this.editForm.get(['tipoFinalidadeAmostra'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFinalidadeAmostra>>): void {
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

  trackById(index: number, item: ITipoFinalidadeAmostra): any {
    return item.id;
  }
}

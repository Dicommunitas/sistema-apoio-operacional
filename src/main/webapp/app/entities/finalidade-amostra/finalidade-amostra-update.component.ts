import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFinalidadeAmostra, FinalidadeAmostra } from 'app/shared/model/finalidade-amostra.model';
import { FinalidadeAmostraService } from './finalidade-amostra.service';
import { IAmostra } from 'app/shared/model/amostra.model';
import { AmostraService } from 'app/entities/amostra/amostra.service';

@Component({
  selector: 'jhi-finalidade-amostra-update',
  templateUrl: './finalidade-amostra-update.component.html',
})
export class FinalidadeAmostraUpdateComponent implements OnInit {
  isSaving = false;
  amostras: IAmostra[] = [];

  editForm = this.fb.group({
    id: [],
    lacre: [null, [Validators.required]],
    amostra: [],
  });

  constructor(
    protected finalidadeAmostraService: FinalidadeAmostraService,
    protected amostraService: AmostraService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ finalidadeAmostra }) => {
      this.updateForm(finalidadeAmostra);

      this.amostraService.query().subscribe((res: HttpResponse<IAmostra[]>) => (this.amostras = res.body || []));
    });
  }

  updateForm(finalidadeAmostra: IFinalidadeAmostra): void {
    this.editForm.patchValue({
      id: finalidadeAmostra.id,
      lacre: finalidadeAmostra.lacre,
      amostra: finalidadeAmostra.amostra,
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
      amostra: this.editForm.get(['amostra'])!.value,
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

  trackById(index: number, item: IAmostra): any {
    return item.id;
  }
}

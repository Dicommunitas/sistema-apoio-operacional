import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IOrigemAmostra, OrigemAmostra } from 'app/shared/model/origem-amostra.model';
import { OrigemAmostraService } from './origem-amostra.service';
import { IAmostra } from 'app/shared/model/amostra.model';
import { AmostraService } from 'app/entities/amostra/amostra.service';

@Component({
  selector: 'jhi-origem-amostra-update',
  templateUrl: './origem-amostra-update.component.html',
})
export class OrigemAmostraUpdateComponent implements OnInit {
  isSaving = false;
  amostras: IAmostra[] = [];

  editForm = this.fb.group({
    id: [],
    descricao: [null, [Validators.required]],
    amostra: [],
  });

  constructor(
    protected origemAmostraService: OrigemAmostraService,
    protected amostraService: AmostraService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ origemAmostra }) => {
      this.updateForm(origemAmostra);

      this.amostraService.query().subscribe((res: HttpResponse<IAmostra[]>) => (this.amostras = res.body || []));
    });
  }

  updateForm(origemAmostra: IOrigemAmostra): void {
    this.editForm.patchValue({
      id: origemAmostra.id,
      descricao: origemAmostra.descricao,
      amostra: origemAmostra.amostra,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const origemAmostra = this.createFromForm();
    if (origemAmostra.id !== undefined) {
      this.subscribeToSaveResponse(this.origemAmostraService.update(origemAmostra));
    } else {
      this.subscribeToSaveResponse(this.origemAmostraService.create(origemAmostra));
    }
  }

  private createFromForm(): IOrigemAmostra {
    return {
      ...new OrigemAmostra(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      amostra: this.editForm.get(['amostra'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrigemAmostra>>): void {
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

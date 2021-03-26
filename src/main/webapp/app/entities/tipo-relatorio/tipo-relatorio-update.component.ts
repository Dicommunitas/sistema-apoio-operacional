import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITipoRelatorio, TipoRelatorio } from 'app/shared/model/tipo-relatorio.model';
import { TipoRelatorioService } from './tipo-relatorio.service';
import { IRelatorio } from 'app/shared/model/relatorio.model';
import { RelatorioService } from 'app/entities/relatorio/relatorio.service';

@Component({
  selector: 'jhi-tipo-relatorio-update',
  templateUrl: './tipo-relatorio-update.component.html',
})
export class TipoRelatorioUpdateComponent implements OnInit {
  isSaving = false;
  relatorios: IRelatorio[] = [];

  editForm = this.fb.group({
    id: [],
    descricao: [null, [Validators.required]],
    relatorios: [],
  });

  constructor(
    protected tipoRelatorioService: TipoRelatorioService,
    protected relatorioService: RelatorioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoRelatorio }) => {
      this.updateForm(tipoRelatorio);

      this.relatorioService.query().subscribe((res: HttpResponse<IRelatorio[]>) => (this.relatorios = res.body || []));
    });
  }

  updateForm(tipoRelatorio: ITipoRelatorio): void {
    this.editForm.patchValue({
      id: tipoRelatorio.id,
      descricao: tipoRelatorio.descricao,
      relatorios: tipoRelatorio.relatorios,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipoRelatorio = this.createFromForm();
    if (tipoRelatorio.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoRelatorioService.update(tipoRelatorio));
    } else {
      this.subscribeToSaveResponse(this.tipoRelatorioService.create(tipoRelatorio));
    }
  }

  private createFromForm(): ITipoRelatorio {
    return {
      ...new TipoRelatorio(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      relatorios: this.editForm.get(['relatorios'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoRelatorio>>): void {
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

  trackById(index: number, item: IRelatorio): any {
    return item.id;
  }
}

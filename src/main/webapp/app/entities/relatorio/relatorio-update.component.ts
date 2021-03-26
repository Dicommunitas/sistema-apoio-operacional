import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IRelatorio, Relatorio } from 'app/shared/model/relatorio.model';
import { RelatorioService } from './relatorio.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { ITipoRelatorio } from 'app/shared/model/tipo-relatorio.model';
import { TipoRelatorioService } from 'app/entities/tipo-relatorio/tipo-relatorio.service';

@Component({
  selector: 'jhi-relatorio-update',
  templateUrl: './relatorio-update.component.html',
})
export class RelatorioUpdateComponent implements OnInit {
  isSaving = false;
  tiporelatorios: ITipoRelatorio[] = [];

  editForm = this.fb.group({
    id: [],
    descricao: [null, [Validators.required]],
    tipoRelatorio: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected relatorioService: RelatorioService,
    protected tipoRelatorioService: TipoRelatorioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ relatorio }) => {
      this.updateForm(relatorio);

      this.tipoRelatorioService.query().subscribe((res: HttpResponse<ITipoRelatorio[]>) => (this.tiporelatorios = res.body || []));
    });
  }

  updateForm(relatorio: IRelatorio): void {
    this.editForm.patchValue({
      id: relatorio.id,
      descricao: relatorio.descricao,
      tipoRelatorio: relatorio.tipoRelatorio,
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
    const relatorio = this.createFromForm();
    if (relatorio.id !== undefined) {
      this.subscribeToSaveResponse(this.relatorioService.update(relatorio));
    } else {
      this.subscribeToSaveResponse(this.relatorioService.create(relatorio));
    }
  }

  private createFromForm(): IRelatorio {
    return {
      ...new Relatorio(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      tipoRelatorio: this.editForm.get(['tipoRelatorio'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRelatorio>>): void {
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

  trackById(index: number, item: ITipoRelatorio): any {
    return item.id;
  }
}

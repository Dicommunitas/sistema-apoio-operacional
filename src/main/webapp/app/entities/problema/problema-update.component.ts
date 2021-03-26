import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IProblema, Problema } from 'app/shared/model/problema.model';
import { ProblemaService } from './problema.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'jhi-problema-update',
  templateUrl: './problema-update.component.html',
})
export class ProblemaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    descricao: [null, [Validators.required]],
    criticidade: [null, [Validators.required]],
    aceitarFinalizacao: [],
    foto: [null, []],
    fotoContentType: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected problemaService: ProblemaService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ problema }) => {
      this.updateForm(problema);
    });
  }

  updateForm(problema: IProblema): void {
    this.editForm.patchValue({
      id: problema.id,
      descricao: problema.descricao,
      criticidade: problema.criticidade,
      aceitarFinalizacao: problema.aceitarFinalizacao,
      foto: problema.foto,
      fotoContentType: problema.fotoContentType,
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

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const problema = this.createFromForm();
    if (problema.id !== undefined) {
      this.subscribeToSaveResponse(this.problemaService.update(problema));
    } else {
      this.subscribeToSaveResponse(this.problemaService.create(problema));
    }
  }

  private createFromForm(): IProblema {
    return {
      ...new Problema(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      criticidade: this.editForm.get(['criticidade'])!.value,
      aceitarFinalizacao: this.editForm.get(['aceitarFinalizacao'])!.value,
      fotoContentType: this.editForm.get(['fotoContentType'])!.value,
      foto: this.editForm.get(['foto'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProblema>>): void {
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

import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IStatus, Status } from 'app/shared/model/status.model';
import { StatusService } from './status.service';

@Component({
  selector: 'jhi-status-update',
  templateUrl: './status-update.component.html',
})
export class StatusUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    descricao: [null, [Validators.required]],
    prazo: [null, [Validators.required]],
    solicitarFinalizacao: [],
  });

  constructor(protected statusService: StatusService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ status }) => {
      if (!status.id) {
        const today = moment().startOf('day');
        status.prazo = today;
      }

      this.updateForm(status);
    });
  }

  updateForm(status: IStatus): void {
    this.editForm.patchValue({
      id: status.id,
      descricao: status.descricao,
      prazo: status.prazo ? status.prazo.format(DATE_TIME_FORMAT) : null,
      solicitarFinalizacao: status.solicitarFinalizacao,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const status = this.createFromForm();
    if (status.id !== undefined) {
      this.subscribeToSaveResponse(this.statusService.update(status));
    } else {
      this.subscribeToSaveResponse(this.statusService.create(status));
    }
  }

  private createFromForm(): IStatus {
    return {
      ...new Status(),
      id: this.editForm.get(['id'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      prazo: this.editForm.get(['prazo'])!.value ? moment(this.editForm.get(['prazo'])!.value, DATE_TIME_FORMAT) : undefined,
      solicitarFinalizacao: this.editForm.get(['solicitarFinalizacao'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStatus>>): void {
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

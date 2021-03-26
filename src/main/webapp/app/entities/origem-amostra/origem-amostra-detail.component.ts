import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrigemAmostra } from 'app/shared/model/origem-amostra.model';

@Component({
  selector: 'jhi-origem-amostra-detail',
  templateUrl: './origem-amostra-detail.component.html',
})
export class OrigemAmostraDetailComponent implements OnInit {
  origemAmostra: IOrigemAmostra | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ origemAmostra }) => (this.origemAmostra = origemAmostra));
  }

  previousState(): void {
    window.history.back();
  }
}

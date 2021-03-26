import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SistemaApoioOperacionalTestModule } from '../../../test.module';
import { TipoAmostraDetailComponent } from 'app/entities/tipo-amostra/tipo-amostra-detail.component';
import { TipoAmostra } from 'app/shared/model/tipo-amostra.model';

describe('Component Tests', () => {
  describe('TipoAmostra Management Detail Component', () => {
    let comp: TipoAmostraDetailComponent;
    let fixture: ComponentFixture<TipoAmostraDetailComponent>;
    const route = ({ data: of({ tipoAmostra: new TipoAmostra(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SistemaApoioOperacionalTestModule],
        declarations: [TipoAmostraDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TipoAmostraDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoAmostraDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load tipoAmostra on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoAmostra).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

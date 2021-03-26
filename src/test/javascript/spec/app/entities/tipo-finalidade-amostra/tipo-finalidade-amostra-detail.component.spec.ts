import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SistemaApoioOperacionalTestModule } from '../../../test.module';
import { TipoFinalidadeAmostraDetailComponent } from 'app/entities/tipo-finalidade-amostra/tipo-finalidade-amostra-detail.component';
import { TipoFinalidadeAmostra } from 'app/shared/model/tipo-finalidade-amostra.model';

describe('Component Tests', () => {
  describe('TipoFinalidadeAmostra Management Detail Component', () => {
    let comp: TipoFinalidadeAmostraDetailComponent;
    let fixture: ComponentFixture<TipoFinalidadeAmostraDetailComponent>;
    const route = ({ data: of({ tipoFinalidadeAmostra: new TipoFinalidadeAmostra(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SistemaApoioOperacionalTestModule],
        declarations: [TipoFinalidadeAmostraDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TipoFinalidadeAmostraDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoFinalidadeAmostraDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load tipoFinalidadeAmostra on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoFinalidadeAmostra).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

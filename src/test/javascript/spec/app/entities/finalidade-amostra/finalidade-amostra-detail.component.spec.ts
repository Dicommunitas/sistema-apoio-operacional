import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SistemaApoioOperacionalTestModule } from '../../../test.module';
import { FinalidadeAmostraDetailComponent } from 'app/entities/finalidade-amostra/finalidade-amostra-detail.component';
import { FinalidadeAmostra } from 'app/shared/model/finalidade-amostra.model';

describe('Component Tests', () => {
  describe('FinalidadeAmostra Management Detail Component', () => {
    let comp: FinalidadeAmostraDetailComponent;
    let fixture: ComponentFixture<FinalidadeAmostraDetailComponent>;
    const route = ({ data: of({ finalidadeAmostra: new FinalidadeAmostra(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SistemaApoioOperacionalTestModule],
        declarations: [FinalidadeAmostraDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(FinalidadeAmostraDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FinalidadeAmostraDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load finalidadeAmostra on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.finalidadeAmostra).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

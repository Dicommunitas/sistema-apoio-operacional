import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SistemaApoioOperacionalTestModule } from '../../../test.module';
import { OrigemAmostraDetailComponent } from 'app/entities/origem-amostra/origem-amostra-detail.component';
import { OrigemAmostra } from 'app/shared/model/origem-amostra.model';

describe('Component Tests', () => {
  describe('OrigemAmostra Management Detail Component', () => {
    let comp: OrigemAmostraDetailComponent;
    let fixture: ComponentFixture<OrigemAmostraDetailComponent>;
    const route = ({ data: of({ origemAmostra: new OrigemAmostra(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SistemaApoioOperacionalTestModule],
        declarations: [OrigemAmostraDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(OrigemAmostraDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OrigemAmostraDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load origemAmostra on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.origemAmostra).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

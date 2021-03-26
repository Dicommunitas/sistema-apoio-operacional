import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SistemaApoioOperacionalTestModule } from '../../../test.module';
import { AmostraDetailComponent } from 'app/entities/amostra/amostra-detail.component';
import { Amostra } from 'app/shared/model/amostra.model';

describe('Component Tests', () => {
  describe('Amostra Management Detail Component', () => {
    let comp: AmostraDetailComponent;
    let fixture: ComponentFixture<AmostraDetailComponent>;
    const route = ({ data: of({ amostra: new Amostra(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SistemaApoioOperacionalTestModule],
        declarations: [AmostraDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AmostraDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AmostraDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load amostra on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.amostra).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

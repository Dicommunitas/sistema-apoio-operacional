import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SistemaApoioOperacionalTestModule } from '../../../test.module';
import { TipoRelatorioDetailComponent } from 'app/entities/tipo-relatorio/tipo-relatorio-detail.component';
import { TipoRelatorio } from 'app/shared/model/tipo-relatorio.model';

describe('Component Tests', () => {
  describe('TipoRelatorio Management Detail Component', () => {
    let comp: TipoRelatorioDetailComponent;
    let fixture: ComponentFixture<TipoRelatorioDetailComponent>;
    const route = ({ data: of({ tipoRelatorio: new TipoRelatorio(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SistemaApoioOperacionalTestModule],
        declarations: [TipoRelatorioDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TipoRelatorioDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoRelatorioDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load tipoRelatorio on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tipoRelatorio).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

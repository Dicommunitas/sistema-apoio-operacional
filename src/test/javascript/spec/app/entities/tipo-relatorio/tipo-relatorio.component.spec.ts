import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SistemaApoioOperacionalTestModule } from '../../../test.module';
import { TipoRelatorioComponent } from 'app/entities/tipo-relatorio/tipo-relatorio.component';
import { TipoRelatorioService } from 'app/entities/tipo-relatorio/tipo-relatorio.service';
import { TipoRelatorio } from 'app/shared/model/tipo-relatorio.model';

describe('Component Tests', () => {
  describe('TipoRelatorio Management Component', () => {
    let comp: TipoRelatorioComponent;
    let fixture: ComponentFixture<TipoRelatorioComponent>;
    let service: TipoRelatorioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SistemaApoioOperacionalTestModule],
        declarations: [TipoRelatorioComponent],
      })
        .overrideTemplate(TipoRelatorioComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoRelatorioComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoRelatorioService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TipoRelatorio(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipoRelatorios && comp.tipoRelatorios[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

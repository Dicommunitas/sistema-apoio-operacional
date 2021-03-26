import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SistemaApoioOperacionalTestModule } from '../../../test.module';
import { RelatorioComponent } from 'app/entities/relatorio/relatorio.component';
import { RelatorioService } from 'app/entities/relatorio/relatorio.service';
import { Relatorio } from 'app/shared/model/relatorio.model';

describe('Component Tests', () => {
  describe('Relatorio Management Component', () => {
    let comp: RelatorioComponent;
    let fixture: ComponentFixture<RelatorioComponent>;
    let service: RelatorioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SistemaApoioOperacionalTestModule],
        declarations: [RelatorioComponent],
      })
        .overrideTemplate(RelatorioComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RelatorioComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RelatorioService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Relatorio(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.relatorios && comp.relatorios[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SistemaApoioOperacionalTestModule } from '../../../test.module';
import { TipoFinalidadeAmostraComponent } from 'app/entities/tipo-finalidade-amostra/tipo-finalidade-amostra.component';
import { TipoFinalidadeAmostraService } from 'app/entities/tipo-finalidade-amostra/tipo-finalidade-amostra.service';
import { TipoFinalidadeAmostra } from 'app/shared/model/tipo-finalidade-amostra.model';

describe('Component Tests', () => {
  describe('TipoFinalidadeAmostra Management Component', () => {
    let comp: TipoFinalidadeAmostraComponent;
    let fixture: ComponentFixture<TipoFinalidadeAmostraComponent>;
    let service: TipoFinalidadeAmostraService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SistemaApoioOperacionalTestModule],
        declarations: [TipoFinalidadeAmostraComponent],
      })
        .overrideTemplate(TipoFinalidadeAmostraComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoFinalidadeAmostraComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoFinalidadeAmostraService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TipoFinalidadeAmostra(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipoFinalidadeAmostras && comp.tipoFinalidadeAmostras[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

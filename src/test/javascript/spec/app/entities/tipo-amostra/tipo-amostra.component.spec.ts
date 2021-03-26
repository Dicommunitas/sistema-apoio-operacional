import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SistemaApoioOperacionalTestModule } from '../../../test.module';
import { TipoAmostraComponent } from 'app/entities/tipo-amostra/tipo-amostra.component';
import { TipoAmostraService } from 'app/entities/tipo-amostra/tipo-amostra.service';
import { TipoAmostra } from 'app/shared/model/tipo-amostra.model';

describe('Component Tests', () => {
  describe('TipoAmostra Management Component', () => {
    let comp: TipoAmostraComponent;
    let fixture: ComponentFixture<TipoAmostraComponent>;
    let service: TipoAmostraService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SistemaApoioOperacionalTestModule],
        declarations: [TipoAmostraComponent],
      })
        .overrideTemplate(TipoAmostraComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoAmostraComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoAmostraService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TipoAmostra(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tipoAmostras && comp.tipoAmostras[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

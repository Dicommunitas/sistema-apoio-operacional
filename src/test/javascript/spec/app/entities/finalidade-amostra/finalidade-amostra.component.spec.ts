import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SistemaApoioOperacionalTestModule } from '../../../test.module';
import { FinalidadeAmostraComponent } from 'app/entities/finalidade-amostra/finalidade-amostra.component';
import { FinalidadeAmostraService } from 'app/entities/finalidade-amostra/finalidade-amostra.service';
import { FinalidadeAmostra } from 'app/shared/model/finalidade-amostra.model';

describe('Component Tests', () => {
  describe('FinalidadeAmostra Management Component', () => {
    let comp: FinalidadeAmostraComponent;
    let fixture: ComponentFixture<FinalidadeAmostraComponent>;
    let service: FinalidadeAmostraService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SistemaApoioOperacionalTestModule],
        declarations: [FinalidadeAmostraComponent],
      })
        .overrideTemplate(FinalidadeAmostraComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FinalidadeAmostraComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FinalidadeAmostraService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new FinalidadeAmostra(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.finalidadeAmostras && comp.finalidadeAmostras[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

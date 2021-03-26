import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SistemaApoioOperacionalTestModule } from '../../../test.module';
import { OrigemAmostraComponent } from 'app/entities/origem-amostra/origem-amostra.component';
import { OrigemAmostraService } from 'app/entities/origem-amostra/origem-amostra.service';
import { OrigemAmostra } from 'app/shared/model/origem-amostra.model';

describe('Component Tests', () => {
  describe('OrigemAmostra Management Component', () => {
    let comp: OrigemAmostraComponent;
    let fixture: ComponentFixture<OrigemAmostraComponent>;
    let service: OrigemAmostraService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SistemaApoioOperacionalTestModule],
        declarations: [OrigemAmostraComponent],
      })
        .overrideTemplate(OrigemAmostraComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrigemAmostraComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrigemAmostraService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new OrigemAmostra(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.origemAmostras && comp.origemAmostras[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

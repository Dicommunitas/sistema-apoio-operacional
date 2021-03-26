import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SistemaApoioOperacionalTestModule } from '../../../test.module';
import { AmostraComponent } from 'app/entities/amostra/amostra.component';
import { AmostraService } from 'app/entities/amostra/amostra.service';
import { Amostra } from 'app/shared/model/amostra.model';

describe('Component Tests', () => {
  describe('Amostra Management Component', () => {
    let comp: AmostraComponent;
    let fixture: ComponentFixture<AmostraComponent>;
    let service: AmostraService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SistemaApoioOperacionalTestModule],
        declarations: [AmostraComponent],
      })
        .overrideTemplate(AmostraComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AmostraComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AmostraService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Amostra(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.amostras && comp.amostras[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

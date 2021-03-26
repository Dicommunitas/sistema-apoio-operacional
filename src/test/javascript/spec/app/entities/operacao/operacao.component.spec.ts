import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SistemaApoioOperacionalTestModule } from '../../../test.module';
import { OperacaoComponent } from 'app/entities/operacao/operacao.component';
import { OperacaoService } from 'app/entities/operacao/operacao.service';
import { Operacao } from 'app/shared/model/operacao.model';

describe('Component Tests', () => {
  describe('Operacao Management Component', () => {
    let comp: OperacaoComponent;
    let fixture: ComponentFixture<OperacaoComponent>;
    let service: OperacaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SistemaApoioOperacionalTestModule],
        declarations: [OperacaoComponent],
      })
        .overrideTemplate(OperacaoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OperacaoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OperacaoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Operacao(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.operacaos && comp.operacaos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SistemaApoioOperacionalTestModule } from '../../../test.module';
import { OperacaoDetailComponent } from 'app/entities/operacao/operacao-detail.component';
import { Operacao } from 'app/shared/model/operacao.model';

describe('Component Tests', () => {
  describe('Operacao Management Detail Component', () => {
    let comp: OperacaoDetailComponent;
    let fixture: ComponentFixture<OperacaoDetailComponent>;
    const route = ({ data: of({ operacao: new Operacao(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SistemaApoioOperacionalTestModule],
        declarations: [OperacaoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(OperacaoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OperacaoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load operacao on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.operacao).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});

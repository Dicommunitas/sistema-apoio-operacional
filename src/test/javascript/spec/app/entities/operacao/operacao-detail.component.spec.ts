import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { SistemaApoioOperacionalTestModule } from '../../../test.module';
import { OperacaoDetailComponent } from 'app/entities/operacao/operacao-detail.component';
import { Operacao } from 'app/shared/model/operacao.model';

describe('Component Tests', () => {
  describe('Operacao Management Detail Component', () => {
    let comp: OperacaoDetailComponent;
    let fixture: ComponentFixture<OperacaoDetailComponent>;
    let dataUtils: JhiDataUtils;
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
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load operacao on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.operacao).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});

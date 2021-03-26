import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { SistemaApoioOperacionalTestModule } from '../../../test.module';
import { RelatorioDetailComponent } from 'app/entities/relatorio/relatorio-detail.component';
import { Relatorio } from 'app/shared/model/relatorio.model';

describe('Component Tests', () => {
  describe('Relatorio Management Detail Component', () => {
    let comp: RelatorioDetailComponent;
    let fixture: ComponentFixture<RelatorioDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ relatorio: new Relatorio(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SistemaApoioOperacionalTestModule],
        declarations: [RelatorioDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(RelatorioDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RelatorioDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load relatorio on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.relatorio).toEqual(jasmine.objectContaining({ id: 123 }));
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

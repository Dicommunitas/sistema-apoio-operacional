import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { SistemaApoioOperacionalTestModule } from '../../../test.module';
import { ProblemaDetailComponent } from 'app/entities/problema/problema-detail.component';
import { Problema } from 'app/shared/model/problema.model';

describe('Component Tests', () => {
  describe('Problema Management Detail Component', () => {
    let comp: ProblemaDetailComponent;
    let fixture: ComponentFixture<ProblemaDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ problema: new Problema(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SistemaApoioOperacionalTestModule],
        declarations: [ProblemaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProblemaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProblemaDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load problema on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.problema).toEqual(jasmine.objectContaining({ id: 123 }));
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

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SistemaApoioOperacionalTestModule } from '../../../test.module';
import { TipoFinalidadeAmostraUpdateComponent } from 'app/entities/tipo-finalidade-amostra/tipo-finalidade-amostra-update.component';
import { TipoFinalidadeAmostraService } from 'app/entities/tipo-finalidade-amostra/tipo-finalidade-amostra.service';
import { TipoFinalidadeAmostra } from 'app/shared/model/tipo-finalidade-amostra.model';

describe('Component Tests', () => {
  describe('TipoFinalidadeAmostra Management Update Component', () => {
    let comp: TipoFinalidadeAmostraUpdateComponent;
    let fixture: ComponentFixture<TipoFinalidadeAmostraUpdateComponent>;
    let service: TipoFinalidadeAmostraService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SistemaApoioOperacionalTestModule],
        declarations: [TipoFinalidadeAmostraUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TipoFinalidadeAmostraUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoFinalidadeAmostraUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoFinalidadeAmostraService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoFinalidadeAmostra(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoFinalidadeAmostra();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});

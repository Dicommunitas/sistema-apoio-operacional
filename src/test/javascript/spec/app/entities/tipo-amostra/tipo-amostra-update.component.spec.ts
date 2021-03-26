import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SistemaApoioOperacionalTestModule } from '../../../test.module';
import { TipoAmostraUpdateComponent } from 'app/entities/tipo-amostra/tipo-amostra-update.component';
import { TipoAmostraService } from 'app/entities/tipo-amostra/tipo-amostra.service';
import { TipoAmostra } from 'app/shared/model/tipo-amostra.model';

describe('Component Tests', () => {
  describe('TipoAmostra Management Update Component', () => {
    let comp: TipoAmostraUpdateComponent;
    let fixture: ComponentFixture<TipoAmostraUpdateComponent>;
    let service: TipoAmostraService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SistemaApoioOperacionalTestModule],
        declarations: [TipoAmostraUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TipoAmostraUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoAmostraUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoAmostraService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoAmostra(123);
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
        const entity = new TipoAmostra();
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

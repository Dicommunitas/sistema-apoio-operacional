import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SistemaApoioOperacionalTestModule } from '../../../test.module';
import { AmostraUpdateComponent } from 'app/entities/amostra/amostra-update.component';
import { AmostraService } from 'app/entities/amostra/amostra.service';
import { Amostra } from 'app/shared/model/amostra.model';

describe('Component Tests', () => {
  describe('Amostra Management Update Component', () => {
    let comp: AmostraUpdateComponent;
    let fixture: ComponentFixture<AmostraUpdateComponent>;
    let service: AmostraService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SistemaApoioOperacionalTestModule],
        declarations: [AmostraUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AmostraUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AmostraUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AmostraService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Amostra(123);
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
        const entity = new Amostra();
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

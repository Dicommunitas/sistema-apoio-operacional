import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SistemaApoioOperacionalTestModule } from '../../../test.module';
import { OrigemAmostraUpdateComponent } from 'app/entities/origem-amostra/origem-amostra-update.component';
import { OrigemAmostraService } from 'app/entities/origem-amostra/origem-amostra.service';
import { OrigemAmostra } from 'app/shared/model/origem-amostra.model';

describe('Component Tests', () => {
  describe('OrigemAmostra Management Update Component', () => {
    let comp: OrigemAmostraUpdateComponent;
    let fixture: ComponentFixture<OrigemAmostraUpdateComponent>;
    let service: OrigemAmostraService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SistemaApoioOperacionalTestModule],
        declarations: [OrigemAmostraUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(OrigemAmostraUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OrigemAmostraUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OrigemAmostraService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OrigemAmostra(123);
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
        const entity = new OrigemAmostra();
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

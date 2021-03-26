import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SistemaApoioOperacionalTestModule } from '../../../test.module';
import { ProblemaUpdateComponent } from 'app/entities/problema/problema-update.component';
import { ProblemaService } from 'app/entities/problema/problema.service';
import { Problema } from 'app/shared/model/problema.model';

describe('Component Tests', () => {
  describe('Problema Management Update Component', () => {
    let comp: ProblemaUpdateComponent;
    let fixture: ComponentFixture<ProblemaUpdateComponent>;
    let service: ProblemaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SistemaApoioOperacionalTestModule],
        declarations: [ProblemaUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ProblemaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProblemaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProblemaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Problema(123);
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
        const entity = new Problema();
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

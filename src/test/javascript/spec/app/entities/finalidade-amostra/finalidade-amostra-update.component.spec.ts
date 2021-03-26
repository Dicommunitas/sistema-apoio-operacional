import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SistemaApoioOperacionalTestModule } from '../../../test.module';
import { FinalidadeAmostraUpdateComponent } from 'app/entities/finalidade-amostra/finalidade-amostra-update.component';
import { FinalidadeAmostraService } from 'app/entities/finalidade-amostra/finalidade-amostra.service';
import { FinalidadeAmostra } from 'app/shared/model/finalidade-amostra.model';

describe('Component Tests', () => {
  describe('FinalidadeAmostra Management Update Component', () => {
    let comp: FinalidadeAmostraUpdateComponent;
    let fixture: ComponentFixture<FinalidadeAmostraUpdateComponent>;
    let service: FinalidadeAmostraService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SistemaApoioOperacionalTestModule],
        declarations: [FinalidadeAmostraUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(FinalidadeAmostraUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FinalidadeAmostraUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FinalidadeAmostraService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new FinalidadeAmostra(123);
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
        const entity = new FinalidadeAmostra();
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

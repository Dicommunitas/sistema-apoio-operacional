import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SistemaApoioOperacionalTestModule } from '../../../test.module';
import { RelatorioUpdateComponent } from 'app/entities/relatorio/relatorio-update.component';
import { RelatorioService } from 'app/entities/relatorio/relatorio.service';
import { Relatorio } from 'app/shared/model/relatorio.model';

describe('Component Tests', () => {
  describe('Relatorio Management Update Component', () => {
    let comp: RelatorioUpdateComponent;
    let fixture: ComponentFixture<RelatorioUpdateComponent>;
    let service: RelatorioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SistemaApoioOperacionalTestModule],
        declarations: [RelatorioUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(RelatorioUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RelatorioUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RelatorioService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Relatorio(123);
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
        const entity = new Relatorio();
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

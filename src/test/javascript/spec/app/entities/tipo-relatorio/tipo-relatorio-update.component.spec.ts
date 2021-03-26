import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SistemaApoioOperacionalTestModule } from '../../../test.module';
import { TipoRelatorioUpdateComponent } from 'app/entities/tipo-relatorio/tipo-relatorio-update.component';
import { TipoRelatorioService } from 'app/entities/tipo-relatorio/tipo-relatorio.service';
import { TipoRelatorio } from 'app/shared/model/tipo-relatorio.model';

describe('Component Tests', () => {
  describe('TipoRelatorio Management Update Component', () => {
    let comp: TipoRelatorioUpdateComponent;
    let fixture: ComponentFixture<TipoRelatorioUpdateComponent>;
    let service: TipoRelatorioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SistemaApoioOperacionalTestModule],
        declarations: [TipoRelatorioUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TipoRelatorioUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TipoRelatorioUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoRelatorioService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TipoRelatorio(123);
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
        const entity = new TipoRelatorio();
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

import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProblemaService } from 'app/entities/problema/problema.service';
import { IProblema, Problema } from 'app/shared/model/problema.model';
import { Criticidade } from 'app/shared/model/enumerations/criticidade.model';
import { SimNao } from 'app/shared/model/enumerations/sim-nao.model';

describe('Service Tests', () => {
  describe('Problema Service', () => {
    let injector: TestBed;
    let service: ProblemaService;
    let httpMock: HttpTestingController;
    let elemDefault: IProblema;
    let expectedResult: IProblema | IProblema[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ProblemaService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Problema(0, 'AAAAAAA', Criticidade.BAIXA, SimNao.SIM, 'image/png', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Problema', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Problema()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Problema', () => {
        const returnedFromService = Object.assign(
          {
            descricao: 'BBBBBB',
            criticidade: 'BBBBBB',
            aceitarFinalizacao: 'BBBBBB',
            foto: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Problema', () => {
        const returnedFromService = Object.assign(
          {
            descricao: 'BBBBBB',
            criticidade: 'BBBBBB',
            aceitarFinalizacao: 'BBBBBB',
            foto: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Problema', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});

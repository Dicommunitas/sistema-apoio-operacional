import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { OperacaoService } from 'app/entities/operacao/operacao.service';
import { IOperacao, Operacao } from 'app/shared/model/operacao.model';

describe('Service Tests', () => {
  describe('Operacao Service', () => {
    let injector: TestBed;
    let service: OperacaoService;
    let httpMock: HttpTestingController;
    let elemDefault: IOperacao;
    let expectedResult: IOperacao | IOperacao[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(OperacaoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Operacao(0, 'AAAAAAA', currentDate, currentDate, 0, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            inicio: currentDate.format(DATE_TIME_FORMAT),
            fim: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Operacao', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            inicio: currentDate.format(DATE_TIME_FORMAT),
            fim: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            inicio: currentDate,
            fim: currentDate,
          },
          returnedFromService
        );

        service.create(new Operacao()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Operacao', () => {
        const returnedFromService = Object.assign(
          {
            descricao: 'BBBBBB',
            inicio: currentDate.format(DATE_TIME_FORMAT),
            fim: currentDate.format(DATE_TIME_FORMAT),
            quantidadeAmostras: 1,
            observacao: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            inicio: currentDate,
            fim: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Operacao', () => {
        const returnedFromService = Object.assign(
          {
            descricao: 'BBBBBB',
            inicio: currentDate.format(DATE_TIME_FORMAT),
            fim: currentDate.format(DATE_TIME_FORMAT),
            quantidadeAmostras: 1,
            observacao: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            inicio: currentDate,
            fim: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Operacao', () => {
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

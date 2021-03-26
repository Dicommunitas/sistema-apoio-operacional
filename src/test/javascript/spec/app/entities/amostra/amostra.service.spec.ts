import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { AmostraService } from 'app/entities/amostra/amostra.service';
import { IAmostra, Amostra } from 'app/shared/model/amostra.model';
import { SimNao } from 'app/shared/model/enumerations/sim-nao.model';

describe('Service Tests', () => {
  describe('Amostra Service', () => {
    let injector: TestBed;
    let service: AmostraService;
    let httpMock: HttpTestingController;
    let elemDefault: IAmostra;
    let expectedResult: IAmostra | IAmostra[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(AmostraService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Amostra(0, currentDate, 'AAAAAAA', 'AAAAAAA', SimNao.NAO);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dataHora: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Amostra', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dataHora: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataHora: currentDate,
          },
          returnedFromService
        );

        service.create(new Amostra()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Amostra', () => {
        const returnedFromService = Object.assign(
          {
            dataHora: currentDate.format(DATE_TIME_FORMAT),
            observacao: 'BBBBBB',
            identificacaoOutroSistema: 'BBBBBB',
            amostraNoLaboratorio: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataHora: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Amostra', () => {
        const returnedFromService = Object.assign(
          {
            dataHora: currentDate.format(DATE_TIME_FORMAT),
            observacao: 'BBBBBB',
            identificacaoOutroSistema: 'BBBBBB',
            amostraNoLaboratorio: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dataHora: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Amostra', () => {
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

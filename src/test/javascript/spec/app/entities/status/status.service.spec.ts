import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { StatusService } from 'app/entities/status/status.service';
import { IStatus, Status } from 'app/shared/model/status.model';
import { SimNao } from 'app/shared/model/enumerations/sim-nao.model';

describe('Service Tests', () => {
  describe('Status Service', () => {
    let injector: TestBed;
    let service: StatusService;
    let httpMock: HttpTestingController;
    let elemDefault: IStatus;
    let expectedResult: IStatus | IStatus[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(StatusService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Status(0, 'AAAAAAA', currentDate, SimNao.SIM);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            prazo: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Status', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            prazo: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            prazo: currentDate,
          },
          returnedFromService
        );

        service.create(new Status()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Status', () => {
        const returnedFromService = Object.assign(
          {
            descricao: 'BBBBBB',
            prazo: currentDate.format(DATE_TIME_FORMAT),
            solicitarFinalizacao: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            prazo: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Status', () => {
        const returnedFromService = Object.assign(
          {
            descricao: 'BBBBBB',
            prazo: currentDate.format(DATE_TIME_FORMAT),
            solicitarFinalizacao: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            prazo: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Status', () => {
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

import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TipoFinalidadeAmostraService } from 'app/entities/tipo-finalidade-amostra/tipo-finalidade-amostra.service';
import { ITipoFinalidadeAmostra, TipoFinalidadeAmostra } from 'app/shared/model/tipo-finalidade-amostra.model';

describe('Service Tests', () => {
  describe('TipoFinalidadeAmostra Service', () => {
    let injector: TestBed;
    let service: TipoFinalidadeAmostraService;
    let httpMock: HttpTestingController;
    let elemDefault: ITipoFinalidadeAmostra;
    let expectedResult: ITipoFinalidadeAmostra | ITipoFinalidadeAmostra[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(TipoFinalidadeAmostraService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new TipoFinalidadeAmostra(0, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a TipoFinalidadeAmostra', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new TipoFinalidadeAmostra()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a TipoFinalidadeAmostra', () => {
        const returnedFromService = Object.assign(
          {
            descricao: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of TipoFinalidadeAmostra', () => {
        const returnedFromService = Object.assign(
          {
            descricao: 'BBBBBB',
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

      it('should delete a TipoFinalidadeAmostra', () => {
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

import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Precio } from '../model/precio';
import { Reserva } from '../model/reserva';

import { ReservaService } from './reserva.service';

describe('ReservaService', () => {
  let service: ReservaService;
  let httpMock: HttpTestingController;
  const apiEndpointConsultarReserva = `${environment.endpoint}/reservas`;
  const apiEndpointConsultarReservaPorId = `${environment.endpoint}/reservas/1`;
  const apiEndpointCrearReserva = `${environment.endpoint}/reservas`;
  const apiEndpointActualizarReserva = `${environment.endpoint}/reservas/1`;
  const apiEndpointEliminarReserva = `${environment.endpoint}/reservas/1`;
  const apiEndpointListarTipoUsario = `${environment.endpoint}/tipousuario`;
  const apiEndpointListarTipoHabitacion = `${environment.endpoint}/tipohabitacion`;
  const apiEndpointListarPreciosPorTipoHabitacion = `${environment.endpoint}/precios/3`;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReservaService, HttpService]
    });
    service = TestBed.inject(ReservaService);
    httpMock = injector.inject(HttpTestingController);
  });

  it('should be created', () => {
    const service: ReservaService = TestBed.inject(ReservaService);
    expect(service).toBeTruthy();
  });


  it('deberia listar reservas', () => {
    const dummyReservas = [
      new Reserva(1, '1214721788', 'Victor Estrada C', '2022-02-27', '2022-02-24', 680000, 3, 3),
      new Reserva(2, '35834321', 'Diana Mejia', '2022-02-26', '2022-02-24', 560000, 2, 2)
    ];
    service.consultar().subscribe(reservas => {
      expect(reservas.length).toBe(2);
      expect(reservas).toEqual(dummyReservas);
    });
    const req = httpMock.expectOne(apiEndpointConsultarReserva);
    expect(req.request.method).toBe('GET');
    req.flush(dummyReservas);
  });

  it('deberia listar reserva por id', () => {
    const dummyReservas = [
      new Reserva(1, '1214721788', 'Victor Estrada C', '2022-02-27', '2022-02-24', 680000, 3, 3)
    ];
    service.consultarPorId(1).subscribe(reservas => {
      expect(reservas.length).toBe(1);
      expect(reservas).toEqual(dummyReservas);
    });
    const req = httpMock.expectOne(apiEndpointConsultarReservaPorId);
    expect(req.request.method).toBe('GET');
    req.flush(dummyReservas);
  });

  it('deberia crear una reserva', () => {
    const dummyReserva = new Reserva(1, '1214721788', 'Victor Estrada C', '2022-02-27', '2022-02-24', 680000, 3, 3);
    service.guardar(dummyReserva).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointCrearReserva);
    expect(req.request.method).toBe('POST');
    req.event(new HttpResponse<boolean>({ body: true }));
  });

  it('deberia actualizar una reserva', () => {
    const dummyReserva = new Reserva(1, '1214721788', 'Victor Estrada', '2022-02-27', '2022-02-24', 680000, 3, 3);
    service.actualizar(dummyReserva).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(apiEndpointActualizarReserva);
    expect(req.request.method).toBe('PUT');
    req.event(new HttpResponse<boolean>({ body: true }));
  });

  it('deberia eliminar una', () => {
    const dummyReserva = new Reserva(1, '1214721788', 'Victor Estrada C', '2022-02-27', '2022-02-24', 680000, 3, 3);
    service.eliminar(dummyReserva).subscribe((respuesta) => {
      expect(respuesta).toEqual(true);
    });
    const req = httpMock.expectOne(`${apiEndpointEliminarReserva}`);
    expect(req.request.method).toBe('DELETE');
    req.event(new HttpResponse<boolean>({ body: true }));
  });

  it('deberia listar los tipos de usuario', () => {
    const dummyTipoUsuario = [
      {
        "id": 1,
        "tipoUsuario": "casual"
      },
      {
        "id": 2,
        "tipoUsuario": "frecuente"
      },
      {
        "id": 3,
        "tipoUsuario": "miembro"
      }
    ];
    service.listarTipoUsuario().subscribe(reservas => {
      expect(reservas.length).toBe(3);
      expect(reservas).toEqual(dummyTipoUsuario);
    });
    const req = httpMock.expectOne(apiEndpointListarTipoUsario);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTipoUsuario);
  });

  it('deberia listar los tipos de habitacion', () => {
    const dummyTipoHabitacion = [
      {
        "id": 1,
        "tipoHabitacion": "sencilla"
      },
      {
        "id": 2,
        "tipoHabitacion": "especial"
      },
      {
        "id": 3,
        "tipoHabitacion": "suite"
      }
    ];
    service.listarTipoHabitacion().subscribe(reservas => {
      expect(reservas.length).toBe(3);
      expect(reservas).toEqual(dummyTipoHabitacion);
    });
    const req = httpMock.expectOne(apiEndpointListarTipoHabitacion);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTipoHabitacion);
  });

  it('deberia listar precios por tipo de habitacion', () => {
    const dummyPrecios = [new Precio(3, 650000, 850000, 3)];
    service.consultarPrecioPorTipoHabitacion(3).subscribe(reservas => {
      expect(reservas.length).toBe(1);
      expect(reservas).toEqual(dummyPrecios);
    });
    const req = httpMock.expectOne(apiEndpointListarPreciosPorTipoHabitacion);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPrecios);
  });


});

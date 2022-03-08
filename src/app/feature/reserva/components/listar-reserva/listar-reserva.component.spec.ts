import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { ReservaService } from '@reserva/shared/service/reserva.service';
import { ReservaMockService } from '@shared/mocks/reserva-mock-service';
import { of } from 'rxjs';
import Swal, { SweetAlertResult } from 'sweetalert2';

import { ListarReservaComponent } from './listar-reserva.component';

describe('ListarReservaComponent', () => {
  let component: ListarReservaComponent;
  let fixture: ComponentFixture<ListarReservaComponent>;
  let service: ReservaService;
  const mockService: ReservaMockService = new ReservaMockService();
  let spyOnConsultar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarReservaComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [ReservaService, HttpService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarReservaComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ReservaService);
    spyOnConsultar = spyOn(service, 'consultar').and.returnValue(of(mockService.consultar()));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Listar las reservas', () => {
    component.getReservas();
    expect(component.listaDeReservas.length).toBe(2);
  });

  it('deberia eliminar una reserva si confirmar es true', fakeAsync(() => {
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true } as SweetAlertResult));
    spyOn(service, 'eliminar').and.returnValue(of(true));
    spyOnConsultar.and.callThrough();
    spyOnConsultar.and.returnValue(of([
      {
        id: 1,
        identificacionUsuario: '1214721788',
        nombreUsuario: 'Victor Estrada C',
        fechaReserva: '2022-02-27',
        fechaCreacion: '2022-02-24',
        valorAPagar: 680000,
        idTipoHabitacion: 3,
        idTipoUsuario: 3
      },
    ]));
    component.eliminarReserva(mockService.eliminar());
    tick(3);
    expect(component.listaDeReservas.length).toBe(1);
  }));

});

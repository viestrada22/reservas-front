import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { ReservaService } from '@reserva/shared/service/reserva.service';
import { of } from 'rxjs';

import { ListarReservaComponent } from './listar-reserva.component';

describe('ListarReservaComponent', () => {
  let component: ListarReservaComponent;
  let fixture: ComponentFixture<ListarReservaComponent>;
  let service: ReservaService;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Listar las reservas', () => {
    spyOn(service, 'consultar').and.returnValue(of([
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
      {
        id: 2,
        identificacionUsuario: '35834321',
        nombreUsuario: 'Diana Mejia',
        fechaReserva: '2022-02-26',
        fechaCreacion: '2022-02-24',
        valorAPagar: 560000,
        idTipoHabitacion: 2,
        idTipoUsuario: 2
      }
    ]));
    component.getReservas();
    expect(component.listaDeReservas.length).toBe(2);
  });

  it('deberia eliminar una reserva', () => {
    spyOn(service, 'eliminar').and.returnValue(of(true));
    component.eliminarReserva({
      id: 2,
      identificacionUsuario: '35834321',
      nombreUsuario: 'Diana Mejia',
      fechaReserva: '2022-02-26',
      fechaCreacion: '2022-02-24',
      valorAPagar: 560000,
      idTipoHabitacion: 2,
      idTipoUsuario: 2
    });
    spyOn(service, 'consultar').and.returnValue(of([
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
    component.getReservas();
    expect(component.listaDeReservas.length).toBe(1);
  });

});

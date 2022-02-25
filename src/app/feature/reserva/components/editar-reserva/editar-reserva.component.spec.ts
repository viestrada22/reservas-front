import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { ReservaService } from '@reserva/shared/service/reserva.service';
import { of } from 'rxjs';

import { EditarReservaComponent } from './editar-reserva.component';


describe('EditarReservaComponent', () => {
  let component: EditarReservaComponent;
  let fixture: ComponentFixture<EditarReservaComponent>;
  let routeSpy: any;
  let service: ReservaService;

  beforeEach(async () => {
    routeSpy = { navigate: jasmine.createSpy('navigate') };
    await TestBed.configureTestingModule({
      declarations: [EditarReservaComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        ReservaService,
        HttpService,
        { provide: Router, useValue: routeSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: 1 } } } }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarReservaComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ReservaService);
    spyOn(service, 'actualizar').and.returnValue(of(true));
    spyOn(service, 'consultarPorId').and.returnValue(of([{
      "id": 1,
      "identificacionUsuario": "1214721788",
      "nombreUsuario": "Victor Estrada C",
      "fechaReserva": "2022-02-27",
      "fechaCreacion": "2022-02-24",
      "valorAPagar": 680000,
      "idTipoHabitacion": 3,
      "idTipoUsuario": 3
    }]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('El formulario es invalido cuando esta vacio', () => {
    expect(component.editarReservaForm.valid).toBeTruthy();
  });

  it('Actualizando reserva', () => {
    component.getDatosDeReserva();
    component.editarReservaForm.controls.id.setValue(1);
    component.editarReservaForm.controls.userId.setValue('123456');
    component.editarReservaForm.controls.userName.setValue('Julian Florez');
    component.editarReservaForm.controls.reservationDate.setValue('2022-02-25');
    component.editarReservaForm.controls.roomType.setValue(3);
    component.editarReservaForm.controls.userType.setValue(3);
    component.editarReservaForm.controls.totalPayment.setValue(650000);
    expect(component.editarReservaForm.valid).toBeTruthy();
    component.actualizar();
    expect(service.actualizar).toHaveBeenCalled();
  });

  it('Listar tipos de usuario', () => {
    spyOn(service, 'listarTipoUsuario').and.returnValue(of([
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
    ]));
    component.getTipoUsuario();
    expect(component.listaTipoUsuarios.length).toBe(3);
  });

  it('Listar tipos de habitacion', () => {
    spyOn(service, 'listarTipoHabitacion').and.returnValue(of([
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
    ]));
    component.getTipoHabitacion();
    expect(component.listaTipoHabitaciones.length).toBe(3);
  });

  it('Deberia calcular precio por tipo de habitación', () => {
    component.getDatosDeReserva();
    spyOn(service, 'consultarPrecioPorTipoHabitacion').and.returnValue(of([{
      "id": 3,
      "precioSemana": 650000,
      "precioFinDeSemana": 850000,
      "idTipoHabitacion": 3
    }]));
    component.editarReservaForm.controls.roomType.setValue(3);
    component.calcularPago();
    expect(component.editarReservaForm.controls.totalPayment.value).toBeGreaterThan(0);
  });
});
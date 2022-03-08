import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { ReservaService } from '@reserva/shared/service/reserva.service';
import { ReservaMockService } from '@shared/mocks/reserva-mock-service';
import { of } from 'rxjs';

import { ReservaFormComponent } from './reserva-form.component';

describe('ReservaFormComponent', () => {
  let component: ReservaFormComponent;
  let fixture: ComponentFixture<ReservaFormComponent>;
  let service: ReservaService;
  const mockService: ReservaMockService = new ReservaMockService();
  let routeSpy: any;

  beforeEach(async () => {
    routeSpy = { navigate: jasmine.createSpy('navigate') };
    await TestBed.configureTestingModule({
      declarations: [ReservaFormComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [ReservaService, HttpService, { provide: Router, useValue: routeSpy }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaFormComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ReservaService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('El formulario es invalido cuando esta vacio', () => {
    expect(component.reservaForm.valid).toBeFalsy();
  });

  it('Registrando reserva', () => {
    spyOn(service, 'guardar').and.returnValue(of(true));
    expect(component.reservaForm.valid).toBeFalsy();
    component.reservaForm.controls.userId.setValue('123456');
    component.reservaForm.controls.userName.setValue('Julian Florez');
    component.reservaForm.controls.reservationDate.setValue('2022-03-11');
    component.reservaForm.controls.roomType.setValue(3);
    component.reservaForm.controls.userType.setValue(3);
    component.reservaForm.controls.totalPayment.setValue(650000);
    expect(component.reservaForm.valid).toBeTruthy();
    component.guardarDatos();
  });

  it('Actualizando reserva', () => {
    component.reservaForm.controls.id.setValue(1);
    component.reservaForm.controls.userId.setValue('123456');
    component.reservaForm.controls.userName.setValue('Julian Florez');
    component.reservaForm.controls.reservationDate.setValue('2022-03-25');
    component.reservaForm.controls.roomType.setValue(3);
    component.reservaForm.controls.userType.setValue(3);
    component.reservaForm.controls.totalPayment.setValue(650000);
    expect(component.reservaForm.valid).toBeTruthy();
    component.guardarDatos();
  });

  it('Listar tipos de usuario', () => {
    spyOn(service, 'listarTipoUsuario').and.returnValue(of(mockService.listarTipoUsuario()));
    component.getTipoUsuario();
    expect(component.listaTipoUsuarios.length).toBe(3);
  });

  it('Listar tipos de habitacion', () => {
    spyOn(service, 'listarTipoHabitacion').and.returnValue(of(mockService.listarTipoHabitacion()));
    component.getTipoHabitacion();
    expect(component.listaTipoHabitaciones.length).toBe(3);
  });

  it('Deberia calcular precio por tipo de habitación', () => {
    spyOn(service, 'consultarPrecioPorTipoHabitacion').and.returnValue(of([{
      id: 3,
      precioSemana: 650000,
      precioFinDeSemana: 850000,
      idTipoHabitacion: 3
    }]));
    component.reservaForm.controls.roomType.setValue(3);
    component.calcularPago();
    expect(component.reservaForm.controls.totalPayment.value).toBeGreaterThan(0);
  });

});

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { ReservaService } from '@reserva/shared/service/reserva.service';
import { ReservaMockService } from '@shared/mocks/reserva-mock-service';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

import { CrearReservaComponent } from './crear-reserva.component';

describe('CrearReservaComponent', () => {
  let component: CrearReservaComponent;
  let fixture: ComponentFixture<CrearReservaComponent>;
  let routeSpy: any;
  let service: ReservaService;
  const mockService: ReservaMockService = new ReservaMockService();

  beforeEach(async () => {
    routeSpy = { navigate: jasmine.createSpy('navigate') };
    await TestBed.configureTestingModule({
      declarations: [CrearReservaComponent],
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
    fixture = TestBed.createComponent(CrearReservaComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ReservaService);
    spyOn(service, 'guardar').and.returnValue(of(true));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería recibir la data y crear la reserva', () => {
    const data = mockService.crear();
    component.crear(data);
    spyOn(Swal, 'fire').and.callFake(args => args);
    expect(service.guardar).toHaveBeenCalled();
  });

});

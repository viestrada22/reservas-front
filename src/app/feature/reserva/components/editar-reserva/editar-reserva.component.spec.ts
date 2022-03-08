import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { ReservaService } from '@reserva/shared/service/reserva.service';
import { ReservaMockService } from '@shared/mocks/reserva-mock-service';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

import { EditarReservaComponent } from './editar-reserva.component';


describe('EditarReservaComponent', () => {
  let component: EditarReservaComponent;
  let fixture: ComponentFixture<EditarReservaComponent>;
  let routeSpy: any;
  let service: ReservaService;
  const mockService: ReservaMockService = new ReservaMockService();

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
    spyOn(service, 'consultarPorId').and.returnValue(of(mockService.consultarPorId()));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería recibir la data y actualizar la reserva', () => {
    const data = mockService.actualizar();
    component.actualizar(data);
    spyOn(Swal, 'fire').and.callFake(args => args);
    expect(service.actualizar).toHaveBeenCalled();
  });

});

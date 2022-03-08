import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Precio } from '@reserva/shared/model/precio';
import { Reserva } from '@reserva/shared/model/reserva';
import { TipoHabitacion } from '@reserva/shared/model/tipo-habitacion';
import { TipoUsuario } from '@reserva/shared/model/tipo-usuario';
import { ReservaService } from '@reserva/shared/service/reserva.service';
import * as moment from 'moment';

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 3;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 30;

@Component({
  selector: 'app-reserva-form',
  templateUrl: './reserva-form.component.html',
  styleUrls: ['./reserva-form.component.sass']
})
export class ReservaFormComponent implements OnInit {
  @Input() titleText: string;
  @Input() submitText: string;
  @Input() reserva: Reserva;
  @Output() execution: EventEmitter<any> = new EventEmitter<any>();

  reservaForm: FormGroup;
  minDate: string = moment().add(1, 'days').format('YYYY-MM-DD');
  listaTipoUsuarios: TipoUsuario[] = [];
  listaTipoHabitaciones: TipoHabitacion[] = [];
  precios: Precio[] = [];

  constructor(private reservaService: ReservaService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.construirFormularioReserva();
    this.getTipoHabitacion();
    this.getTipoUsuario();
  }

  private construirFormularioReserva() {
    this.reservaForm = this.fb.group({
      id: [this.reserva !== undefined ? this.reserva.id : null],
      userId: [this.reserva !== undefined ? this.reserva.identificacionUsuario : '',
      [
        Validators.required,
        Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
        Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)
      ]
      ],
      userName: [this.reserva !== undefined ? this.reserva.nombreUsuario : '',
      [
        Validators.required,
        Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
        Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)
      ]
      ],
      reservationDate: [this.reserva !== undefined ? this.reserva.fechaReserva : '', Validators.required],
      userType: [this.reserva !== undefined ? this.reserva.idTipoUsuario : '', Validators.required],
      roomType: [this.reserva !== undefined ? this.reserva.idTipoHabitacion : '', Validators.required],
      totalPayment: [this.reserva !== undefined ? this.reserva.valorAPagar : '', Validators.required]
    });
  }

  getTipoUsuario() {
    this.reservaService.listarTipoUsuario().subscribe(resp => this.listaTipoUsuarios = resp);
  }

  getTipoHabitacion() {
    this.reservaService.listarTipoHabitacion().subscribe(resp => this.listaTipoHabitaciones = resp);
  }

  calcularPago() {
    this.reservaForm.get('totalPayment').reset(null);
    const reservationDay = moment(this.reservaForm.get('reservationDate')?.value).isoWeekday();
    const roomTypeId = this.reservaForm.get('roomType')?.value;

    if (roomTypeId !== null) {
      const SABADO = 6;
      const DOMINGO = 7;
      this.reservaService.consultarPrecioPorTipoHabitacion(roomTypeId).subscribe((resp: Precio[]) => {
        if (reservationDay === SABADO || reservationDay === DOMINGO) {
          this.reservaForm.get('totalPayment').setValue(resp[0].precioFinDeSemana);
        } else {
          this.reservaForm.get('totalPayment').setValue(resp[0].precioSemana);
        }
      });
    }
  }

  guardarDatos() {
    const reserva = {
      id: this.reservaForm.get('id').value,
      identificacionUsuario: this.reservaForm.get('userId').value,
      nombreUsuario: this.reservaForm.get('userName').value,
      fechaReserva: moment(this.reservaForm.get('reservationDate').value).format('YYYY-MM-DD'),
      fechaCreacion: moment().format('YYYY-MM-DD'),
      valorAPagar: this.reservaForm.get('totalPayment').value,
      idTipoHabitacion: this.reservaForm.get('roomType').value,
      idTipoUsuario: this.reservaForm.get('userType').value
    };
    this.execution.emit(reserva);
    this.reservaForm.reset();
  }

}

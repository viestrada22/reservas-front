import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Precio } from '@reserva/shared/model/precio';
import { TipoHabitacion } from '@reserva/shared/model/tipo-habitacion';
import { TipoUsuario } from '@reserva/shared/model/tipo-usuario';
import { ReservaService } from '@reserva/shared/service/reserva.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';


const LONGITUD_MINIMA_PERMITIDA_TEXTO = 3;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 30;

@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.sass']
})
export class CrearReservaComponent implements OnInit {
  reservaForm: FormGroup;
  minDate: string = moment().add(1, 'days').format('YYYY-MM-DD');
  listaTipoUsuarios: TipoUsuario[] = [];
  listaTipoHabitaciones: TipoHabitacion[] = [];
  precios: Precio[] = [];

  constructor(private reservaService: ReservaService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getTipoUsuario();
    this.getTipoHabitacion();
    this.construirFormularioReserva();
  }

  private construirFormularioReserva() {
    this.reservaForm = this.fb.group({
      id: [null],
      userId: ['',
        [
          Validators.required,
          Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
          Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)
        ]
      ],
      userName: ['',
        [
          Validators.required,
          Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO),
          Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)
        ]
      ],
      reservationDate: ['', Validators.required],
      userType: ['', Validators.required],
      roomType: ['', Validators.required],
      totalPayment: ['', Validators.required]
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
      this.reservaService.consultarPrecioPorTipoHabitacion(roomTypeId)
        .subscribe((resp: Precio[]) => {
          if (reservationDay === 6 || reservationDay === 7) {
            this.reservaForm.get('totalPayment').setValue(resp[0].precioFinDeSemana);
          } else {
            this.reservaForm.get('totalPayment').setValue(resp[0].precioSemana);
          }
        });
    }
  }

  crear() {
    if (this.reservaForm.invalid) {
      return;
    }

    const reserva = {
      id: this.reservaForm.get('id').value,
      identificacionUsuario: this.reservaForm.get('userId').value,
      nombreUsuario: this.reservaForm.get('userName').value,
      fechaReserva: moment(this.reservaForm.get('reservationDate').value).format('YYYY-MM-DD'),
      fechaCreacion: moment().format('YYYY-MM-DD'),
      valorAPagar: this.reservaForm.get('totalPayment').value,
      idTipoHabitacion: this.reservaForm.get('roomType').value,
      idTipoUsuario: this.reservaForm.get('userType').value,
    };

    this.reservaService.guardar(reserva).subscribe(response => {
      if (response[`valor`] !== undefined) {
        Swal.fire({
          icon: 'success',
          title: 'Hecho',
          text: 'Su reserva se ha creado exitosamente.',
          showConfirmButton: true,
          timer: 2000
        });
        this.reservaForm.reset();
      }
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Opps...',
        text: `Se ha generado un error. ${error.error.mensaje}`,
        showConfirmButton: true,
        timer: 5000
      });
    });
  }
}

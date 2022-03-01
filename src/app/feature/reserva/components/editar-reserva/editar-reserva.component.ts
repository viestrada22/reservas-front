import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Precio } from '@reserva/shared/model/precio';
import { TipoHabitacion } from '@reserva/shared/model/tipo-habitacion';
import { TipoUsuario } from '@reserva/shared/model/tipo-usuario';
import { ReservaService } from '@reserva/shared/service/reserva.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

const LONGITUD_MINIMA_PERMITIDA_TEXTO = 3;
const LONGITUD_MAXIMA_PERMITIDA_TEXTO = 30;

@Component({
  selector: 'app-editar-reserva',
  templateUrl: './editar-reserva.component.html',
  styleUrls: ['./editar-reserva.component.sass']
})
export class EditarReservaComponent implements OnInit {
  editarReservaForm: FormGroup = new FormGroup({});
  minDate: string = moment().add(1, 'days').format('YYYY-MM-DD');
  listaTipoUsuarios: TipoUsuario[] = [];
  listaTipoHabitaciones: TipoHabitacion[] = [];

  constructor(
    private reservaService: ReservaService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.getDatosDeReserva();
    this.getTipoHabitacion();
    this.getTipoUsuario();
  }

  getDatosDeReserva() {
    const id = this.activatedRoute.snapshot.params.id;
    this.reservaService.consultarPorId(id)
      .subscribe(reserva => {
        this.editarReservaForm = this.fb.group({
          id: new FormControl(reserva[0].id, Validators.required),
          userId: new FormControl(reserva[0].identificacionUsuario,
            [
              Validators.required,
              Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO)
            ]
          ),
          userName: new FormControl(reserva[0].nombreUsuario,
            [
              Validators.required,
              Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_TEXTO)
            ]
          ),
          userType: new FormControl(reserva[0].idTipoUsuario, Validators.required),
          roomType: new FormControl(reserva[0].idTipoHabitacion, Validators.required),
          reservationDate: new FormControl(reserva[0].fechaReserva, Validators.required),
          totalPayment: new FormControl(reserva[0].valorAPagar, Validators.required)
        });
      });
  }

  getTipoUsuario() {
    this.reservaService.listarTipoUsuario().subscribe(resp => this.listaTipoUsuarios = resp);
  }

  getTipoHabitacion() {
    this.reservaService.listarTipoHabitacion().subscribe(resp => this.listaTipoHabitaciones = resp);
  }

  calcularPago() {
    this.editarReservaForm.get('totalPayment').reset(null);
    const reservationDay = moment(this.editarReservaForm.get('reservationDate')?.value).isoWeekday();
    const roomTypeId = this.editarReservaForm.get('roomType')?.value;

    if (roomTypeId !== null) {
      const SABADO = 6;
      const DOMINGO = 7;
      this.reservaService.consultarPrecioPorTipoHabitacion(roomTypeId).subscribe((resp: Precio[]) => {
        if (reservationDay === SABADO || reservationDay === DOMINGO) {
          this.editarReservaForm.get('totalPayment').setValue(resp[0].precioFinDeSemana);
        } else {
          this.editarReservaForm.get('totalPayment').setValue(resp[0].precioSemana);
        }
      });
    }
  }

  actualizar() {
    if (this.editarReservaForm.invalid) {
      return;
    }

    const reserva = {
      id: this.editarReservaForm.get('id').value,
      identificacionUsuario: this.editarReservaForm.get('userId').value,
      nombreUsuario: this.editarReservaForm.get('userName').value,
      fechaReserva: moment(this.editarReservaForm.get('reservationDate').value).format('YYYY-MM-DD'),
      fechaCreacion: moment().format('YYYY-MM-DD'),
      valorAPagar: this.editarReservaForm.get('totalPayment').value,
      idTipoHabitacion: this.editarReservaForm.get('roomType').value,
      idTipoUsuario: this.editarReservaForm.get('userType').value
    };

    this.reservaService.actualizar(reserva).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Hecho',
        text: 'Su reserva se ha sido modificada exitosamente.',
        showConfirmButton: true,
        timer: 2000
      });
      this.router.navigate(['/reserva/listar']);
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Algo salió mal.',
        text: `Se ha generado un error. ${error.error.mensaje}`,
        showConfirmButton: true,
        timer: 5000
      });
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reserva } from '@reserva/shared/model/reserva';
import { ReservaService } from '@reserva/shared/service/reserva.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-reserva',
  templateUrl: './editar-reserva.component.html',
  styleUrls: ['./editar-reserva.component.sass']
})
export class EditarReservaComponent implements OnInit {
  reserva: Reserva;

  constructor(
    private reservaService: ReservaService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.reservaService.consultarPorId(id).subscribe(resp => this.reserva = resp[0]);
  }

  actualizar(data: Reserva) {
    if (data === null) {
      return;
    }

    this.reservaService.actualizar(data).subscribe(() => {
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

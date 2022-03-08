import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reserva } from '@reserva/shared/model/reserva';
import { ReservaService } from '@reserva/shared/service/reserva.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.sass']
})
export class CrearReservaComponent implements OnInit {
  reserva: Reserva;

  constructor(private reservaService: ReservaService, private router: Router) { }

  ngOnInit(): void { }

  crear(data: Reserva) {
    if (data === null) {
      return;
    }

    this.reservaService.guardar(data).subscribe(response => {
      if (response[`valor`] !== undefined) {
        Swal.fire({
          icon: 'success',
          title: 'Hecho',
          text: 'Su reserva se ha creado exitosamente.',
          showConfirmButton: true,
          timer: 2000
        });
        this.router.navigate(['/reserva/listar']);
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

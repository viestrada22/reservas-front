import { Component, OnInit } from '@angular/core';
import { Reserva } from '@reserva/shared/model/reserva';
import { ReservaService } from '@reserva/shared/service/reserva.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-reserva',
  templateUrl: './listar-reserva.component.html',
  styleUrls: ['./listar-reserva.component.sass']
})
export class ListarReservaComponent implements OnInit {
  listaDeReservas: Reserva[] = [];

  constructor(protected reservaService: ReservaService) { }

  ngOnInit(): void {
    this.getReservas();
  }

  getReservas() {
    this.reservaService.consultar().subscribe(resp => this.listaDeReservas = resp);
  }

  eliminarReserva(reserva: Reserva) {
    Swal.fire({
      title: 'Estas seguro que quieres eliminar la reserva?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservaService.eliminar(reserva).subscribe();
        this.getReservas();
        Swal.fire('Reserva eliminada!', '', 'success');
      } else if (result.isDenied) {
        Swal.fire('No se elimino la reserva', '', 'info');
      }
    });
  }

}

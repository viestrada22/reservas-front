export class Reserva {
  id?: number;
  identificacionUsuario: string;
  nombreUsuario: string;
  fechaReserva: string;
  fechaCreacion: string;
  valorAPagar: number;
  idTipoHabitacion: number;
  idTipoUsuario: number;

  constructor(id: number, identificacionUsuario: string, nombreUsuario: string, fechaReserva: string, fechaCreacion: string, valorAPagar: number, idTipoHabitacion: number, idTipoUsuario: number) {
    this.id = id;
    this.identificacionUsuario = identificacionUsuario;
    this.nombreUsuario = nombreUsuario;
    this.fechaReserva = fechaReserva;
    this.fechaCreacion = fechaCreacion;
    this.valorAPagar = valorAPagar;
    this.idTipoHabitacion = idTipoHabitacion;
    this.idTipoUsuario = idTipoUsuario;
  }
}

export interface Reserva {
  id?: number;
  identificacionUsuario: string;
  nombreUsuario: string;
  fechaReserva: string;
  fechaCreacion: string;
  valorAPagar: number;
  idTipoHabitacion: number;
  idTipoUsuario: number;
}

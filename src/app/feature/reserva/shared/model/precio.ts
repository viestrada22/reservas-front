export class Precio {
  id: number;
  precioSemana: number;
  precioFinDeSemana: number;
  idTipoHabitacion: number;
  constructor(id: number, precioSemana: number, precioFinDeSemana: number, idTipoHabitacion: number) {
    this.id = id;
    this.precioSemana = precioSemana;
    this.precioFinDeSemana = precioFinDeSemana;
    this.idTipoHabitacion = idTipoHabitacion;
  }
}

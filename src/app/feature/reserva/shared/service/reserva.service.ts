import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Precio } from '../model/precio';
import { Reserva } from '../model/reserva';
import { TipoHabitacion } from '../model/tipo-habitacion';
import { TipoUsuario } from '../model/tipo-usuario';

@Injectable()
export class ReservaService {

  constructor(protected http: HttpService) { }

  public consultar(): Observable<Reserva[]> {
    return this.http.doGet<Reserva[]>(`${environment.endpoint}/reservas`, this.http.optsName('consultar reservaa'));
  }

  public consultarPorId(id: number) {
    return this.http.doGet<Reserva[]>(`${environment.endpoint}/reservas/${id}`, this.http.optsName('Consultar reserva por id'));
  }

  public guardar(reserva: Reserva): Observable<boolean> {
    return this.http.doPost<Reserva, boolean>(`${environment.endpoint}/reservas`, reserva,
      this.http.optsName('crear reservas'));
  }

  public actualizar(reserva: Reserva) {
    return this.http.doPut<Reserva, boolean>(`${environment.endpoint}/reservas/${reserva.id}`, reserva,
      this.http.optsName('actualizar reservas'));
  }

  public eliminar(reserva: Reserva) {
    return this.http.doDelete<boolean>(`${environment.endpoint}/reservas/${reserva.id}`,
      this.http.optsName('eliminar reservas'));
  }

  public listarTipoUsuario(): Observable<TipoUsuario[]> {
    return this.http.doGet<TipoUsuario[]>(`${environment.endpoint}/tipousuario`, this.http.optsName('Consultar tipousuario'));
  }

  public listarTipoHabitacion(): Observable<TipoHabitacion[]> {
    return this.http.doGet<TipoHabitacion[]>(`${environment.endpoint}/tipohabitacion`, this.http.optsName('Consultar tipohabitacion'));
  }

  public consultarPrecioPorTipoHabitacion(idTipoHabitacion: number) {
    return this.http.doGet<Precio[]>(`${environment.endpoint}/precios/${idTipoHabitacion}`, this.http.optsName('Consultar precios'));
  }
}

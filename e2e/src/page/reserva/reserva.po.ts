import { by, element } from 'protractor';

export class ReservaPage {
  private linkCrearReserva = element(by.id('linkCrearReserva'));
  private linkListarReservas = element(by.id('linkListarReserva'));

  private inputIdUsuario = element(by.id('userId'));
  private inputNombreUsuario = element(by.id('userName'));
  private inputFechaReserva = element(by.id('reservationDate'));
  private inputIdTipoHabitacion = element(by.id('roomType'));
  private inputIdTipoUsuario = element(by.id('userType'));

  private btnGuardarDatos = element(by.id('guardarDatosButton'));
  private btnEditar = element(by.id('editar-reserva1'));
  private btnEliminar = element(by.id('eliminar-reserva2'));
  private btnConfirmar = element(by.className('swal2-confirm'));
  private successfulAlert = element(by.className('swal2-success'));

  async clickBotonCrearReservas() {
    await this.linkCrearReserva.click();
  }

  async clickBotonListarReservas() {
    await this.linkListarReservas.click();
  }

  async clickGuardarReserva() {
    await this.btnGuardarDatos.click();
  }

  clickConfirmar() {
    return this.btnConfirmar.click();
  }

  async clickEditar() {
    await this.btnEditar.click();
  }

  async clickEliminar() {
    await this.btnEliminar.click();
  }

  async ingresarIdUsuario(identificacionUsuario) {
    this.inputIdUsuario.clear();
    await this.inputIdUsuario.sendKeys(identificacionUsuario);
  }

  async ingresarNombreUsuario(nombrenUsuario) {
    this.inputNombreUsuario.clear();
    await this.inputNombreUsuario.sendKeys(nombrenUsuario);
  }

  async ingresarFechaReserva(fechaReserva) {
    await this.inputFechaReserva.sendKeys(fechaReserva);
  }

  async ingresarIdTipoHabitacion() {
    await this.inputIdTipoHabitacion.click();
    await element(by.cssContainingText('option', 'Sencilla')).click();
  }

  async ingresarIdTipoUsuario() {
    await this.inputIdTipoUsuario.click();
    await element(by.cssContainingText('option', 'Casual')).click();
  }

  alertaDeExito() {
    return this.successfulAlert;
  }

  async contarReservas() {
    return element.all(by.xpath('.//tbody/tr')).count();
  }
}

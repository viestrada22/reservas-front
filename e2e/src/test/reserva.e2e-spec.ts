import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { ReservaPage } from '../page/reserva/reserva.po';

describe('workspace-project reserva', () => {
  let page: AppPage;
  let navBar: NavbarPage;
  let reserva: ReservaPage;

  beforeEach(() => {
    page = new AppPage();
    navBar = new NavbarPage();
    reserva = new ReservaPage();
    page.navigateTo();
    navBar.clickBotonReservas();
  });

  it('Deberia crear reserva', async () => {
    const IDENTIFICACION_USUARIO = '10017852';
    const NOMBRE_USUARIO = 'Daniela Mejía';
    const FECHA_RESERVA = '03/04/2022';

    reserva.clickBotonCrearReservas();
    expect(page.getParagraphText('app-crear-reserva', 'h3')).toEqual('Crear Reserva');
    reserva.ingresarIdUsuario(IDENTIFICACION_USUARIO);
    reserva.ingresarNombreUsuario(NOMBRE_USUARIO);
    reserva.ingresarFechaReserva(FECHA_RESERVA);
    reserva.ingresarIdTipoHabitacion();
    await reserva.ingresarIdTipoUsuario();
    await reserva.clickCrearReserva();
    // Adicionamos las validaciones despues de la creación
    expect(reserva.alertaDeExito().isPresent()).toEqual(true);
  });

  it('Deberia actualizar la reserva', async () => {
    const IDENTIFICACION_USUARIO = '1017128964';
    const NOMBRE_USUARIO = 'Leider Noriega';
    const FECHA_RESERVA = '03/02/2022';

    reserva.clickBotonListarReservas();
    expect(page.getParagraphText('app-listar-reserva', 'h3')).toEqual('Lista de Reservas');
    reserva.clickEditar();
    expect(page.getParagraphText('app-editar-reserva', 'h3')).toEqual('Editar Reserva');
    reserva.ingresarIdUsuario(IDENTIFICACION_USUARIO);
    reserva.ingresarNombreUsuario(NOMBRE_USUARIO);
    reserva.ingresarFechaReserva(FECHA_RESERVA);
    reserva.ingresarIdTipoHabitacion();
    await reserva.ingresarIdTipoUsuario();
    await reserva.clickActualizar();
    // Adicionamos las validaciones despues de la creación
    expect(reserva.alertaDeExito().isPresent()).toEqual(true);
  });

  it('Deberia eliminar una reserva', async () => {
    reserva.clickBotonListarReservas();
    expect(page.getParagraphText('app-listar-reserva', 'h3')).toEqual('Lista de Reservas');
    const reservas = await reserva.contarReservas();
    reserva.clickEliminar();
    reserva.clickConfirmar();
    expect(await reserva.alertaDeExito().isPresent()).toEqual(true);
    reserva.clickConfirmar();
    navBar.clickBotonReservas();
    reserva.clickBotonListarReservas();
    expect(reservas).toBeGreaterThan(reserva.contarReservas());
  });

  it('Deberia listar reservas', () => {
    reserva.clickBotonListarReservas();
    expect(reserva.contarReservas()).toBe(reserva.contarReservas());
  });
});

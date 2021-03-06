export class ReservaMockService {
  crear() {
    return (
      {
        id: 1,
        identificacionUsuario: '1214721788',
        nombreUsuario: 'Victor Estrada C',
        fechaReserva: '2022-02-27',
        fechaCreacion: '2022-02-24',
        valorAPagar: 850000,
        idTipoHabitacion: 3,
        idTipoUsuario: 3
      }
    );
  }

  actualizar() {
    return (
      {
        id: 1,
        identificacionUsuario: '1214721788',
        nombreUsuario: 'Victor Estrada C',
        fechaReserva: '2022-02-27',
        fechaCreacion: '2022-02-24',
        valorAPagar: 680000,
        idTipoHabitacion: 3,
        idTipoUsuario: 3
      }
    );
  }

  eliminar() {
    return (
      {
        id: 1,
        identificacionUsuario: '1017152360',
        nombreUsuario: 'Daniela Jimenez',
        fechaReserva: '2022-03-04',
        fechaCreacion: '2022-02-24',
        valorAPagar: 850000,
        idTipoHabitacion: 3,
        idTipoUsuario: 3
      }
    );
  }

  consultar() {
    return ([
      {
        id: 1,
        identificacionUsuario: '1214721788',
        nombreUsuario: 'Victor Estrada C',
        fechaReserva: '2022-02-27',
        fechaCreacion: '2022-02-24',
        valorAPagar: 680000,
        idTipoHabitacion: 3,
        idTipoUsuario: 3
      },
      {
        id: 2,
        identificacionUsuario: '35834321',
        nombreUsuario: 'Diana Mejia',
        fechaReserva: '2022-02-26',
        fechaCreacion: '2022-02-24',
        valorAPagar: 560000,
        idTipoHabitacion: 2,
        idTipoUsuario: 2
      }
    ]);
  }

  consultarPorId() {
    return ([
      {
        id: 1,
        identificacionUsuario: '1214721788',
        nombreUsuario: 'Victor Estrada C',
        fechaReserva: '2022-02-27',
        fechaCreacion: '2022-02-24',
        valorAPagar: 680000,
        idTipoHabitacion: 3,
        idTipoUsuario: 3
      }
    ]);
  }

  listarTipoUsuario() {
    return ([
      {
        id: 1,
        tipoUsuario: 'casual'
      },
      {
        id: 2,
        tipoUsuario: 'frecuente'
      },
      {
        id: 3,
        tipoUsuario: 'miembro'
      }
    ]);
  }

  listarTipoHabitacion() {
    return ([
      {
        id: 1,
        tipoHabitacion: 'sencilla'
      },
      {
        id: 2,
        tipoHabitacion: 'especial'
      },
      {
        id: 3,
        tipoHabitacion: 'suite'
      }
    ]);
  }
}

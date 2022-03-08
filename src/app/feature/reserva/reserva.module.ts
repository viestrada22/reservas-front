import { NgModule } from '@angular/core';
import { CrearReservaComponent } from './components/crear-reserva/crear-reserva.component';
import { ListarReservaComponent } from './components/listar-reserva/listar-reserva.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { ReservaRoutingModule } from './reserva-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ReservaService } from './shared/service/reserva.service';
import { EditarReservaComponent } from './components/editar-reserva/editar-reserva.component';
import { ReservaFormComponent } from './components/reserva-form/reserva-form.component';



@NgModule({
  declarations: [
    CrearReservaComponent,
    ListarReservaComponent,
    ReservaComponent,
    EditarReservaComponent,
    ReservaFormComponent,
  ],
  imports: [
    ReservaRoutingModule,
    SharedModule
  ],
  providers: [ReservaService]
})
export class ReservaModule { }

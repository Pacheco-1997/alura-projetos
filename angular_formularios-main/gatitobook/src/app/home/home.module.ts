import { MensagemModule } from './../componentes/mensagem/mensagem.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NovoUsuarioComponent } from './novo-usuario/novo-usuario.component';
import { NovoUsuarioService } from './novo-usuario/novo-usuario.service';

@NgModule({
  declarations: [
    HomeComponent, 
    LoginComponent, 
    NovoUsuarioComponent
  ],
  imports: [
    CommonModule, 
    HomeRoutingModule, 
    FormsModule, 
    MensagemModule, 
    ReactiveFormsModule,
  ],
  exports: [HomeComponent],
  providers: [NovoUsuarioService]
})
export class HomeModule {}

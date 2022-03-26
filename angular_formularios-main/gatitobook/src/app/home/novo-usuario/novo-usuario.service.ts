import { NovoUsuario } from './novo-usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class NovoUsuarioService {

  constructor(private httpC: HttpClient) { }

  cadastrarNovoUsuario(novoUser: NovoUsuario): Observable<any>{
    let url = 'http://localhost:3000/user/signup';
    return this.httpC.post(url, novoUser);
  }

  verificaUsuarioExistente(nomeUsuario: string): Observable<any>{
    let url = `http://localhost:3000/user/exists/${nomeUsuario}`;
    return this.httpC.get(url);
  }
}

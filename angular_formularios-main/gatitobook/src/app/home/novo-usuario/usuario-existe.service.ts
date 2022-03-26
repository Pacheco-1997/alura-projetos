import { AbstractControl, ValidationErrors  } from '@angular/forms';
import { NovoUsuarioService } from './novo-usuario.service';
import { Injectable, NgModule } from '@angular/core';
import { first, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class UsuarioExisteService {
  
  constructor(private novoUsu: NovoUsuarioService) { }


  // teste(){
   
  //   console.log(this.novoUsu)
  // }
  
  // usuarioJaExiste(control: AbstractControl): Observable<ValidationErrors | null>{
  //   //debugger
  //   //console.log(this.novoUsuarioService)
  //   if (!control.value) {
  //     return of(null);
  //   }else
  //   {
      
  //     return control.valueChanges.pipe(
  //       switchMap((nomeUsuario) => this.novoUsu.verificaUsuarioExistente(nomeUsuario)),
  //       map((usuarioExiste) => 
        
  //       { return (usuarioExiste ? {usuarioExistente: true} : null) }
        
      
  //      ) 
  //     )
   
  //     //first()
  //    // control.valueChanges.subscribe(r => console.log(r))

  //   //  return of({usuarioExistente: true})
  //   }
  //   }

  


}

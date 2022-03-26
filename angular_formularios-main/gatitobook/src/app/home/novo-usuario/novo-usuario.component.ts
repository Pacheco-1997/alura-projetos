import { UsuarioExisteService } from './usuario-existe.service';
import { NovoUsuarioService } from './novo-usuario.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NovoUsuario } from './novo-usuario';
import { minusculoValidator } from './minusculo.validator';
import { map, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {
  
  novoUsuarioForm!: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private novoUsuarioService: NovoUsuarioService,
    private usuarioExistenteService: UsuarioExisteService
    ) { }
  
  ngOnInit(): void {
  // this.usuarioExistenteService.teste()
   this.buildForm();

  }
  // 

  buildForm(){
    this.novoUsuarioForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      fullName:['',[Validators.required,Validators.minLength(4)]],
      userName:['', [minusculoValidator] , [this.usuarioJaExiste.bind(this)]],
      password:[''],
    });
  }

  usuarioJaExiste(control: AbstractControl): Observable<ValidationErrors | null>{
    //debugger
    
    if (!control.value) {

      return of(null);
    }else
    {
  
      return control.valueChanges.pipe(
        switchMap((nomeUsuario) => this.novoUsuarioService.verificaUsuarioExistente(nomeUsuario)),
        map((usuarioExiste) => 
        
        { 
          console.log(usuarioExiste)
          return  {usuarioExistente: true} 
        }
        
      
       ) 
      )
   
      //first()
     // control.valueChanges.subscribe(r => console.log(r))

    //  return of({usuarioExistente: true})
    }
    }

  cadastrar(){
    const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario;
    console.log(novoUsuario);
  }
}

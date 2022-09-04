import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  private mensaje:string
  
  constructor(private router : Router, private dataService: DataService) {     
    this.mensaje = "";
    let listaUsuarios = [{id: 1, usuario: 'Carolina', contrasenia:'asd123'}, {id: 2, usuario: 'Maria',contrasenia: 'qwerty'}];   

    localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));     

    this.dataService.getUsers().subscribe(res => {
      console.log(res);
    })
  }



  ngOnInit() {

  }

  Validar(usuario:string,contrasenia:string){

    let listadoUsuarios = localStorage.getItem('usuarios');
    this.mensaje = "Usuario inválido";    
      
    listadoUsuarios ??= "[]";
      
    let usuarios = <{id: number, usuario: string, contrasenia: string}[]>JSON.parse(listadoUsuarios);
      
      usuarios.forEach(user => {      
        if(user.usuario === usuario && user.contrasenia === contrasenia){        
          this.mensaje = "Usuario válido";
          this.router.navigate(['/home']);                                    
        }
      });
      
     
      
  }

}

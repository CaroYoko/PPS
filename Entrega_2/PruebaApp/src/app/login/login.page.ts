import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DataService, User } from '../service/data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit { 

  public user: User = {name: "", mail: "", password: ""};
  private users: User[] = [];
  
  constructor(private router : Router, private dataService: DataService,private toastController: ToastController) {     
    
    this.dataService.getUsers().subscribe(res => {
      console.log(res);
      this.users = res;
    })
  }

  ngOnInit() {

  }

  Validar(mail:string,contrasenia:string){
    
    let bandera = false;
    this.users.forEach(user => {      
      if(user.mail === mail && user.password === contrasenia){         
        this.router.navigate(['/home']);  
        bandera = true;                                  
      }
    });
    if(!bandera){
      this.PresentToast("Usuario inválido","alert-circle-outline");
    }     
  }

  async PresentToast(message: string, icon:string ) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
      icon: icon
    });

    await toast.present();
  }

  UsuarioRegistrado(){
    this.user.mail = "caro@gmail.com";
    this.user.password = "asd123";
  }
  UsuarioInvalido(){
    this.user.mail = "fallo@gmail.com";
    this.user.password = "asd123";
  }
  /*
  constructor(private router : Router) {     
    this.mensaje = "";
    let listaUsuarios = [{id: 1, usuario: 'Carolina', contrasenia:'asd123'}, {id: 2, usuario: 'Maria',contrasenia: 'qwerty'}];  
    localStorage.setItem('usuarios', JSON.stringify(listaUsuarios));     

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
  */

}

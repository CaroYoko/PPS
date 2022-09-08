import { Component, OnInit } from '@angular/core';
import { DataService, User } from '../service/data.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})

export class SignupPage implements OnInit {

  private users: User[] = [];
  private mensaje:string;

  constructor(private dataService: DataService, private toastController: ToastController) { 
    this.mensaje = "";
    this.dataService.getUsers().subscribe(res => {
      console.log(res);
      this.users = res;
    })
  }

  ngOnInit() {
  }

  CheckEmailFormat(mail : string){
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;    
    return emailRegex.test(mail);     
  }

  ExistUser(userInput: User){
    let retorno = false;
    this.users.forEach(user => {      
      if(user.mail === userInput.mail){        
        retorno = true;                              
      }
    });
    return retorno;
  }
  
  async addUser(userInput: User){

    if(this.CheckEmailFormat(userInput.mail)){
      
      if(!this.ExistUser(userInput)){
        await this.dataService.addUser(userInput);
        this.PresentToast("Usuario registrado.", "checkmark-circle-outline");
      }
      else{
        this.PresentToast("El correo ya esta en uso.", "alert-circle-outline");
      }
    }
    else{
      this.PresentToast("Formato incorrecto de correo electrónico.", "alert-circle-outline");
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
}

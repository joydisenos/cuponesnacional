import { Component, OnInit } from '@angular/core';
import { VariablesService } from '../variables.service';
import { LoginService } from '../login.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	public email:string;
	public clave:string;
	public respuesta:any;

  constructor(public httpClient: HttpClient,
  			  public variables: VariablesService,
  			  public loginService: LoginService,
          private router: Router,
          private storage: Storage,
          public alertController: AlertController) { }

  ngOnInit() {
  }

  async presentAlert(titulo , subtitulo , mensaje) {
    const alert = await this.alertController.create({
      header: titulo,
      subHeader: subtitulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  consultarUsuario(){
    
    this.loginService.login(this.email , this.clave);
    
    if(this.loginService.respuesta == null){
      this.presentAlert('Ups...' , 'Hubo un error al iniciar sesión' , 'por favor verifique su usuario y contraseña');
    }else{
      this.router.navigate(['/home']);
    }
    
    
    
    /*return this.httpClient.get(this.variables.ruta + "api/userlog?email="+ this.email +"&clave=" + this.clave)
      .subscribe(data => {
        //se coloca el resultado del usuario a la variable y se guarda en el almacenamiento local 
        this.respuesta = data;
        //console.log(data.id);
        this.storage.set('userId' , this.respuesta.id);
        this.variables.userId = this.respuesta.id;
        this.variables.user = this.respuesta;
        this.router.navigate(['/home']);
       
       }, error => {
        //si hay error se coloca un objeto explicativo
        this.respuesta = {
        	respuesta : 'hubo un error en la consulta'
        };
      });*/

  }

}

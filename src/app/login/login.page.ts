import { Component, OnInit } from '@angular/core';
import { VariablesService } from '../variables.service';
import { HttpClient } from '@angular/common/http';

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
  			  public variables: VariablesService) { }

  ngOnInit() {
  }

  consultarUsuario(){
  	return this.httpClient.get(this.variables.ruta + "api/userlog?email="+ this.email +"&clave=" + this.clave)
      .subscribe(data => {
        //se coloca el resultado del usuario a la variable 
        this.respuesta = data;
        console.log(data);
       
       }, error => {
        //si hay error se coloca un objeto explicativo
        this.respuesta = {
        	respuesta : 'hubo un error en la consulta'
        };
      });
  }

}

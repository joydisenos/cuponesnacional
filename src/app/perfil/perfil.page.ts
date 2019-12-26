import { Component, OnInit } from '@angular/core';
import { VariablesService } from '../variables.service';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

	public user:any = {};

  constructor(public variables: VariablesService,
  			  public httpClient: HttpClient,
  			  private storage: Storage) { 
	  this.verificarDatos();
  }

  ngOnInit() {
  }

  verificarDatos(){
  	return this.httpClient.get(this.variables.ruta + "api/userconsulta?id=" + this.variables.userId )
      .subscribe(data => {
        //se coloca el resultado del usuario a la variable 
        this.user = data;
        //console.log(data);
       
       }, error => {
        //si hay error se coloca un objeto explicativo
        console.log('error');
      });
  }

}

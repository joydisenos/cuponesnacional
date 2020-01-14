import { Component, OnInit } from '@angular/core';
import { VariablesService } from '../variables.service';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

@Component({
  selector: 'app-cupones',
  templateUrl: './cupones.page.html',
  styleUrls: ['./cupones.page.scss'],
})
export class CuponesPage implements OnInit {

	cupones:any;

  constructor(public httpClient: HttpClient,
  			  public variables: VariablesService,
          private router: Router) { }

  ngOnInit() {
  	this.consultarCupones();
  }

  consultarCupones(){
  	return this.httpClient.get(this.variables.ruta + "api/reservas/"+ this.variables.userId)
      .subscribe(data => {
        //se coloca el resultado del usuario a la variable y se guarda en el almacenamiento local 
        this.cupones = data;
       }, error => {
        //si hay error se coloca un objeto explicativo
        this.cupones = {
        	respuesta : 'hubo un error en la consulta'
        };
      });
  }

}

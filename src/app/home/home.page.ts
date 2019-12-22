import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { VariablesService } from '../variables.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

	ofertas : any;
  limite = 50;
  categoria = null;

  constructor(private route: ActivatedRoute , 
              public httpClient: HttpClient,
              public variables: VariablesService) {
  	
  }

  ngOnInit() {
    //se obtiene el parametro de la ruta si existe
    this.categoria = this.route.snapshot.paramMap.get('categoria');
    console.log(this.categoria);
    this.cargarOfertas();
  }

  cambiarCategoria(categoria)
  {
    this.categoria = categoria;
    this.cargarOfertas();
  }

  cargarOfertas(){
    //obtener ofertas de la api
    return this.httpClient.get(this.variables.ruta + "api/ofertas" , {
      //variables opcionales
      limit: this.limite,
      categoria: this.categoria
    })
      .subscribe(data => {
        //se asignan las ofertas a la variable
        this.ofertas = data;
        //console.log(data);
       }, error => {
        //si hay error se crea un array vacio
        this.ofertas = [];
        //console.log('error');
      });
  }

}

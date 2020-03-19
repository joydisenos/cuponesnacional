import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { VariablesService } from '../variables.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

	ofertas: any;
  limite = 50;
  categoria = null;

  constructor(private route: ActivatedRoute , 
              public httpClient: HttpClient,
              public variables: VariablesService,
              public loadingController: LoadingController) {
  	
  }

  ngOnInit() {
    //se obtiene el parametro de la ruta si existe
    this.categoria = this.route.snapshot.paramMap.get('id');
    console.log(this.categoria);
    this.cargarOfertas();
  }

  cambiarCategoria(categoria)
  {
    this.categoria = categoria;
    this.cargarOfertas();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Por favor espere...'
    });
    await loading.present();
  }

  cargarOfertas(){
    //obtener ofertas de la api
    
    //this.presentLoading();
    
    return this.httpClient.get(this.variables.ruta + "api/ofertas?limit=" + this.limite + "&categoria=" + this.categoria)
      .subscribe(data => {
        //se asignan las ofertas a la variable
        this.ofertas = data;
        //this.loadingController.dismiss();
        //console.log(data);
       }, error => {
        //si hay error se crea un array vacio
        this.ofertas = [];
        //this.loadingController.dismiss();
        //console.log('error');
      });
  }

}

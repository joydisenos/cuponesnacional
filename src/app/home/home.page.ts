import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

	ofertas : any[];

  constructor(public httpClient: HttpClient) {
  	this.cargarOfertas();
  }

  cargarOfertas(){
    return this.httpClient.get("http://cuponesar.com/public/api/ofertas?limit=50")
      .subscribe(data => {
        console.log(data);
        this.ofertas = data;
       }, error => {
        console.log(error);
      });
  }

}

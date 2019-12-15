import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

	ofertas : any;
  limite = 50;
  categoria = null;

  constructor(private route: ActivatedRoute , public httpClient: HttpClient) {
  	
  }

  ngOnInit() {
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
    //return this.httpClient.get("https://cuponesar.com/public/api/ofertas?limit=50")
    console.log("http://localhost/cuponesApi/public/api/ofertas?limit=" + this.limite + "&categoria=" + this.categoria)
    return this.httpClient.get("http://localhost/cuponesApi/public/api/ofertas?limit=" + this.limite + "&categoria=" + this.categoria)
      .subscribe(data => {
        this.ofertas = data;
        console.log(data);
       }, error => {
        this.ofertas = [];
        console.log('error');
      });
  }

}

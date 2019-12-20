import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.page.html',
  styleUrls: ['./oferta.page.scss'],
})
export class OfertaPage implements OnInit {

  slug:any = '';
  oferta:any = {};
  cantidad = 1;

  constructor(private route: ActivatedRoute , 
              public httpClient: HttpClient,
              private storage: Storage,
              private router: Router) { }

  ngOnInit() {
  	this.slug = this.route.snapshot.paramMap.get('slug');
  	this.getOferta();
  }

  getOferta() {
  //return this.httpClient.get("https://cuponesar.com/public/api/oferta/" + this.slug)
    console.log("http://localhost/cuponesApi/public/api/oferta/" + this.slug)
    return this.httpClient.get("http://localhost/cuponesApi/public/api/oferta/" + this.slug)
      .subscribe(data => {
        this.oferta = data;
        console.log(data);
       }, error => {
        this.oferta = [];
        console.log('error');
      });
  }

  agregarCarrito(){
    this.storage.get('carrito').then((carrito) => {
      console.log(carrito);
      if(carrito == null){
        this.storage.set('carrito' , [{
                id: this.slug,
                oferta: this.oferta.titulo,
                reserva: this.oferta.rprecio,
                cantidad: this.cantidad
              }]);
      }else{
        carrito.push({
        id: this.slug,
        oferta: this.oferta.titulo,
        reserva: this.oferta.rprecio,
        cantidad: this.cantidad
      });
        this.storage.set('carrito' , carrito);
      }
      this.router.navigate(['/carrito']);
    });
  }

}

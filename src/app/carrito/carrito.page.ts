import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

	carrito:any;

  constructor(private storage: Storage) { }

  ngOnInit() {
  	this.cargarCarrito();
  }

  cargarCarrito(){
  	this.storage.get('carrito').then((carrito) => {
  			this.carrito = carrito;
         });
  }

  eliminarCarrito(){
  	this.storage.remove('carrito');
  	this.cargarCarrito();
  }

}

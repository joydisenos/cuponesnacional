import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

	carrito:any;
  total = 0;

  constructor(private storage: Storage) { }

  ngOnInit() {
  	this.cargarCarrito();
  }

  cargarCarrito(){
  	this.storage.get('carrito').then((carrito) => {
        // se setea la variable del carrito
  			this.carrito = carrito;
        console.log(this.carrito);
        //colocar el total en 0 para calcular el precio general
        this.total = 0;
        //se recorre el array del carrito para sumar los totales
        if(this.carrito != null){
          for (let item of this.carrito) {
            //se multiplica la cantidad por la reserva para los subtotales
            this.total += item.cantidad * item.reserva;
          }
        }
    }); 
  }

  completarCompra(){
    
  }

  eliminarCarrito(){
  	this.storage.remove('carrito');
  	this.cargarCarrito();
  }

}

import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { VariablesService } from '../variables.service';
import { Router } from '@angular/router';
import { PagoFormComponent } from '../pago-form/pago-form.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

	carrito:any;
  total = 0;

  constructor(private storage: Storage,
              public httpClient: HttpClient,
              private router: Router,
              public variables: VariablesService,
              public modalController: ModalController) { }

  ngOnInit() {
  	this.cargarCarrito();
  }

  async presentModalPago() {
    const modal = await this.modalController.create({
      component: PagoFormComponent
    });
    return await modal.present();
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

    this.presentModalPago();

    /*
    let options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    let reservas = JSON.stringify(this.carrito);

    this.httpClient.get(this.variables.ruta + 'api/reservar?items=' + reservas + '&user=' + this.variables.userId)
     .subscribe(data => {
       console.log(data);
       this.eliminarCarrito();
       this.router.navigate(['/cupones']);
      });
      */
  }

  eliminarCarrito(){
  	this.storage.remove('carrito');
  	this.cargarCarrito();
  }

}

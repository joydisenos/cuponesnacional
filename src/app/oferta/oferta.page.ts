import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { VariablesService } from '../variables.service';


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
              private router: Router,
              public variables: VariablesService) { }

  ngOnInit() {
  	this.slug = this.route.snapshot.paramMap.get('slug');
  	this.getOferta();
  }

  getOferta() {
    //console.log(this.variables.ruta + "api/oferta/" + this.slug)
    //se consulta la api para mostrar la oferta
    return this.httpClient.get(this.variables.ruta + "api/oferta/" + this.slug)
      .subscribe(data => {
        //se coloca el resultado a la variable 
        this.oferta = data;
        //console.log(data);
       }, error => {
        //si hay error se coloca un array vacio
        this.oferta = [];
        //console.log('error');
      });
  }

  agregarCarrito(){
    //se obtiene del almacenamiento la variable carrito esperando un objeto
    this.storage.get('carrito').then((carrito) => {
      //console.log(carrito);
      if(carrito == null){
        //si la variable no existe se crea
        this.storage.set('carrito' , [{
                id: this.slug,
                oferta: this.oferta.titulo,
                reserva: this.oferta.rprecio,
                cantidad: this.cantidad
              }]);
      }else{
        //si existe se agrega un nuevo item
        carrito.push({
        id: this.slug,
        oferta: this.oferta.titulo,
        reserva: this.oferta.rprecio,
        cantidad: this.cantidad
      });
        this.storage.set('carrito' , carrito);
      }
      //se redirige la vista del carrito
      this.router.navigate(['/carrito']);
    });
  }

  aumentarCantidad(){
    this.cantidad ++;
  }

  disminuirCantidad(){
    this.cantidad --;
  }

}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pago-form',
  templateUrl: './pago-form.component.html',
  styleUrls: ['./pago-form.component.scss'],
})
export class PagoFormComponent implements OnInit {

  pagoTipo:string = null;

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  cambiarTipo(tipo){
    this.pagoTipo = tipo;
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}

import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

import { VariablesService } from './variables.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages:any = [];
  public segmento:string = 'categorias';
  public user:any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public httpClient: HttpClient,
    private storage: Storage,
    public variables: VariablesService
  ) {
    this.initializeApp();
    this.cargarCategorias();
    this.verificarUsuario();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  verificarUsuario(){
    //this.storage.remove('user');
    //this.storage.set('user' , 'string');
    this.storage.get('user').then((val) => {
      if(val == null){
        console.log('usuario no registrado');
      }else{
        console.log('Id de usuario ', val);
      }
    });
  }

  cambiarSegmento(nombre){
    this.segmento = nombre.detail.value;
    //console.log(nombre.detail.value);
  }

  cargarCategorias(){
    return this.httpClient.get(this.variables.ruta + "api/categorias")
      .subscribe(data => {
        this.appPages = data;
       }, error => {
        this.appPages = [];
      });
  }
}

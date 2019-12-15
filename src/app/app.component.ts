import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages:any = [];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public httpClient: HttpClient
  ) {
    this.initializeApp();
    this.cargarCategorias();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  cargarCategorias(){
    //return this.httpClient.get("https://cuponesar.com/public/api/categorias")
    return this.httpClient.get("http://localhost/cuponesApi/public/api/categorias")
      .subscribe(data => {
        this.appPages = data;
       }, error => {
        this.appPages = [];
      });
  }
}

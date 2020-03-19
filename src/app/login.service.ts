import { Injectable } from '@angular/core';
import { VariablesService } from './variables.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  respuesta:any = null;

  constructor(public httpClient: HttpClient,
    public variables: VariablesService,
    private storage: Storage) { }

  login(email , clave)
  {
    this.httpClient.get(this.variables.ruta + "api/userlog?email="+ email +"&clave=" + clave)
      .subscribe(data => {
        //se coloca el resultado del usuario a la variable y se guarda en el almacenamiento local 
        this.respuesta = data;
        
        this.storage.set('userId' , this.respuesta.id);
        this.variables.userId = this.respuesta.id;
        this.variables.user = this.respuesta;
        //console.log(respuesta);
       
       }, error => {
        //si hay error se coloca un objeto explicativo
        this.respuesta = null;
      });

      return this.respuesta;
  }
}

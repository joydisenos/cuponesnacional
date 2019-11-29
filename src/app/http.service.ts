import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

	path : string = 'https://randomuser.me/api/?results=25';

  constructor(public http: HttpClient) { }

  cargarOfertas(){
  	return this.http
    .get(this.path)
  }
}

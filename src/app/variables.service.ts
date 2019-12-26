import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {
	public ruta:string = "http://localhost/cuponesApi/public/";
	//public ruta:string = "https://cuponesar.com/public/";
	public userId:any;
  constructor() { }
}

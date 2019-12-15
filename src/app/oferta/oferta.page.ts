import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.page.html',
  styleUrls: ['./oferta.page.scss'],
})
export class OfertaPage implements OnInit {

  slug:any = '';
  oferta:any = {};

  constructor(private route: ActivatedRoute , public httpClient: HttpClient) { }

  ngOnInit() {
  	this.slug = this.route.snapshot.paramMap.get('slug');
  	this.getOferta();
  }

  getOferta() {
  //return this.httpClient.get("https://cuponesar.com/public/api/oferta/" + this.slug)
    console.log("http://localhost/cuponesApi/public/api/oferta/" + this.slug)
    return this.httpClient.get("http://localhost/cuponesApi/public/api/oferta/" + this.slug)
      .subscribe(data => {
        this.oferta = data;
        console.log(data);
       }, error => {
        this.oferta = [];
        console.log('error');
      });
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GeolocatService } from '../geolocat.service'
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  constructor(private geolocatService: GeolocatService) { }
  lat: Observable<number>;
  lng: Observable<number>;
  ngOnInit(): void {
    this.geolocatService.iniciarSeguimiento();
    this.lat = this.geolocatService.latitude;
    this.lng = this.geolocatService.longitude;
    // this.geolocatService.latitude.subscribe(latitude => {
    //   console.log("cambio latitud: " + latitude);
    //   this.lat = latitude;
    // });

    // this.geolocatService.longitude.subscribe(longitude => {
    //   console.log("cambio longitud: " + longitude);
    //   this.lng = longitude;
    // });
  }
  ngOnDestroy() {
    this.geolocatService.detenerSeguimiento();
  }

}

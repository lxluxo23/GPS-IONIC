import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Platform } from '@ionic/angular';
import axios from 'axios';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeolocatService {
  idSeguimiento: any
  permisos: any
  verPermisos: any
  private latitudeSubject = new BehaviorSubject<number>(null);
  private longitudeSubject = new BehaviorSubject<number>(null);
  constructor(private platform: Platform) {

  }

  async iniciarSeguimiento() {
    if (this.platform.is('desktop')) {
      console.log('Estamos en una PC');

    } else if (this.platform.is('mobile')) {
      console.log('Estamos en un dispositivo móvil');
      this.verPermisos = await Geolocation.checkPermissions();
      console.log('Geolocation.checkPermissions()', this.verPermisos);
      this.permisos = await Geolocation.requestPermissions();
    }


    console.log('Geolocation.requestPermissions()', this.permisos);
    console.log('Iniciando[accuracy=true]');
    if (this.platform.is('desktop') || this.verPermisos.location == "granted") {
      const opciones = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      this.idSeguimiento = Geolocation.watchPosition(opciones, async (position, err) => {
        if (err) {
          console.log('Algun error: ', err);
          return;
        }
        let data = {
          latitud: position.coords.latitude,
          longitud: position.coords.longitude
        }
        this.latitudeSubject.next(position.coords.latitude);
        this.longitudeSubject.next(position.coords.longitude);
        axios.post(environment.API + '/api/cordenadas', data)
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.error(error);
          });
        console.log('latitud: ', position.coords.latitude);
        console.log('longitud: ', position.coords.longitude);
      });


    }
    else {
      console.log('Error de permisos');
    }

  }
  detenerSeguimiento() {
    try {
      Geolocation.clearWatch({
        id: this.idSeguimiento
      })
    }
    catch (err) {
      console.error(err);
    }

  }
  // ------------------------------getters  aaaa-------------------------------
  get latitude(): Observable<number> {
    return this.latitudeSubject.asObservable();
  }

  get longitude(): Observable<number> {
    return this.longitudeSubject.asObservable();
  }
}

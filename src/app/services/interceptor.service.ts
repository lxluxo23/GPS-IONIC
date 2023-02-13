import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor() {
    console.log('log desde el servicio')
    // axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
    // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    // axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
    // axios.defaults.baseURL = 'http://';
  }

}

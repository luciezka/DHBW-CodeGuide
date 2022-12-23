import { Injectable } from '@angular/core';
import {SwUpdate} from "@angular/service-worker";

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  data: any = "";
  constructor(private updates: SwUpdate) { }


  // Store data in Local Storage as JSON
  store(key: string, value: any): void {
    if(!this.data.includes(JSON.stringify(value))) {
      //first Value doesnt need a comma
      if(this.data == "") {
        this.data = this.data + JSON.stringify(value);
      } else {
        this.data = this.data + "," + JSON.stringify(value);
      }
      if (this.updates.isEnabled) {
        localStorage.setItem(key, JSON.stringify(this.data));
      }
    }
  }

  retrieve(key: string): any {
    if (this.updates.isEnabled) {
      // @ts-ignore
      return JSON.parse(localStorage.getItem(key));
    }
  }

  clear(key: string): void {
    localStorage.removeItem(key);
  }
}

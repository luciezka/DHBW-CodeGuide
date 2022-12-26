import { Injectable } from '@angular/core';
import {SwPush, SwUpdate} from "@angular/service-worker";

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor(private swPush : SwPush,private swUpdate : SwUpdate) {
    if (('Notification' in window) && Notification.permission !== 'granted') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          // If the user grants permission, send the notification
          const notification = new Notification('Hey thanks for granting permission!');
        }
      });
    } }
  }

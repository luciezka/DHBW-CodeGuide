import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {TestCardModel} from "../models/testCard.model";
import {map, Observable} from "rxjs";
import {CacheService} from "./cache.service";
import {SwUpdate} from "@angular/service-worker";
import {FlashCardModel} from "../models/flash-card.model";
import { User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserTaskService {

  userCollection!: AngularFirestoreCollection<any>
  users!: Observable<any[]>

  constructor(
    private fireStore: AngularFirestore,
              private cache: CacheService,
              private updates: SwUpdate
  ) {
    this.initUser()
  }

  private initUser() {

    this.userCollection = this.fireStore.collection('user' );
    this.users = this.userCollection.snapshotChanges().pipe(map((changes) => {
      // @ts-ignore
      return changes.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        if (this.updates.isEnabled && navigator.onLine) {
          this.cache.store('/api/data/user', data);
        }
        return data;
      })
    }));
  }

  getUserCache() {
    return this.cache.retrieve('/api/data/user');
  }

  getUser() {
    return this.users;
  }

  addUser() {
    let newPoints ={
      Variblen: 10,
    }

    let newuser :User = {
      id: "user",
      name: "user",
      email: "user.email",
      isAdmin: true,
    }

     console.log(newuser)
    // return this.userCollection.add(user);

  }

}

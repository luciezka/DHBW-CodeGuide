import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {TestCardModel} from "../models/testCard.model";
import {map, Observable} from "rxjs";
import {CacheService} from "./cache.service";
import {SwUpdate} from "@angular/service-worker";
import {FlashCardModel} from "../models/flash-card.model";
import { UserModel} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserTaskService {

  userCollection!: AngularFirestoreCollection<UserModel>
  user!: Observable<UserModel[]>


  constructor(
    private fireStore: AngularFirestore,
              private cache: CacheService,
              private updates: SwUpdate
  ) {
  }

  getUserByName(name:string) {
    this.userCollection = this.fireStore.collection('user', ref => ref.where('name', '==', name).limit(1));
    this.user = this.userCollection.snapshotChanges().pipe(map((changes) => {
      // @ts-ignore
      return changes.map(a => {
        const data = a.payload.doc.data() as UserModel;
        data.id = a.payload.doc.id;
        if (this.updates.isEnabled && navigator.onLine) {
          this.cache.store('/api/data/user', data);
        }
        return data;
      })
    }));
    return this.user;
  }

  getUser() {
    if(this.user === undefined) {
      this.getUserByName("Gast");
    }
    return this.user;
  }

  getUserCache() {
    return this.cache.retrieve('/api/data/user');
  }

  updateUser(user: UserModel) {
    this.userCollection.doc(user.id).update(user);
  }
  clearData() {
    this.cache.clearData();
  }


}

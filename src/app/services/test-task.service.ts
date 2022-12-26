import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {map, Observable} from "rxjs";
import {TestCardModel} from "../models/testCard.model";
import {CacheService} from "./cache.service";
import {SwUpdate} from "@angular/service-worker";

@Injectable({
  providedIn: 'root'
})
export class TestTaskService {

  testcardCollection!: AngularFirestoreCollection<TestCardModel>
  tests!: Observable<TestCardModel[]>

  constructor(
    private fireStore: AngularFirestore,
    private cache: CacheService,
    private updates: SwUpdate
  ) {
    this.initTask()
  }

  initTask( ) {
    this.clearData();
    // get request to google , get the collection of test ordered by topic
    this.testcardCollection = this.fireStore.collection('tests', ref => ref.orderBy('topic', 'desc'));
    // subscribeflashcards to an Observable and detect changes in the Dataset
    this.tests = this.testcardCollection.snapshotChanges().pipe(map((changes) => {
      return changes.map(a => {
        const data = a.payload.doc.data() as TestCardModel;
        data.id = a.payload.doc.id;
        //Write to cache
        if (this.updates.isEnabled && navigator.onLine) {
          this.cache.store('/api/data/test', data);
        }
        return data;
      })
    }));
  }

  // gets all the flashcards by topic querry
  getTestCardByTopic(topic: string) {
      return this.fireStore.collection('tests', ref => ref.where('topic', '==', topic)).snapshotChanges().pipe(map((changes) => {
        // @ts-ignore
        return changes.map(a => {
          const data = a.payload.doc.data() as TestCardModel;
          data.id = a.payload.doc.id;
          return data;
        })
      }));
    }

    getTestCard() {
      // get request to google , get the collection of test ordered by topic
      return this.tests;
    }

    returnTestCard() {
     return this.fireStore.collection('tests', ref => ref.orderBy('topic', 'desc')).snapshotChanges().pipe(map((changes) => {
        return changes.map(a => {
          const data = a.payload.doc.data() as TestCardModel;
          data.id = a.payload.doc.id;
          return data;
        })
      }));
    }


  addTestCard(tests: any) {
    if (tests.id == "") {
      tests.id =[];
      this.testcardCollection.add(tests);
    }else {
      this.testcardCollection.doc(tests.id).set(tests);
    }
  }


  getTestCardCache() {
    return this.cache.retrieve('/api/data/test');
  }

  clearData() {
    this.cache.clearData();
  }


}

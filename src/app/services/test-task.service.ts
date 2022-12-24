import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {FlashCardModel} from "../models/flash-card.model";
import {map, Observable} from "rxjs";
import {TestCardModel} from "../models/testCard.model";
import {CacheService} from "./cache.service";
import {SwUpdate} from "@angular/service-worker";

@Injectable({
  providedIn: 'root'
})
export class TestTaskService {

  flashcardCollection!: AngularFirestoreCollection<FlashCardModel>
  tests!: Observable<TestCardModel[]>

  constructor(
    private fireStore: AngularFirestore,
    private cache: CacheService,
    private updates: SwUpdate
  ) {
    this.initTask()
  }

  initTask() {
    // get request to google , get the collection of flashcards ordered by topic
    this.flashcardCollection = this.fireStore.collection('tests', ref => ref.orderBy('topic', 'desc'));
    // subscribeflashcards to an Observable and detect changes in the Dataset
    this.tests = this.flashcardCollection.snapshotChanges().pipe(map((changes) => {
      // @ts-ignore 
      return changes.map(a => {
        const data = a.payload.doc.data() as FlashCardModel;
        if (this.updates.isEnabled && navigator.onLine) {
          this.cache.store('/api/data/test', data);
        }
        return data;
      })
    }));
  }


  getTestCard() {
    return this.tests;
  }

  addTestCard(tests: any) {
    if (tests.name != "") {
      this.flashcardCollection.add(tests);
    }
  }

  getTestCardCache() {
    return this.cache.retrieve('/api/data/test');
  }

  clearData() {
    this.cache.clearData();
  }


}

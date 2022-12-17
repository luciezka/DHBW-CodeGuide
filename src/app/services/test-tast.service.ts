import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {FlashCardModel} from "../models/flash-card.model";
import {map, Observable} from "rxjs";
import {TestCardModel} from "../models/testCard.model";

@Injectable({
  providedIn: 'root'
})
export class TestTastService {
  flashcardCollection! : AngularFirestoreCollection<FlashCardModel>
  tests!: Observable<TestCardModel[]>

  constructor(private fireStore : AngularFirestore) {
    // get request to google , get the collection of flashcards ordered by topic
    this.flashcardCollection = this.fireStore.collection('tests', ref => ref.orderBy('topic', 'desc'));

    // subscribeflashcards to an Observable and detect changes in the Dataset

    this.tests = this.flashcardCollection.snapshotChanges().pipe(map((changes) => {
      // @ts-ignore
      return changes.map(a  => {
        const data = a.payload.doc.data() as FlashCardModel;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

  getTestCard() {
    return this.tests;
  }

  addFlashcard(tests: any) {
    if (tests.name != "") {
      this.flashcardCollection.add(tests);
    }
  }



}

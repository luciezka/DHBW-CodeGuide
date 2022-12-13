import { Injectable } from '@angular/core';
import {WebRequestService} from "./web-request.service";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {map, Observable} from "rxjs";
import {FlashCard} from "../models/flash-card.model";

@Injectable({
  providedIn: 'root'
})
export class FlashcardTaskService {

  flashcardCollection! : AngularFirestoreCollection<FlashCard>
  flashcards!: Observable<FlashCard[]>

  constructor(private fireStore : AngularFirestore) {

    // get request to google , get the collection of flashcards ordered by topic
    this.flashcardCollection = this.fireStore.collection('flashcard', ref => ref.orderBy('topic', 'desc'));

  // subscribeflashcards to an Observable and detect changes in the Dataset

    this.flashcards = this.flashcardCollection.snapshotChanges().pipe(map((changes) => {
      // @ts-ignore
      return changes.map(a  => {
        const data = a.payload.doc.data() as FlashCard;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

  getFlashcards() {
    return this.flashcards;
  }

  addFlashcard(flashcard: any) {
    if (flashcard.name != "") {
      this.flashcardCollection.add(flashcard);
    }
  }



}

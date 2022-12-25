import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {map, Observable} from "rxjs";
import {FlashCardModel} from "../models/flash-card.model";
import {SwUpdate} from '@angular/service-worker';
import {CacheService} from "./cache.service";

@Injectable({
  providedIn: 'root'
})
export class FlashcardTaskService {

  flashcardCollection!: AngularFirestoreCollection<FlashCardModel>
  flashcards!: Observable<FlashCardModel[]>

  constructor(
    private fireStore: AngularFirestore,
    private cache: CacheService,
    private updates: SwUpdate
  ) {
    this.initTask()
  }

  initTask() {
    // get request to google , get the collection of flashcards ordered by topic
    this.flashcardCollection = this.fireStore.collection('flashcard', ref => ref.orderBy('topic', 'desc'));
    // subscribeflashcards to an Observable and detect changes in the Dataset
    this.flashcards = this.flashcardCollection.snapshotChanges().pipe(map((changes) => {
      // @ts-ignore
      return changes.map(a => {
        const data = a.payload.doc.data() as FlashCardModel;
        data.id = a.payload.doc.id;
        //Write to cache
        if (this.updates.isEnabled && navigator.onLine) {
          this.cache.store('/api/data/flashcard', data);
        }
        return data;
      })
    }));
  }

  getFlashcards() {
    return this.flashcards;
  }

  addFlashcard(flashcard: any) {
    if (flashcard.id == "") {
      flashcard.id =[];
      this.flashcardCollection.add(flashcard);
    }else {
      this.flashcardCollection.doc(flashcard.id).set(flashcard);
    }
  }

  deleteFlashcard(flashcardid: any) {
    console.log(flashcardid);
    this.flashcardCollection.doc(flashcardid).delete();
  }


  getFlashcardCache() {
    return this.cache.retrieve('/api/data/flashcard');
  }

  clearData() {
    this.cache.clearData();
  }



}

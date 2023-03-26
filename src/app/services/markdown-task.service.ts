import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {map, Observable} from "rxjs";
import {MarkdownModel} from "../models/markdown.model";
import {SwUpdate} from '@angular/service-worker';
import {CacheService} from "./cache.service";

@Injectable({
  providedIn: 'root'
})
export class MarkdownTaskService {

  markdownCollection!: AngularFirestoreCollection<MarkdownModel>
  markdowns!: Observable<MarkdownModel[]>

  constructor(
    private fireStore: AngularFirestore,
    private cache: CacheService,
    private updates: SwUpdate
  ) {
    this.clearData()
    this.initTask()
  }

  initTask() {
    // get request to google , get the collection of flashcards ordered by topic
    this.markdownCollection = this.fireStore.collection('markdown', ref => ref.orderBy('creationDate', 'desc'));
    // subscribeflashcards to an Observable and detect changes in the Dataset
    this.markdowns = this.markdownCollection.snapshotChanges().pipe(map((changes) => {
      // @ts-ignore
      return changes.map(a => {
        const data = a.payload.doc.data() as MarkdownModel;
        data.id = a.payload.doc.id;
        //Write to cache
        if (this.updates.isEnabled && navigator.onLine) {
          this.cache.store('/api/data/markdown', data);
        }
        return data;
      })
    }));
  }


  getNewestMarkdown() {
    return this.fireStore.collection('markdown', ref => ref.orderBy('creationDate', 'desc')).snapshotChanges().pipe(map((changes) => {
      return changes.map(a => {
        const data = a.payload.doc.data() as MarkdownModel;
        data.id = a.payload.doc.id;
        return data;
      })
    }));
  }

  getMarkdowns() {
    return this.markdowns;
  }

  addMarkdown(markdown: any) {
    if (markdown.id == "") {
      markdown.id =[];
      this.markdownCollection.add(markdown);
    }else {
      this.markdownCollection.doc(markdown.id).set(markdown);
    }
  }

  deleteMarkdown(markdownid: any) {
    console.log(markdownid);
    this.markdownCollection.doc(markdownid).delete();
  }


  getMarkdownCache() {
    return this.cache.retrieve('/api/data/markdown');
  }

  clearData() {
    this.cache.clearData();
  }

}

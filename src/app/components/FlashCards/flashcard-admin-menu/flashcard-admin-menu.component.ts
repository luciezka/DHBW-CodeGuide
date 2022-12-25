import { Component, OnInit } from '@angular/core';
import {FlashCardModel} from "../../../models/flash-card.model";
import {FlashcardTaskService} from "../../../services/flashcard-task.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-flashcard-admin-menu',
  templateUrl: './flashcard-admin-menu.component.html',
  styleUrls: ['./flashcard-admin-menu.component.css']
})
export class FlashcardAdminMenuComponent implements OnInit {

  flashCardData!: FlashCardModel[];


  constructor(private flashcardService: FlashcardTaskService, private _router: Router) {
  }

  ngOnInit(): void {
    this.flashcardService.clearData();
    this.initFlashCard();
  }

  initFlashCard() {
    //If offline get cache
    if (!navigator.onLine) {
      this.flashCardData = JSON.parse("[" + this.flashcardService.getFlashcardCache() + "]");
    } else {
      //Subscribe to the available data in Service
      this.flashcardService.getFlashcards().subscribe(async data => {
        this.flashCardData = data;

      }, error => {
      }, () => {
      });
    }
  }

  routeToFlashcardCreator(flashcard: FlashCardModel) {
    // bring the info the the Flashcard
    this._router.navigate(['/FlashcardCreator'], {queryParams: flashcard});
  }

  expandTopic(topic: string) {
    // @ts-ignore
    let elements = document.querySelectorAll("[id='" + topic + "']");
    for (let i = 0; i < elements.length; i++) {
      let element = elements[i] as HTMLElement;
      if (element.style.display === "block") {
        element.style.display = "none";
      } else {
        element.style.display = "block";
      }
    }
  }


  deleteFlashcard(flashcardid: FlashCardModel) {

    this.flashcardService.deleteFlashcard(flashcardid)
  }
}


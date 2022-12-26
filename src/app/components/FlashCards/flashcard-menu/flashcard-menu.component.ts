import {Component, OnInit} from '@angular/core';
import {FlashcardTaskService} from "../../../services/flashcard-task.service";
import {FlashCardModel} from "../../../models/flash-card.model";
import {Router, ActivatedRoute, ParamMap} from "@angular/router";
import {state} from "@angular/animations";

@Component({
  selector: 'app-flashcard-menu',
  templateUrl: './flashcard-menu.component.html',
  styleUrls: ['./flashcard-menu.component.css']
})
export class FlashcardMenuComponent implements OnInit {

  flashCardData!: FlashCardModel[];


  constructor(private flashcardService: FlashcardTaskService, private _router: Router) {
  }

  isActive = false;
  toggleIconClass(icon: HTMLElement) {
    icon.classList.toggle('down');
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

  routeToFlashcard(flashcard: FlashCardModel) {
    // bring the info the the Flashcard
    this._router.navigate(['/Flashcard'], {queryParams: flashcard});
  }

  expandTopic(topic: string) {
    // @ts-ignore
    let elements = document.querySelectorAll("[id='"+topic+"']");
    for (let i = 0; i < elements.length; i++) {
      let element = elements[i] as HTMLElement;
      if (element.style.display === "block") {
        element.style.display = "none";
      } else {
        element.style.display = "block";
      }
    }

  }



}




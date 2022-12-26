import {Component, OnInit} from '@angular/core';
import {FlashcardTaskService} from "../../../services/flashcard-task.service";
import {FlashCardModel} from "../../../models/flash-card.model";
import {Router} from "@angular/router";


@Component({
  selector: 'app-flashcard-menu',
  templateUrl: './flashcard-menu.component.html',
  styleUrls: ['./flashcard-menu.component.css']
})
export class FlashcardMenuComponent implements OnInit {

  flashCardData!: FlashCardModel[];


  constructor(private flashcardService: FlashcardTaskService, private _router: Router) {
    this.flashcardService.clearData();
    this.initFlashCard();
  }
  ngOnInit(): void {
  }

    isActive = false;
    toggleIconClass(icon: HTMLElement) {
    icon.classList.toggle('down');
  }



  initFlashCard() {
      //Subscribe to the available data in Service
      this.flashcardService.getFlashcards().subscribe(async data => {
       // Checks if Connection is available
        this.timeOutConnection(data);
        this.flashCardData = data;
      }, error => {

      }, () => {
      });
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

  timeOutConnection(data : any){
    console.log(data);
    setTimeout(() => {
      if (data.length < 1) {
        console.log("No Connection, using Cache");
        this.flashCardData = JSON.parse("[" + this.flashcardService.getFlashcardCache() + "]");
      }}, 100);
  }

}




import { Component, OnInit } from '@angular/core';
import {FlashcardTaskService} from "../../../services/flashcard-task.service";
import {FlashCardModel} from "../../../models/flash-card.model";
import {Router,ActivatedRoute,ParamMap} from "@angular/router";
import {state} from "@angular/animations";


@Component({
  selector: 'app-flashcard-menu',
  templateUrl: './flashcard-menu.component.html',
  styleUrls: ['./flashcard-menu.component.css']
})
export class FlashcardMenuComponent implements OnInit {

  flashCardData!: any[];

  constructor(private flashcardService: FlashcardTaskService,private _router: Router) {
  }

  ngOnInit(): void {
    if (!navigator.onLine) {
      console.log("["+this.flashcardService.getFlashcardCache() +"]")
     this.flashCardData = JSON.parse("["+this.flashcardService.getFlashcardCache() +"]");
    }else {
      //Subscribe to the available data in Service
      this.flashcardService.getFlashcards().subscribe(async data => {
        this.flashCardData = data;
      }, error => {
      }, () => {
      });
    }
  }

  routeToFlashcard(flashcard: FlashCardModel) {
    // bring the info the the route
    this._router.navigate(['/Flashcard'], { queryParams: flashcard });
  }




}




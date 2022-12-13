import { Component, OnInit } from '@angular/core';
import {FlashcardTaskService} from "../../../services/flashcard-task.service";
import {FlashCard} from "../../../models/flash-card.model";

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css']
})
export class FlashcardComponent implements OnInit {


  isFlipped = false;
  flashCardData! :FlashCard[];

  constructor(private flashcardService : FlashcardTaskService) { }

  ngOnInit(): void {
    //Subscribe to the available data in Service
    this.flashcardService.getFlashcards().subscribe(data => {
      this.flashCardData = data;
    }, error => {
      console.log(error);
    });
  }




}


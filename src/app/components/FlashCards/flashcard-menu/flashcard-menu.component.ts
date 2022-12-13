import { Component, OnInit } from '@angular/core';
import {FlashcardTaskService} from "../../../services/flashcard-task.service";
import {FlashCard} from "../../../models/flash-card.model";
import {firstValueFrom, observable} from "rxjs";

@Component({
  selector: 'app-flashcard-menu',
  templateUrl: './flashcard-menu.component.html',
  styleUrls: ['./flashcard-menu.component.css']
})
export class FlashcardMenuComponent implements OnInit {

  topics!: any[];

  flashCardData!: FlashCard[];

  constructor(private flashcardService: FlashcardTaskService) {
  }

  ngOnInit(): void {
    //Subscribe to the available data in Service
    this.flashcardService.getFlashcards().subscribe(async data => {
      this.flashCardData = data;
    }, error => {
      console.log(error);
    }, () => {
    });

  }


async getAllTopics() {
  try {
    await this.flashCardData.forEach((flashcard) => {
      if (!this.topics.includes(flashcard.topic)) {
        this.topics.push(flashcard.topic);
      }
    });
  } catch {
    console.log("No flashcards available");
  }
}






}




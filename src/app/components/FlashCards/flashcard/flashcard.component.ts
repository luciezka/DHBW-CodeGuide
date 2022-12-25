import {Component, OnInit} from '@angular/core';
import {FlashcardTaskService} from "../../../services/flashcard-task.service";
import {FlashCardModel} from "../../../models/flash-card.model";
import {ActivatedRoute} from "@angular/router";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css']
})
export class FlashcardComponent implements OnInit {


  isFlipped = false;
  flashCardData!: any;

  constructor(public activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    // get the Information from route
    this.flashCardData = this.activatedRoute.snapshot.queryParams;
  }


}


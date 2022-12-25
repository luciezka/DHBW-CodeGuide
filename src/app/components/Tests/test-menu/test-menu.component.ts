import {Component, OnInit} from '@angular/core';
import {FlashcardComponent} from "../../FlashCards/flashcard/flashcard.component";
import {FlashcardTaskService} from "../../../services/flashcard-task.service";
import {Router} from "@angular/router";
import {TestCardModel} from "../../../models/testCard.model";
import {TestTaskService} from "../../../services/test-task.service";

@Component({
  selector: 'app-test-menu',
  templateUrl: './test-menu.component.html',
  styleUrls: ['./test-menu.component.css']
})


export class TestMenuComponent implements OnInit {

  testCardData!: TestCardModel[];

  constructor(private testcardservice: TestTaskService, private _router: Router) {
  }

  ngOnInit(): void {
    this.testcardservice.clearData();
    this.initTestCard();
  }

  initTestCard() {
    //If offline get cache
    if (!navigator.onLine) {
      this.testCardData = JSON.parse("[" + this.testcardservice.getTestCardCache() + "]");
    } else {
      //Subscribe to the available data in Service

      this.testcardservice.getTestCard().subscribe(async data => {
        this.testCardData = data;
      }, error => {
      }, () => {
      });

    }
  }

  routeToTestCard(testcard: TestCardModel) {
    // bring the info the the route
    this._router.navigate(['/Testcard'], {queryParams: testcard});
  }
}


class testSubjet {
  name!: string;
  description!: string;
  exercises!: string[];
  id!: number
  completion!: number;
  downloaded!: boolean;
}



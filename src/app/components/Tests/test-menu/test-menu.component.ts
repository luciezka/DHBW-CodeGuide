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
    this.testcardservice.clearData();
    this.initTestCard();
  }

  ngOnInit(): void {

  }

  initTestCard() {
    //If offline get cache
    if (!navigator.onLine) {

      console.log(this.testCardData);
    } else {
      //Subscribe to the available data in Service
      this.testcardservice.getTestCard().subscribe(async data => {
        this.timeOutConnection(data);
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

  selectRandomTestFromTopic(topic: string) {
    this.testcardservice.getTestCardByTopic(topic).subscribe(async data => {
      let testDataByTopic = data;
      try {
        testDataByTopic.sort(() => Math.random() - 0.5);
      }catch (e) {
      }
      this.routeToTestCard(testDataByTopic[0]);
    }, error => {
    }, () => {
    });
  }

  timeOutConnection(data : any){
    console.log(data);
    setTimeout(() => {
      if (data.length < 1) {
        console.log("No Connection, using Cache");
        this.testCardData = JSON.parse("[" + this.testcardservice.getTestCardCache() + "]");
      }}, 100);
  }



}






import { Component, OnInit } from '@angular/core';
import {TestCardModel} from "../../../models/testCard.model";
import {UserModel} from "../../../models/user.model";
import {TestTaskService} from "../../../services/test-task.service";
import {UserTaskService} from "../../../services/user-task.service";
import {Router} from "@angular/router";
import {FlashCardModel} from "../../../models/flash-card.model";

@Component({
  selector: 'app-test-admin-menu',
  templateUrl: './test-admin-menu.component.html',
  styleUrls: ['./test-admin-menu.component.css']
})

export class TestAdminMenuComponent implements OnInit {
  userData!: UserModel[] ;
  testCardData!: TestCardModel[];



  constructor(private testcardservice: TestTaskService,
              private userTaskService : UserTaskService,
              private _router: Router
  ) {
    this.testcardservice.clearData();
    this.initTestCard();
  }

  ngOnInit(): void {
    this.fetchExistingUser();
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


  fetchExistingUser(){
    this.userTaskService.getUser().subscribe(async data => {
      this.userData = data;
    });
  }

  routeToTestCard(testcard: TestCardModel) {
    // bring the info the the route
    this._router.navigate(['/TestCreator'], {queryParams: testcard});
  }

  deleteFlashcard(flashcardid: FlashCardModel) {
    this.testcardservice.deleteTestcard(flashcardid)
  }

  timeOutConnection(data : any){
    setTimeout(() => {
      if (data.length < 1) {
        console.log("No Connection, using Cache");
        this.testCardData = JSON.parse("[" + this.testcardservice.getTestCardCache() + "]");
      }}, 100);
  }

}

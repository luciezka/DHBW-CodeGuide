import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TestCardModel} from "../../../models/testCard.model";
import {TestTaskService} from "../../../services/test-task.service";
import {UserTaskService} from "../../../services/user-task.service";
import {UserModel} from "../../../models/user.model";

@Component({
  selector: 'app-test-menu',
  templateUrl: './test-menu.component.html',
  styleUrls: ['./test-menu.component.css']
})


export class TestMenuComponent implements OnInit {
  userData!: UserModel[] ;
  testCardData!: TestCardModel[];
  isAdmin = false;


  constructor(private testcardservice: TestTaskService,private userTaskService : UserTaskService, private _router: Router) {
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
    setTimeout(() => {
      if (data.length < 1) {
        console.log("No Connection, using Cache");
        this.testCardData = JSON.parse("[" + this.testcardservice.getTestCardCache() + "]");
      }}, 100);
  }



}






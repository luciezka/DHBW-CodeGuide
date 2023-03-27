import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../models/user.model";
import {UserTaskService} from "../../services/user-task.service";
import {TestCardModel} from "../../models/testCard.model";
import {TestTaskService} from "../../services/test-task.service";
import {FlashcardTaskService} from "../../services/flashcard-task.service";
import {FlashCardModel} from "../../models/flash-card.model";
import {PushNotificationService} from "../../services/push-notification.service";

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  userData!: UserModel[];
  flashCardData!: TestCardModel[];
  testData!: number;
  isOnline : boolean = true;

  constructor(public userTaskService: UserTaskService, public testTaskService: TestTaskService, public flashCardTaskService: FlashcardTaskService,public pushNotificationService : PushNotificationService) {
    this.tryLoginFromCache();
    this.initData()
  }

  ngOnInit(): void {
    this.fetchExistingUser();
  }

  initData() {
    this.flashCardTaskService.getNewestFlashcard().subscribe((data: FlashCardModel[]) => {
      this.flashCardData = data;
      this.timeOutConnection(data);
    });
    this.flashCardTaskService.clearData();
    this.testTaskService.returnTestCard().subscribe((data: TestCardModel[]) => {
      this.testData = data.length;
    });
    this.testTaskService.clearData();
    this.userTaskService.getUser().subscribe((data: UserModel[]) => {
      this.userData = data;
    });
    this.userTaskService.clearData();
  }


  tryLoginFromCache() {
    // IF no user in cache
    if (this.userTaskService.getUserCache() !== null) {
       let userData = JSON.parse("[" + this.userTaskService.getUserCache() + "]");
       // if User not Gast then try getting data from Cloud
       if (userData[0].name !== "Gast") {
        this.userTaskService.getUserByName(userData[0].name);
       }
    }
  }

  async fetchExistingUser() {
    return this.userTaskService.getUser().subscribe( data => {
      this.userData = data;
      return
    }, error => {
    }, () => {
    });
  }

  // If timeout then get all Data
  timeOutConnection(data : any){
    console.log(data);
    setTimeout(() => {
      if (data.length < 1) {
        this.userData = JSON.parse("[" + this.userTaskService.getUserCache() + "]");
        this.flashCardData = JSON.parse("[" + this.flashCardTaskService.getFlashcardCache() + "]");
        let testCardData = JSON.parse("[" + this.testTaskService.getTestCardCache() + "]");
        this.testData = testCardData.length;
      }}, 100);
  }

}

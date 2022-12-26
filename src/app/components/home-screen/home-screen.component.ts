import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../models/user.model";
import {UserTaskService} from "../../services/user-task.service";
import {TestCardModel} from "../../models/testCard.model";
import {TestTaskService} from "../../services/test-task.service";
import {FlashcardTaskService} from "../../services/flashcard-task.service";

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  userData!: UserModel[];
  flashCardData!: TestCardModel[];
  testData!: number;

  testResult : number = 0;
  totalTests: number = 0;

  lastCardName: string = "Arrays and Positions";

  constructor(userTaskService: UserTaskService,testTaskService: TestTaskService,flashCardTaskService: FlashcardTaskService) {
    userTaskService.getUser().subscribe((data: UserModel[]) => {
      this.userData = data;
    });
    testTaskService.getTestCard().subscribe(async data => {
      this.testData = data.length;
    });
    flashCardTaskService.getNewestFlashcard().subscribe((data: TestCardModel[]) => {
      this.flashCardData = data;
    });


  }




  ngOnInit(): void {

  }

}

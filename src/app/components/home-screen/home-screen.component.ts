import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../models/user.model";
import {UserTaskService} from "../../services/user-task.service";

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  userData!: UserModel[];
  testResultPrecentage: number = 80;
  lastCardName: string = "Arrays and Positions";

  constructor(userTaskService: UserTaskService) {
    userTaskService.getUser().subscribe((data: UserModel[]) => {
      this.userData = data;
      });
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import {UserTaskService} from "../../services/user-task.service";
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {


  userData!:UserModel[];

  constructor(public userTask : UserTaskService) { }

  ngOnInit(): void {
      this.initUser();
  }
  initUser() {
    this.userTask.getUser().subscribe(async data => {
      this.userData = data;
    }, error => {
    }, () => {
    });
  }

  initUserByName(name : string) {
    this.userTask.getUserByName(name).subscribe(async data => {
      this.userData = data;
    }, error => {
    }, () => {
    });
  }



}

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

  constructor(public userTaskService : UserTaskService) {
    this.userTaskService.clearData();
    this.initUser();
  }

  ngOnInit(): void {

  }
  initUser() {
    if (!navigator.onLine) {
      this.userData = JSON.parse("[" + this.userTaskService.getUserCache() + "]");
    } else {
      this.userTaskService.getUser().subscribe(async data => {
        this.timeOutConnection(data)
        this.userData = data;

      }, error => {
      }, () => {
      });
    }
  }

  initUserByName(name : string) {
    this.userTaskService.clearData();
    this.userTaskService.getUserByName(name).subscribe(async data => {
      this.userData = data;
    }, error => {
    }, () => {
    });
  }


  timeOutConnection(data : any){
    console.log(data);
    setTimeout(() => {
      if (data.length < 1) {
        this.userData = JSON.parse("[" + this.userTaskService.getUserCache() + "]");
      }}, 100);
  }

}

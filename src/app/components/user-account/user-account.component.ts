import { Component, OnInit } from '@angular/core';
import {UserTaskService} from "../../services/user-task.service";

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {


  userData!:any[];

  constructor(public userTask : UserTaskService) { }

  ngOnInit(): void {
    this.userTask.addUser()
    this.initUser()
  }

  initUser() {
      //If offline get cache
      if (!navigator.onLine) {
        this.userData = JSON.parse("[" + this.userTask.getUserCache() + "]");
      } else {
        //Subscribe to the available data in Service
        this.userTask.getUser().subscribe(async data => {
          this.userData = data;
          console.log(this.userData)
        }, error => {
        }, () => {
        });


    }
  }



}

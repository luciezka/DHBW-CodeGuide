import { Component, OnInit } from '@angular/core';
import {UserTaskService} from "../../services/user-task.service";
import {UserModel} from "../../models/user.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TestCardModel} from "../../models/testCard.model";
import {TestTaskService} from "../../services/test-task.service";

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  testData!: number;
  userData!:UserModel[];
  newUserForm: FormGroup;
  userCreationEnabled = false;
  isAdmin = false;

  constructor(public userTaskService : UserTaskService,
              private formBuilder: FormBuilder,
              public testTaskService: TestTaskService,
  ) {
    this.newUserForm = this.formBuilder.group({
      name: [""],
      email: [""],
      isAdmin: [""],
    });

    this.userTaskService.clearData();
    this.initUser();
  }
  ngOnInit(): void {
    this.initData()
  }



  initData(){
    this.testTaskService.returnTestCard().subscribe((data: TestCardModel[]) => {
      this.testData = data.length;
    });
    this.testTaskService.clearData();
  }

  initUser() {
    if (!navigator.onLine) {
      this.userData = JSON.parse("[" + this.userTaskService.getUserCache() + "]");
    } else {
      this.userTaskService.getUser().subscribe(async data => {
        this.timeOutConnection(data)
        this.userData = data;
        this.isAdmin = this.userData[0].isAdmin;
      }, error => {
      }, () => {
      });
    }
  }


  timeOutConnection(data : any){
    console.log(data);
    setTimeout(() => {
      if (data.length < 1) {
        this.userData = JSON.parse("[" + this.userTaskService.getUserCache() + "]");
      }}, 100);
  }

  createNewUser(){
  }



}

import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import firebase from "firebase/compat/app";
import {UserTaskService} from "../../services/user-task.service";
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css'],
})
export class LoginScreenComponent implements OnInit {

  constructor(private fb: FormBuilder, private userTaskService: UserTaskService){
    this.userTaskService.clearData();
    //this.initUser();
  }

  ngOnInit(): void {
  }
  logedIn = false;
  user!: Promise<any>;
  userData!: UserModel[];

  loginForm = this.fb.group({
    email: [''],
    password: ['']
  });

   initUserByMail(data: any) {
    this.userTaskService.clearData();
    this.userTaskService.getUserByMail(data).subscribe(async data => {
      this.userData = data;
    }, error => {
    }, () => {
    });
  }

  async login() {
    return firebase.auth().signInWithEmailAndPassword(this.loginForm.value.email!, this.loginForm.value.password!).then((userCredential) => {
      return userCredential.user?.email;
    }).catch((error) => {
      confirm("wrong password or email");
      this.logedIn = false;
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  async loginUser() {
    // @ts-ignore
    this.user = await this.login();
    await this.initUserByMail(this.user)
  }
}

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
  }

  ngOnInit(): void {
    this.logedIn = false;
    this.initUser()

  }

  logedIn = false;
  user!: Promise<any>;
  userData!: UserModel[] ;

  loginForm = this.fb.group({
    email: [''],
    password: ['']
  });


  async initUser() {
    // @ts-ignore
    this.user = await this.fetchExistingUser();

  }

  async fetchExistingUser() {
    return this.userTaskService.getUser().subscribe(async data => {
      if (data[0].name !== "Gast"){
        this.logedIn = true;
        this.userData = data;
     }
      return
    }, error => {
    }, () => {
    });
  }

   fetchUserByMail(data: any) {
    this.userTaskService.clearData();
    this.userTaskService.getUserByMail(data).subscribe(async data => {
      this.userData = data;
    }, error => {
    }, () => {
    });
  }

  async login() {
    console.log("login calles")
    return firebase.auth().signInWithEmailAndPassword(this.loginForm.value.email!, this.loginForm.value.password!).then((userCredential) => {
      return userCredential.user?.email;
    }).catch((error) => {
      confirm("wrong password or email");
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  async loginUser() {
    // @ts-ignore
    this.user = await this.login();
    await this.fetchUserByMail(this.user)
    this.logedIn = true;
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.fetchUserByMail("Gast")
      this.logedIn = false;
    }).catch((error) => {
      // An error happened.
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import firebase from "firebase/compat/app";
import {UserTaskService} from "../../services/user-task.service";
import {UserModel} from "../../models/user.model";
import {TestTaskService} from "../../services/test-task.service";
import {TestCardModel} from "../../models/testCard.model";

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css'],
})
export class LoginScreenComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private userTaskService: UserTaskService,
               public testTaskService: TestTaskService,)
  {
    this.userTaskService.clearData();
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });

    this.newUserForm = this.fb.group({
      name: [""],
      email: [""],
      isAdmin: [""],
    });


  }

  ngOnInit(): void {
    this.logedIn = false;
    this.initUser()
  }


  testData!: number;

  userCreationEnabled = false;
  logedIn = false;
  isAdmin = false;


  user!: Promise<any>;
  userData!: UserModel[] ;
  loginForm! :FormGroup;
  newUserForm!: FormGroup;


  async initUser() {
    // @ts-ignore
    this.user = await this.fetchExistingUser();
  }

  initData() {
    this.testTaskService.returnTestCard().subscribe((data: TestCardModel[]) => {
      this.testData = data.length;
    });
    this.testTaskService.clearData();
  }


  async fetchExistingUser() {
    return this.userTaskService.getUser().subscribe( data => {
      if (data[0].name !== "Gast"){
        this.logedIn = true;
     }
      this.userData = data;
      this.isAdmin = this.userData[0].isAdmin;
      return
    }, error => {
    }, () => {
    });
  }

   fetchUserByMail(data: any) {
    this.userTaskService.clearData();
    this.userTaskService.getUserByMail(data).subscribe( data => {
      this.userData = data;
      if (data[0].name !== "Gast"){
        this.logedIn = true;
      }
    }, error => {
    }, () => {
    });
  }

  async login() {
    return firebase.auth().signInWithEmailAndPassword(this.loginForm.value.email!, this.loginForm.value.password!).then((userCredential) => {
      return userCredential.user?.email;
    }).catch((error) => {
      confirm("wrong password or email");
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  resetPassword(email: string) {
    return firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        console.log('Password reset email sent successfully');
      })
      .catch((error) => {
        console.error('Error sending password reset email: ', error);
      });
  }

  createNewUser() {
    if (!this.userData[0].isAdmin) {
      this.newUserForm.value.isAdmin = false;
    }
    let newUserData = {
      name: this.newUserForm.value.name,
      email: this.newUserForm.value.email,
      isAdmin: this.newUserForm.value.isAdmin,
      passedTests: []
    }
    if(this.userTaskService.createUser(newUserData)){
      this.userCreationEnabled = false;
    }

  }

  async loginUser() {
    // @ts-ignore
    this.user = await this.login();
    await this.fetchUserByMail(this.user)
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

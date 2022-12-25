import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css'],
})
export class LoginScreenComponent implements OnInit {

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  loginUser() {
    console.log("Username: " + this.loginForm.value.email + " Password: " + this.loginForm.value.password);
  }

  loginForm = this.fb.group({
    email: [''],
    password: ['']
  });

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  userName : string = "User Name";
  testResultPrecentage : number = 80;
  lastCardName : string = "Arrays and Positions";

  constructor() { }

  ngOnInit(): void {
  }

}

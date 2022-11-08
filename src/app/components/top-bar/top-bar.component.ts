import { Component, OnInit } from '@angular/core';
import { faSchool, faRightToBracket, faUser, faFileCode, faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  faBasics = faSchool;
  faNoCode = faPuzzlePiece;
  faLogin = faRightToBracket;
  faUser = faUser;
  faFileCode = faFileCode;

}

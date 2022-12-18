import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-code',
  templateUrl: './no-code.component.html',
  styleUrls: ['./no-code.component.css']
})
export class NoCodeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public isTextVisible = [false,false];
  reduceText(position: number) {
    this.isTextVisible[position] = !this.isTextVisible[position] ;
  }



}

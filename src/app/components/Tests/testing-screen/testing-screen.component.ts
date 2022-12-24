import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TestCardModel} from "../../../models/testCard.model";

@Component({
  selector: 'app-testing-screen',
  templateUrl: './testing-screen.component.html',
  styleUrls: ['./testing-screen.component.css']
})
export class TestingScreenComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute) {
  }

  testData!: TestCardModel;

  ngOnInit(): void {
    this.testData = this.activatedRoute.snapshot.queryParams;
  }

  submitTest(input: number) {

  }
}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-learn-code',
  templateUrl: './learn-code.component.html',
  styleUrls: ['./learn-code.component.css']
})
export class LearnCodeComponent implements OnInit {

  markdownData!: any;

  constructor(public activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    // get the Information from route
    this.markdownData = this.activatedRoute.snapshot.queryParams;
  }

}


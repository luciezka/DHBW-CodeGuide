import { Component, OnInit } from '@angular/core';
import {FlashcardComponent} from "../../FlashCards/flashcard/flashcard.component";
import {FlashcardTaskService} from "../../../services/flashcard-task.service";

@Component({
  selector: 'app-test-menu',
  templateUrl: './test-menu.component.html',
  styleUrls: ['./test-menu.component.css']
})


export class TestMenuComponent implements OnInit {




  testTest: testSubjet[] =
    [
      {name: "Variables", description: "This is a test", exercises: ["Integer", "Strings", "Booleans"], id: 1,completion: 80,downloaded: false},
      {name: "Test 3", description: "This is a test", exercises: ["Exercise 1", "Exercise 2", "Exercise 3"], id: 1,completion: 10,downloaded: true},
      {name: "Test 4", description: "This is a test", exercises: ["Exercise 1", "Exercise 2", "Exercise 3"], id: 1,completion: 10,downloaded: true},
      {name: "Test 5", description: "This is a test", exercises: ["Exercise 1", "Exercise 2", "Exercise 3"], id: 1,completion: 10,downloaded: true},
      {name: "Test 6", description: "This is a test", exercises: ["Exercise 1", "Exercise 2", "Exercise 3"], id: 1,completion: 10,downloaded: true},
      {name: "Test 7", description: "This is a test", exercises: ["Exercise 1", "Exercise 2", "Exercise 3"], id: 1,completion: 10,downloaded: true},
    ]




  constructor( private databaseService : FlashcardTaskService ) { }

  ngOnInit(): void {

  }




}


class testSubjet {
  name!: string;
  description!: string;
  exercises!: string[];
  id!: number
  completion!: number;
  downloaded!: boolean;
}



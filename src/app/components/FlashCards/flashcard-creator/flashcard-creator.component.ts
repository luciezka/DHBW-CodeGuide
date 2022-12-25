import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FlashCardModel} from "../../../models/flash-card.model";
import {FlashcardTaskService} from "../../../services/flashcard-task.service";

@Component({
  selector: 'app-flashcard-creator',
  templateUrl: './flashcard-creator.component.html',
  styleUrls: ['./flashcard-creator.component.css']
})
export class FlashcardCreatorComponent implements OnInit {
flashcardForm: FormGroup;
flashcard!: FlashCardModel;


  constructor(public activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, public flashcardService: FlashcardTaskService,private _router: Router) {

    this.flashcardForm = this.formBuilder.group({
      topic: "",
      name : "",
      basetext : "",
      fliptext : "" ,
      creationDate : Date.now(),
      id : ""
    });
  }


  ngOnInit(): void {
    this.flashcardForm.patchValue(this.activatedRoute.snapshot.queryParams);
  }

  submitFlashcard() {
    this.flashcard = this.flashcardForm.value as FlashCardModel;
    this.flashcardService.addFlashcard(this.flashcard,);
    this._router.navigate(['/FlashcardMenu']);
  }

}

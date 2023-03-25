import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FlashCardModel} from "../../../models/flash-card.model";
import {FlashcardTaskService} from "../../../services/flashcard-task.service";
import {UserModel} from "../../../models/user.model";
import {UserTaskService} from "../../../services/user-task.service";

@Component({
  selector: 'app-flashcard-creator',
  templateUrl: './flashcard-creator.component.html',
  styleUrls: ['./flashcard-creator.component.css']
})
export class FlashcardCreatorComponent implements OnInit {
flashcardForm: FormGroup;
flashcard!: FlashCardModel;
  userData!: UserModel[] ;

  constructor(public activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              public flashcardService: FlashcardTaskService,
              private userTaskService : UserTaskService
              ,private _router: Router) {

    this.flashcardForm = this.formBuilder.group({
      topic: ["", [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      name : ["", [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      basetext : [null, Validators.required],
      fliptext : [null, Validators.required],
      creationDate : Date.now(),
      id : ""
    });
  }

  ngOnInit(): void {
    this.flashcardForm.patchValue(this.activatedRoute.snapshot.queryParams);
    this.fetchExistingUser()
  }

  submitFlashcard() {
    if (this.userData[0].isAdmin){
    this.flashcard = this.flashcardForm.value as FlashCardModel;
    this.flashcardService.addFlashcard(this.flashcard,);
    this._router.navigate(['/FlashcardMenu']);
    }else{
        alert("You are missing certain permissions to create a flashcard.")
    }
  }

  fetchExistingUser(){
    this.userTaskService.getUser().subscribe(async data => {
      console.log(data);
      this.userData = data;
    });
  }

  name = 'Angular 6';
  htmlContent = '';
  front = "Vorderseite der Karteikarte..."
  back = "Rückseite der Karteikarte..."

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    translate: 'no',
    defaultParagraphSeparator: 'a',
    defaultFontName: 'Montserrat',
    outline: false,
    defaultFontSize: "large",
    fonts: [
        {class: 'montserrat', name: 'Montserrat'}
    ],
    customClasses: [
      {
        name: "Code",
        class: "code",
        tag: "code",
      },
      {
        name: "Small",
        class: "small",
      }
    ],
  };
}

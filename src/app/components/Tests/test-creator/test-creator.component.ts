import {Component, OnInit} from '@angular/core';
import {MarkdownModel} from "../../../models/markdown.model";
import {MarkdownTaskService} from "../../../services/markdown-task.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "../../../models/user.model";
import {UserTaskService} from "../../../services/user-task.service";
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {TestTaskService} from "../../../services/test-task.service";
import {TestCardModel} from "../../../models/testCard.model";

@Component({
  selector: 'app-test-creator',
  templateUrl: './test-creator.component.html',
  styleUrls: ['./test-creator.component.css']
})
export class TestCreatorComponent implements OnInit {
  testForm: FormGroup;
  userData!: UserModel[];

  inputSizeWrong =[""];
  inputSizeCorrect =[""];


  inputTest: TestCardModel = {
    topic: "",
    name: "",
    questionText: "",
    answerRight: [""],
    answerWrong: [""],
  }


  constructor(public activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              public MarkdownService: MarkdownTaskService,
              private userTaskService: UserTaskService,
              private _router: Router,
              private testtask: TestTaskService) {

    this.testForm = this.formBuilder.group({
      topic: ["", [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      name: ["", [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      questionText: ["", [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      answerRight :["", [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]] ,
      answerWrong :["", [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]] ,
      questionType: ["1", [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      creationDate: Date.now(),
    });
  }

  ngOnInit(): void {
    this.testForm.patchValue(this.activatedRoute.snapshot.queryParams);
    this.fetchExistingUser()
    this.inputTest = this.testForm.value
    console.log(this.inputTest)

  }

  increaseInputSize( data :any[]) {
      data.push("");

  }


  submitTest() {
  console.log("submitting")
    console.log(this.inputTest)
    console.log(this.testForm.value)
    if (!this.userData[0].isAdmin) {

      if (!this.checkForEmptyValues()) {
        this.inputTest = this.testForm.value;
        if(this.testForm.value.answerRight !== Object) {
          this.inputTest.answerRight = [this.testForm.value.answerRight]
          this.inputTest.answerWrong = [this.testForm.value.answerWrong]
          console.log(this.inputTest)
        }}
    } else {
      alert("You are missing certain permissions to create a flashcard.")
    }
  }


  checkForEmptyValues() {
    let hasEmptyValues = false;
    // @ts-ignore
    if (this.testForm.value.answerRight[0] === "") {
      alert("Please fill in the correct answer.")
      let hasEmptyValues = true;
    }
    return hasEmptyValues;
  }




  fetchExistingUser() {
    this.userTaskService.getUser().subscribe(async data => {
      this.userData = data;
    });
  }


  name = 'Angular 6';
  htmlContent = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter question here...',
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
        name: "Highlight",
        class: "highlight",
      },
      {
        name: "JavaScript",
        class: "ft-syntax-highlight",
        tag: "pre",
      },
      {
        name: "Small",
        class: "small",
      }
    ],
  };

}

import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "../../../models/user.model";
import {UserTaskService} from "../../../services/user-task.service";
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {TestTaskService} from "../../../services/test-task.service";
import {TestCardModel} from "../../../models/testCard.model";
import {combineChange} from "@angular/fire/compat/firestore";


@Component({
  selector: 'app-test-creator',
  templateUrl: './test-creator.component.html',
  styleUrls: ['./test-creator.component.css']
})
export class TestCreatorComponent implements OnInit {
  testForm: FormGroup;
  userData!: UserModel[];


  newTest: TestCardModel = {
    topic: "",
    name: "",
    questionText: "",
    answerRight: [],
    answerWrong: [],
  }

  constructor(public activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private userTaskService: UserTaskService,
              private _router: Router,
              private testtask: TestTaskService) {

    this.testForm = this.formBuilder.group({

      topic: ["", [ Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      name: ["", [ Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      questionText: ["", [ Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      questionType: ["3", [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      answerRight: [""],
      creationDate: Date.now(),
    });
    this.testForm.patchValue(this.activatedRoute.snapshot.queryParams);
    this.testForm.patchValue({answerRight: this.activatedRoute.snapshot.queryParams['answerRight'][0]})
  }

  ngOnInit(): void {
    //Push data into InputTest
    for (let i = 0; i < this.activatedRoute.snapshot.queryParams['answerRight'].length; i++) {
      this.newTest.answerRight!.push(this.activatedRoute.snapshot.queryParams['answerRight'][i]);
    }
    if(this.testForm.value.questionType == 1){
      for (let i = 0; i < this.activatedRoute.snapshot.queryParams['answerWrong'].length; i++) {
        this.newTest.answerWrong!.push(this.activatedRoute.snapshot.queryParams['answerWrong'][i]);
      }
    }
    this.patchFormToNewTest()
    this.fetchExistingUser()
    console.log(this.testForm.value)
    }

  ngAfterViewInit(): void {
    this.patchDataToUi()
  }

  patchFormToNewTest() {
    this.newTest.topic = this.testForm.value.topic
    this.newTest.name = this.testForm.value.name
    this.newTest.questionText = this.testForm.value.questionText
    this.newTest.questionType = this.testForm.value.questionType
    this.newTest.creationDate = this.testForm.value.creationDate
  }

  patchDataToUi() {
    this.patchFormToNewTest()
    if (this.newTest.questionType! <=2 ) {
      for (let i = 0; i < this.newTest.answerRight!.length; i++) {
        // @ts-ignore
        document.getElementById('correctInput' + i).value = this.newTest.answerRight![i]
      }
    }
    if (this.newTest.questionType == 1){
      for (let i = 0; i < this.newTest.answerWrong!.length; i++) {
        // @ts-ignore
        document.getElementById('wrongInput'+i).value=this.newTest.answerWrong![i]
      }}
  }



  //if anyone is up to the challenge to understand FormArrays and implement them you can delete this
  // ONLY NEEDED FOR 1 and 2
  fetchAnswersFromDom() {
    //makes sure we fetching the right data
    this.patchFormToNewTest()
    for (let i = 0; i < 4; i++) {
      if (this.newTest.questionType! <= 2) {
        // @ts-ignore
        if (document.getElementById('correctInput' + i)!.value !== "" || document.getElementById('correctInput' + i)!.value !==  null){
            // @ts-ignore
            this.newTest.answerRight![i] = document.getElementById!('correctInput' + i)!.value
        }
        if (this.newTest.questionType == 1) {
          // @ts-ignore
          if (document.getElementById('wrongInput' + i)!.value !== ""|| document.getElementById('correctInput' + i)!.value !==  null) {
            // @ts-ignore
            this.newTest.answerRight![i] = document.getElementById('wrongInput' + i).value
          }
        }
      }
    }
  }




  checkForEmptyValues() {
    let hasEmptyValues = false;
    // @ts-ignore
    if (this.newTest.answerRight === "") {
      alert("Please fill in the correct answer.")
      let hasEmptyValues = true;
    }if (this.testForm.value.name === "") {
      alert("Please fill in the correct name.")
      let hasEmptyValues = true;
    }if (this.testForm.value.topic === "") {
      alert("Please fill in the correct topic.")
      let hasEmptyValues = true;
    }if (this.testForm.value.questionText === "") {
      alert("Please fill in the correct question.")
      let hasEmptyValues = true;
    }
    return hasEmptyValues;
  }

  fetchDataByQuestionType() {
    //check which answers we need depending on question type
    if (this.newTest.questionType == 2) {
      //making sure there are no wrong answers
      this.newTest.answerWrong = [""]
    // Only getting data from form
    }else if(this.newTest.questionType == 3) {
      this.newTest.answerRight = [this.testForm.value.answerRight]
      this.newTest.answerWrong = [""]
    }
  }


  submitTest() {
    console.log("submit")
    //making sure the data is set to the new test
    this.patchFormToNewTest()
    this.fetchAnswersFromDom()
      if (!this.checkForEmptyValues()){
      this.fetchDataByQuestionType()
        console.log("this Object will be published")
        console.log(this.newTest)
      } else {
        alert("You are missing certain permissions to create a flashcard.")
    }
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

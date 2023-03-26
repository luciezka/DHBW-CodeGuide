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
    id: "",
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
      questionType: ["", [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      answerRight: [""],
      id: [""],
      creationDate: Date.now(),
    });
    this.testForm.patchValue(this.activatedRoute.snapshot.queryParams);

    //get data from params if there are any
    if (Object.keys(this.activatedRoute.snapshot.queryParams).length !== 0) {
      this.testForm.patchValue({answerRight: this.activatedRoute.snapshot.queryParams['answerRight'][0]})
      for (let i = 0; i < this.activatedRoute.snapshot.queryParams['answerRight'].length; i++) {
        this.newTest.answerRight!.push(this.activatedRoute.snapshot.queryParams['answerRight'][i]);
      }
      if(this.testForm.value.questionType == 1){
        for (let i = 0; i < this.activatedRoute.snapshot.queryParams['answerWrong'].length; i++) {
          this.newTest.answerWrong!.push(this.activatedRoute.snapshot.queryParams['answerWrong'][i]);
        }
      }
    }
  }

  ngOnInit(): void {
    //Push data into InputTest
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
    this.newTest.id = this.testForm.value.id
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
    for (let i = 0; i < 4; i++) {
        //make sure the array is defined
        // @ts-ignore
        if (document.getElementById('correctInput' + i)!.value !== "" || document.getElementById('correctInput' + i)!.value !== undefined){
           // @ts-ignore
            this.newTest.answerRight![i] = document.getElementById!('correctInput' + i)!.value!
        }
        if (this.newTest.questionType == 1) {
          // @ts-ignore
          if (document.getElementById('wrongInput' + i)!.value !== ""||  document.getElementById('wrongInput' + i)!.value !== undefined) {
            // @ts-ignore
            this.newTest.answerWrong![i] = document.getElementById('wrongInput' + i).value
          }
        }
    }
  }


  checkForEmptyValues() {
    let hasEmptyValues = false;
    // @ts-ignore
      this.newTest.answerRight = this.newTest.answerRight!.filter(value => value || value === false);
      this.newTest.answerWrong = this.newTest.answerWrong!.filter(value => value);
    if (this.newTest.answerRight.length === 0) {
      alert("Please fill in the correct answer.")
      let hasEmptyValues = true;
    } // @ts-ignore
    if (this.newTest.answerWrong.length === 0 && this.newTest.questionType == 1){
      alert("Please fill in the wrong answer.")
      let hasEmptyValues = true;
    }
    if (this.testForm.value.name === "") {
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
    if (this.newTest.questionType! > 1) {
      //making sure there are no wrong answers
      this.newTest.answerWrong = [""]
    // Only getting data from form
    }if(this.newTest.questionType! == 3) {
      if (this.testForm.value.answerRight == "true" || this.testForm.value.answerRight == "false"){
        this.newTest.answerRight = [JSON.parse(this.testForm.value.answerRight)]
        this.newTest.answerWrong = [""]
      }else {
        this.newTest.answerRight = [""]
        this.newTest.answerWrong = [""]
      }
    }
  }


  submitTest() {
    //making sure the data is set to the new test
    this.patchFormToNewTest()
    //fetching the answers from the DOM
    if (this.newTest.questionType! <= 2) {
      this.newTest.answerRight = []
      this.newTest.answerWrong = []
      this.fetchAnswersFromDom()
    }
    this.fetchDataByQuestionType()
      if (!this.checkForEmptyValues()){
        if (this.userData[0].isAdmin) {
          this.testtask.createTest(this.newTest)
          this._router.navigate(['/TestMenu'])
        } else {
          alert("You are missing certain permissions to create a test.")
        }
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
        name: "Code",
        class: "code",
        tag: "pre",
      },
      {
        name: "Small",
        class: "small",
      }
    ],
  };

}

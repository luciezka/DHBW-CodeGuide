import { Component, OnInit } from '@angular/core';
import {MarkdownModel} from "../../../models/markdown.model";
import {MarkdownTaskService} from "../../../services/markdown-task.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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

  markdownForm: FormGroup;
  userData!: UserModel[] ;
  testType = 1;

  inputSizeCorrect = [""];
  inputSizeWrong = [""];

  inputTest: TestCardModel = {

    topic: "",
    name: "",
    questionType: 1,
    questionText: "",
    answerRight: [""],
    answerWrong: [""],
  }

//



  changeBooleanTestType(sentenceTrue : boolean){
      // @ts-ignore
    this.inputTest.answerRight[0] = sentenceTrue;
  console.log(this.inputTest);
  }

  increaseInputSize(array : any[]){
    array.push("");
  }
  resetSizes(){
    this.inputSizeCorrect = [""];
    this.inputSizeWrong = [""];
  }

  checkForEmptyValues(){
    let hasEmptyValues = false;
    // @ts-ignore
    let temp = this.inputTest.answerRight[0];
    console.log(temp);



    if (temp === ""){
      // @ts-ignore
      console.log(this.inputTest.answerRight[0]);
      alert("Please fill in the correct answer.")
      let hasEmptyValues = true;
    }
    return hasEmptyValues;
  }





  constructor(public activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              public MarkdownService: MarkdownTaskService,
              private userTaskService : UserTaskService,
              private _router: Router,
              private testtask : TestTaskService) {
    this.markdownForm = this.formBuilder.group({
      topic: ["", [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      name : ["", [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      html: [null, Validators.required],
      creationDate : Date.now(),
      id : ""
    });
  }

  ngOnInit(): void {
    this.markdownForm.patchValue(this.activatedRoute.snapshot.queryParams);
    this.fetchExistingUser()
  }

  submitMarkdown() {
    this.inputTest.topic = this.markdownForm.value.topic;
    this.inputTest.name = this.markdownForm.value.name;
    this.inputTest.questionText = this.markdownForm.value.html;
    if(!this.checkForEmptyValues()){
      if (this.userData[0].isAdmin){
        //this.markdown = this.markdownForm.value as MarkdownModel;
        //this.MarkdownService.addMarkdown(this.markdown,);
        //this._router.navigate(['/LearnCodeMenu']);
      }else{
        alert("You are missing certain permissions to create a flashcard.")
      }
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

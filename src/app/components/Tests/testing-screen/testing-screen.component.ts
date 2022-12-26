import {Component, forwardRef, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TestCardModel} from "../../../models/testCard.model";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserTaskService} from "../../../services/user-task.service";
import {UserModel} from "../../../models/user.model";

@Component({
  selector: 'app-testing-screen',
  templateUrl: './testing-screen.component.html',
  styleUrls: ['./testing-screen.component.css']
})


export class TestingScreenComponent implements OnInit {
  submitForm: FormGroup;
  testData!: TestCardModel;
  answerTable!: string[];

  showSubmitScreen = false;
  showMistakeScreen = false;
  userData! : UserModel[];

  constructor(public activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,public userService: UserTaskService) {
    this.submitForm = this.formBuilder.group({
      optionArray: this.formBuilder.array([], [Validators.required]),
      answer: ''
    });
  }

  ngOnInit(): void {
    this.testData = this.activatedRoute.snapshot.queryParams
    this.initUser();
    this.randomizeAnswers()
  }

  //sunmit button was pressed
  submitTest() {
    this.checkRightAnswers();
  }


  //randomize the answers for checkbox questions
  randomizeAnswers() {
    this.answerTable = this.testData.answerRight!.concat(this.testData.answerWrong!);
    try {
      this.answerTable.sort(() => Math.random() - 0.5);
    }catch (e) {
      console.log(e)
    }
  }

//check if questiontype 1 or 2 is used in this question
  checkRightAnswers() {
    this.showSubmitScreen = true;
    // @ts-ignore
    switch (parseInt(this.testData.questionType)) {
      case 1:
        this.checkRightAnswerCheckBox()
        break;
      case 2:
        this.checkRightAnswerTextInput()
        break;
      default:
        console.log("invalid case");
        break;
    }
  }

  checkRightAnswerBool(input :boolean) {
    this.showSubmitScreen = true;
    let rightAnswers = this.testData.answerRight![0];
    //Converts string to boolean
    if( JSON.parse(rightAnswers) != input){
      this.showMistakeScreen = true;
    }else {
      this.updateUserWithTestID();
    }
  }

//checks the right answers for text input
  checkRightAnswerTextInput() {
    let rightAnswers = this.testData.answerRight!;
  // cleans string from whitespace and to lowercase
    for(let i = 0; i < rightAnswers.length; i++){
      rightAnswers[i] = rightAnswers[i].replace(/\s/g,"").toLowerCase();
      }
    // cleans string from whitespace and to lowercase
    if (!rightAnswers.includes(this.submitForm.value.answer.replace(/\s/g, "").toLowerCase())) {
      this.showMistakeScreen = true;
    }else{
      this.updateUserWithTestID();
    }
  }

  //Checks the right answers for checkboxes
  checkRightAnswerCheckBox() {
    let rightAnswers = this.testData.answerRight;
    let wrongAnswers = [];
    //checks all answers if they are right or wrong
    for (let item of this.submitForm.value.optionArray) {
      if (rightAnswers?.includes(item)) {
        rightAnswers = rightAnswers.filter((str) => str !== item);
      } else {
        wrongAnswers.push(item)
      }
    }
    //checks if not all right answers are checked and if there are wrong answers
    if (wrongAnswers.length  || rightAnswers!.length ) {
      this.showMistakeScreen = true;
    }else{
      this.updateUserWithTestID();
    }
  }


// USER INTERACTION
  initUser() {
    this.userService.getUser().subscribe(async data => {
      this.userData = data;
    }, error => {
    }, () => {
    });
  }


  updateUserWithTestID() {
// Falls nicht enthalten und nicht eingeloggt als Gast
    if (!this.userData[0].passedTests.includes(this.testData.id) && this.userData[0].name != "Gast") {
      this.userData[0].passedTests.push(this.testData.id);
      this.userService.updateUser(this.userData[0])
    }
  }


// write Checkboxes into array
  onCheckboxChange(e: any) {
    const optionArray: FormArray = this.submitForm.get('optionArray') as FormArray;
    if (e.target.checked) {
      optionArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      optionArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          optionArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }



}

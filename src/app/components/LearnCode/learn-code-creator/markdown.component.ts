import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MarkdownModel} from "../../../models/markdown.model";
import {MarkdownTaskService} from "../../../services/markdown-task.service";
import {UserTaskService} from "../../../services/user-task.service";
import {UserModel} from "../../../models/user.model";

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: [ './markdown.component.css' ],
})

export class MarkdownComponent implements OnInit {
  markdownForm: FormGroup;
  markdown!: MarkdownModel;
  userData!: UserModel[] ;


  constructor(public activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              public MarkdownService: MarkdownTaskService,
              private userTaskService : UserTaskService,
              private _router: Router) {
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
    if (this.userData[0].isAdmin){
      this.markdown = this.markdownForm.value as MarkdownModel;
      this.MarkdownService.addMarkdown(this.markdown,);
      this._router.navigate(['/LearnCodeMenu']);
    } else {
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

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter Text here...',
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
      },
      {
        name: "Small",
        class: "small",
      }
    ],
  };
}

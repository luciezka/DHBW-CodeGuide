import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MarkdownModel} from "../../../models/markdown.model";
import {MarkdownTaskService} from "../../../services/markdown-task.service";

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: [ './markdown.component.css' ]
})

export class MarkdownComponent implements OnInit {
  markdownForm: FormGroup;
  markdown!: MarkdownModel;

  constructor(public activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, public MarkdownService: MarkdownTaskService,private _router: Router) {
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
  }

  submitMarkdown() {
    this.markdown = this.markdownForm.value as MarkdownModel;
    console.log(this.markdown);
    this.MarkdownService.addMarkdown(this.markdown,);
    this._router.navigate(['/LearnCodeMenu']);
  }

  name = 'Angular 6';
  htmlContent = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
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
        name: "Small",
        class: "small",
      }
    ],
  };
}
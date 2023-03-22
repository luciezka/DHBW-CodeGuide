import { Component, OnInit } from '@angular/core';
import {MarkdownModel} from "../../../models/markdown.model";
import {MarkdownTaskService} from "../../../services/markdown-task.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-learn-code-admin-menu',
  templateUrl: './learn-code-admin-menu.component.html',
  styleUrls: ['./learn-code-admin-menu.component.css']
})
export class LearnCodeAdminMenuComponent implements OnInit {

  markdownData!: MarkdownModel[];


  constructor(private markdownService: MarkdownTaskService, private _router: Router) {
  }

  ngOnInit(): void {
    this.markdownService.clearData();
    this.initMarkdown();
  }

  initMarkdown() {
    //If offline get cache
    if (!navigator.onLine) {
      this.markdownData = JSON.parse("[" + this.markdownService.getMarkdownCache() + "]");
    } else {
      //Subscribe to the available data in Service
      this.markdownService.getMarkdowns().subscribe(async data => {
        this.markdownData = data;

      }, error => {
      }, () => {
      });
    }
  }

  isActive = false;
  toggleIconClass(icon: HTMLElement) {
    icon.classList.toggle('down');
  }

  routeToMarkdownCreator(markdown: MarkdownModel) {
    // bring the info the the Flashcard
    this._router.navigate(['/LearnCodeCreator'], {queryParams: markdown});
  }

  expandTopic(topic: string) {
    // @ts-ignore
    let elements = document.querySelectorAll("[id='" + topic + "']");
    for (let i = 0; i < elements.length; i++) {
      let element = elements[i] as HTMLElement;
      if (element.style.display === "block") {
        element.style.display = "none";
      } else {
        element.style.display = "block";
      }
    }
  }


  deleteMarkdown(markdownid: MarkdownModel) {
    this.markdownService.deleteMarkdown(markdownid)
  }
}


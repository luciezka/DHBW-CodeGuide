import {Component, OnInit} from '@angular/core';
import {MarkdownTaskService} from "../../../services/markdown-task.service";
import {MarkdownModel} from "../../../models/markdown.model";
import {Router} from "@angular/router";


@Component({
  selector: 'app-learn-code-menu',
  templateUrl: './learn-code-menu.component.html',
  styleUrls: ['./learn-code-menu.component.css']
})
export class LearnCodeMenuComponent implements OnInit {

  MarkdownData!: MarkdownModel[];


  constructor(private markdownService: MarkdownTaskService, private _router: Router) {
    this.markdownService.clearData();
    this.initMarkdown();
  }
  ngOnInit(): void {
  }

    isActive = false;
    toggleIconClass(icon: HTMLElement) {
    icon.classList.toggle('down');
  }



  initMarkdown() {
      //Subscribe to the available data in Service
      this.markdownService.getMarkdowns().subscribe(async data => {
       // Checks if Connection is available
        this.timeOutConnection(data);
        this.MarkdownData = data;
      }, error => {

      }, () => {
      });
  }

  routeToMarkdown(markdown: MarkdownModel) {
    // bring the info the the Flashcard
    this._router.navigate(['/LearnCode'], {queryParams: markdown});
  }

  expandTopic(topic: string) {
    // @ts-ignore
    let elements = document.querySelectorAll("[id='"+topic+"']");
    for (let i = 0; i < elements.length; i++) {
      let element = elements[i] as HTMLElement;
      if (element.style.display === "block") {
        element.style.display = "none";
      } else {
        element.style.display = "block";
      }
    }

  }

  timeOutConnection(data : any){
    console.log(data);
    setTimeout(() => {
      if (data.length < 1) {
        console.log("No Connection, using Cache");
        this.MarkdownData = JSON.parse("[" + this.markdownService.getMarkdownCache() + "]");
      }}, 100);
  }

}




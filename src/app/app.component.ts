import { Component, inject, input, REQUEST, REQUEST_CONTEXT } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-content',
  template: `
    <div class="content-box">
      <h1>{{title()}}</h1>
      <p>{{text()}}</p>
    </div>
  `,
  styles: [`
    .content-box {
      padding: 20px;
      margin: 10px;
      border-radius: 8px;
      background-color: #f5f5f5;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      text-align: center;
    }
  `]
})
export class ContentComponent {
  title = input.required<string>();
  text = input.required<string>();
}

@Component({
  selector: 'app-root',
  imports: [NgComponentOutlet, ContentComponent, RouterOutlet],
  template: `
    {{context}}
    <ng-container *ngComponentOutlet="contentComponent; inputs: dynamicComponentInput;"/>
    <app-content [text]="staticComponentInput.text" [title]="staticComponentInput.title"/>
    <router-outlet />
  `,
})
export class AppComponent {

  context = inject(REQUEST_CONTEXT);
  request = inject(REQUEST);

  readonly contentComponent = ContentComponent;

  readonly dynamicComponentInput = {
    title: 'Dynamic Component',
    text: 'This component is rendered with *ngComponentOutlet. It has an ng-version attribute.',
  }
  readonly staticComponentInput = {
    title: 'Static Component',
    text: 'This component is rendered with statically in the template. It does not have an ng-version attribute.',
  }

  constructor() {
    console.log('AppComponent', this.context, this.request);
  }

}

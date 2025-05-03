import { Component, input } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { logInRouteExploration } from './route-extraction';

@Component({
  selector: 'app-content',
  template: `
    <div [class.content-box]="true" [class.client-color]="!isServer" [class.server-color]="isServer" >
      <h1>{{title()}}</h1>
      <p>{{text()}}</p>
    </div>
  `,
  styles: [`
    .server-color {
      background-color: red;
    }
    .client-color {
      background-color: green;
    }
    .content-box {
      padding: 20px;
      margin: 10px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      text-align: center;
    }
  `]
})
export class ContentComponent {
  title = input.required<string>();
  text = input.required<string>();
  protected readonly isServer = ngServerMode;
  colorClass = this.isServer ? 'server-color' : 'client-color';
}

@Component({
  selector: 'app-root',
  imports: [NgComponentOutlet, ContentComponent, RouterOutlet],
  template: `
    <ng-container *ngComponentOutlet="contentComponent; inputs: dynamicComponentInput;"/>
    <app-content [text]="staticComponentInput.text" [title]="staticComponentInput.title" />
    <router-outlet />
  `,
})
export class AppComponent {



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
    console.log('AppComponent');
    logInRouteExploration('AppComponent');
  }
}

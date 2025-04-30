import { Component } from '@angular/core';

console.log('Loaded Component 2');

@Component({
  selector: 'app-component-2',
  standalone: true,
  template: `
    <div class="container">
      <h2>Component 2</h2>
      <p>This is a simple component.</p>
    </div>
  `,
  styles: [`
    .container {
      padding: 15px;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin: 10px;
    }
  `]
})
export class Component2 {}

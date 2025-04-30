import { Component } from '@angular/core';

@Component({
  selector: 'app-component-1',
  template: `
    <div class="component-container">
      <h2>Standalone Component</h2>
      <p>This is a simple standalone component example.</p>
    </div>
  `,
  styles: [`
    .component-container {
      padding: 15px;
      margin: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: #ffffff;
    }

    h2 {
      color: #333;
      margin-bottom: 10px;
    }

    p {
      color: #666;
    }
  `]
})
export class Component1 {
}

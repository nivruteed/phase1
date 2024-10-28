import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myweb'; // Add this line
  currentComponent: string = 'login';

  showComponent(component: string) {
    this.currentComponent = component;
  }
}

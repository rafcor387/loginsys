//app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    this.enableDarkMode();
  }

  enableDarkMode() {
    document.body.classList.add('dark-theme');
  }


}
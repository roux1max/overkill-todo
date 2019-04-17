import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'overkill-todo';

  constructor(private _router: Router) {}

  goToHome() {
    this._router.navigate(['/']);
  }
}

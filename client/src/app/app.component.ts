import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { NavComponent } from './components/nav/nav.component';
import { AccountService } from './services/accountService';
import { HomeComponent } from "./components/home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatTableModule, NavComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  #accountService = inject(AccountService);

  constructor() {
    const userstring = localStorage.getItem('user');
    this.#accountService.currentUser.set(userstring ? JSON.parse(userstring) : null);
  }
}

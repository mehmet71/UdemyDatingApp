import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../services/accountService';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  #accountService = inject(AccountService);

  loginForm = inject(FormBuilder).group({
    ['username']: [null, Validators.required],
    ['password']: [null, [Validators.required]]
  })

  loggedInSignal = signal<boolean>(false);
  loggedIn$ = this.loggedInSignal.asObservable();

  onLogin(): void {
    // TODO später vllt auf nen Store umstellen statt Services für sowas zu nutzen
    const loginData = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
    }

    this.#accountService.login(loginData).subscribe({
      next: res => {
        console.log(res);
        this.loggedIn = true;
      },
      error: err => console.log(err)
    })
  }

  onLogout(): void {
    this.loggedIn = false;
  }
}

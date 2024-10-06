import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../services/accountService';
import { catchError, EMPTY } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ReactiveFormsModule, BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  accountService = inject(AccountService);

  loginForm = inject(FormBuilder).group({
    ['username']: ['', Validators.required],
    ['password']: ['', [Validators.required]]
  })

  triggerLogin(): void {
    const loginData = this.loginForm.getRawValue();
    if (!!loginData.username && !!loginData.password) {
      this.accountService.login(loginData.username, loginData.password)
    }
  }

  triggerLogout(): void {
    this.loginForm.reset();
    this.accountService.logout();
  }
}

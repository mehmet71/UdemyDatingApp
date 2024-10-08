import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../services/accountService';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ReactiveFormsModule, BsDropdownModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  accountService = inject(AccountService);
  #router = inject(Router);

  loginForm = inject(FormBuilder).group({
    ['username']: ['', Validators.required],
    ['password']: ['', [Validators.required]]
  });

  triggerLogin(): void {
    const loginData = this.loginForm.getRawValue();
    if (!!loginData.username && !!loginData.password) {
      this.accountService.login(loginData.username, loginData.password).subscribe({
        next: () => this.#router.navigateByUrl('/members')
      })
    }
  }

  triggerLogout(): void {
    this.loginForm.reset();
    this.accountService.logout();
    this.#router.navigateByUrl('/');
  }
}

import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../services/accountService';
import { catchError, EMPTY } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {
    #fb = inject(FormBuilder);
    #accountService = inject(AccountService);
    cancelRegister = output<boolean>();

    registerForm = this.#fb.group({
        ['username']: this.#fb.control('', Validators.required),
        ['password']: this.#fb.control('', Validators.required)
        // ['name']: this.#fb.control('', Validators.required),
        // ['surname']: this.#fb.control('', Validators.required),
        // ['age']: this.#fb.control<number | undefined>(undefined, [Validators.required, Validators.min(18)]),//[undefined, [Validators.required, Validators.min(18)]],
        // ['gender']: this.#fb.control<number | undefined>(undefined, Validators.required),
        // ['email']: this.#fb.control('', [Validators.required, Validators.email])
    })

    registerUser(): void {
        const username = this.registerForm.get('username')?.value;
        const password = this.registerForm.get('password')?.value;
        if (username && password) {
            this.#accountService.register(username, password).pipe(catchError((err: HttpErrorResponse) => {
                console.log(err);
                window.alert("Registrierung ist schiefgelaufen.");
                return EMPTY;
            })).subscribe((user) => {
                this.registerForm.reset();
                window.alert("Registrierung abgeschlossen. Benutzer wird direkt angemeldet.");
            });
        }
    }

    cancelRegistration(): void {
        this.cancelRegister.emit(true);
    }
}
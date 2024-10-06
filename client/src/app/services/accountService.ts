import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { catchError, EMPTY, map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  #baseUrl = 'https://localhost:5001/api';
  #http = inject(HttpClient)
  currentUser = signal<User | null>(null);

  login(username: string, password: string): void {
    this.#http.post<User>(this.#baseUrl + '/account/login', { username: username, password: password })
      .pipe(take(1),
        map(user => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUser.set(user);
          }
        }),
        catchError((err: HttpErrorResponse) => {
          console.log(err);
          if (err.error === 'invalid username or password') {
            window.alert("Benutzername oder Password falsch.");
          } else {
            window.alert("Login ist schiefgelaufen.");
          }

          return EMPTY;
        })).subscribe();
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

  register(username: string, password: string): Observable<User> {
    return this.#http.post<User>(this.#baseUrl + '/account/register', { username: username, password: password }).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
        return user;
      })
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  #baseUrl = 'https://localhost:5001/api';
  #http = inject(HttpClient)

  constructor() { }

  login(model: any) {
    return this.#http.post(this.#baseUrl + '/account/login', model);
  }
}

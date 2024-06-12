import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable()
export class UserDataService{   
    #baseApiUrl = "https://localhost:5001/api"
    #http = inject(HttpClient);

    GetUsers(): Observable<User[]> {
        return this.#http.get<User[]>(this.#baseApiUrl + '/users');
    }
}
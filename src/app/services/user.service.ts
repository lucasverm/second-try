import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  public getUser(): Observable<User> {
    const user = {
      id: 0,
      name: "Lucas",
      lastName: "Vermeulen",
      age: 25
    } as User;
    return of(user);
  }
}

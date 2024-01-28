import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Location } from '../models/location';
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
      age: 25,
      birthDay: new Date(),
      description: "Ik ben Lucas. Ik woon in Gent, studeerde informatica en werk als IT consultant. Ik ben imker en hou van kiten op de noordzee.",
      profilePicture: "../../assets/example_data/profilePicture.jpeg",
      pictures: ["../../assets/example_data/profilePicture.jpeg",
        "../../assets/example_data/profilePicture.jpeg",
        "../../assets/example_data/profilePicture.jpeg",
        "../../assets/example_data/profilePicture.jpeg",
        "../../assets/example_data/profilePicture.jpeg",
        "../../assets/example_data/profilePicture.jpeg",
        "../../assets/example_data/profilePicture.jpeg",
        "../../assets/example_data/profilePicture.jpeg",
        "../../assets/example_data/profilePicture.jpeg",
        "../../assets/example_data/profilePicture.jpeg"],
      quote: "Elke dag kiten, elke dag gelukkig!",
      location: { long: 51.041462413566286, lat: 3.7301611332870936 } as Location,
      idealDateBars: ["Ventura", "kleine kunst"],
      idealDateRestaurant: ["Golden gai", "Publiek", "Arroy arroy"],
      idealFirstDate: "Een rondleiding in mijn bijentuin",
      email: "lucasvermeulen@gmail.com"
    } as User;
    return of(user);
  }
}

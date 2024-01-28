import { Location } from "./location";
export interface User {
  id: number;
  name: String;
  lastName: String;
  birthDay: Date;
  description: String;
  profilePicture?: String;
  pictures: String[]
  quote: String;
  location: Location;
  idealDateBars: String[];
  idealDateRestaurant: String[];
  idealFirstDate: string;
  email: String;
}

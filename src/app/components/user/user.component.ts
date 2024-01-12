import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'st-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  protected user: User;
  constructor(private userService: UserService) {

  }
  ngOnInit(): void {
    this.userService.getUser().pipe(
      tap((value) => this.user = value)
    ).subscribe()
  }
}

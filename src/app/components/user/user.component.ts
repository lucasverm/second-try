import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { tap } from 'rxjs';
import { ImageGridComponent } from '../../image-grid/image-grid.component';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'st-user',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatTooltipModule,
    ImageGridComponent
  ],
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

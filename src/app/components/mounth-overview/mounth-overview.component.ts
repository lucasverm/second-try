import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { MounthOverview } from '../../models/mounth-overview';
import { FinanceService } from '../../services/user.service';

@Component({
  selector: 'st-mounth-overview',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTabsModule
  ],
  templateUrl: './mounth-overview.component.html',
  styleUrl: './mounth-overview.component.scss'
})
export class MounthOverviewComponent implements OnInit {
  protected mounthOverview: MounthOverview;
  constructor(private financeService: FinanceService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let id: Number = this.route.snapshot.paramMap.get('id') as any as Number;
    this.financeService.getMounthOverview(id).pipe(
      tap((value) => this.mounthOverview = value)
    ).subscribe()
  }
}

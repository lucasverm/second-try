import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MounthOverviewComponent } from './components/mounth-overview/mounth-overview.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'mounth-overiew/1' },
  { path: 'mounth-overiew/:id', component: MounthOverviewComponent }
];

import { Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', component: SigninComponent },
    { path: 'dashboard', component: DashboardComponent },
];

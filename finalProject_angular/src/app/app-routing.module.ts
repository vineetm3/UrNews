import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './_services/auth-guard.service';
import {AdminComponent} from './admin/admin.component';
import {RegisterComponent} from './register/register.component';
import {Role} from './_models/role';
import {HomeComponent} from './home/home.component';
import { PersonalizeComponent } from './personalize/personalize.component';
import { DisplayComponent } from './display/display.component';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'personalize', component: PersonalizeComponent},
  {path: 'display', component: DisplayComponent},
  {path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: [Role.admin]}},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

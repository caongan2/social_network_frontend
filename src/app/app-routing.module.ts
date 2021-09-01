import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {MasterComponent} from "./components/layout/master/master.component";
import {AuthGuard} from "./auth.guard";
import {RegisterComponent} from "./components/register/register.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'admin',
    children: [
      {
        path: 'home',
        component: MasterComponent,
      }
    ],
    canActivate: [AuthGuard]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

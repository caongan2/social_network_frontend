import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {MasterComponent} from "./components/layout/master/master.component";
import {AuthGuard} from "./auth.guard";
import {RegisterComponent} from "./components/register/register.component";
import {UserUpdateProfileComponent} from "./components/users/user-update-profile/user-update-profile.component";
import {ChangePasswordComponent} from "./components/users/change-password/change-password.component";
import {UserProfileComponent} from "./components/users/user-profile/user-profile.component";
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
        children:[
          {
            path: 'posts',
            loadChildren: () => import('./components/post/post.module').then(m => m.PostModule),
            // component: PostListComponent,
          },
          {
            path: ':id/update',
            component: UserUpdateProfileComponent,
          },
          {
            path: 'change-password',
            component: ChangePasswordComponent,
          },
        ]
      },
      {
        path: ':id/profile',
        component: UserProfileComponent
      },
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

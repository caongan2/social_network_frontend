import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserAboutComponent} from "./user-about/user-about.component";
import {UserCreateComponent} from "./user-create/user-create.component";
import {UserFriendComponent} from "./user-friend/user-friend.component";
import {UserListComponent} from "./user-list/user-list.component";
import {UserNavbarComponent} from "./user-navbar/user-navbar.component";
import {UserPhotoComponent} from "./user-photo/user-photo.component";
import {UserProfileBannerComponent} from "./user-profile-banner/user-profile-banner.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {RouterModule, Routes} from "@angular/router";
import { UserSidebarLeftComponent } from './user-sidebar-left/user-sidebar-left.component';
import { UserSidebarRightComponent } from './user-sidebar-right/user-sidebar-right.component';
import { UserUpdateProfileComponent } from './user-update-profile/user-update-profile.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserPostComponent } from './user-post/user-post.component';
import { PersonalPageComponent } from './personal-page/personal-page.component';
import {AngularFireStorageModule} from "@.../storage";
import { AngularFireModule } from "@angular/fire/compat";
import {environment} from "../../../environments/environment";


const routes: Routes = [
  {
    path:'timeline',
    component:UserListComponent,
  },
  {
    path:'about',
    component:UserAboutComponent,
  },
  {
    path:'friend',
    component:UserFriendComponent
  },
  {
    path:'photo',
    component:UserPhotoComponent
  },
   {
    path: 'change-password',
    component: ChangePasswordComponent
  },

];

@NgModule({
  declarations: [
    UserAboutComponent,
    UserCreateComponent,
    UserFriendComponent,
    UserListComponent,
    UserNavbarComponent,
    UserPhotoComponent,
    UserProfileBannerComponent,
    UserProfileComponent,
    UserSidebarLeftComponent,
    UserSidebarRightComponent,
    UserUpdateProfileComponent,
    ChangePasswordComponent,
    UserPostComponent,
    PersonalPageComponent
  ],
  exports: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud")
  ]
})
export class UsersModule { }

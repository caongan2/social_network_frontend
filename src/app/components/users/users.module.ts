import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAboutComponent } from "./user-about/user-about.component";
import { UserCreateComponent } from "./user-create/user-create.component";
import { UserFriendComponent } from "./user-friend/user-friend.component";
import { UserListComponent } from "./user-list/user-list.component";
import { UserNavbarComponent } from "./user-navbar/user-navbar.component";
import { UserPhotoComponent } from "./user-photo/user-photo.component";
import { UserProfileBannerComponent } from "./user-profile-banner/user-profile-banner.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { RouterModule, Routes } from "@angular/router";
import { UserSidebarLeftComponent } from './user-sidebar-left/user-sidebar-left.component';
import { UserSidebarRightComponent } from './user-sidebar-right/user-sidebar-right.component';
import { UserUpdateProfileComponent } from './user-update-profile/user-update-profile.component';
import { ReactiveFormsModule } from "@angular/forms";


const routes: Routes = [
  {
    path: 'timeline',
    component: UserListComponent,
  },
  {
    path: 'about',
    component: UserAboutComponent,
  },
  {
    path: 'friend',
    component: UserFriendComponent
  },
  {
    path: 'photo',
    component: UserPhotoComponent
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
    UserUpdateProfileComponent
  ],
  exports: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

  ]
})
export class UsersModule { }
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MasterComponent } from './components/layout/master/master.component';
import { NarbarComponent } from './components/layout/narbar/narbar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { SidebarLeftComponent } from './components/layout/sidebar-left/sidebar-left.component';
import { SidebarRightComponent } from './components/layout/sidebar-right/sidebar-right.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { LeftMenuComponent } from './components/layout/left-menu/left-menu.component';
import { SectionLeftComponent } from './components/layout/section-left/section-left.component';
import { SectionRightComponent } from './components/layout/section-right/section-right.component';
import { StoryComponent } from './components/layout/story/story.component';
import { LoginComponent } from './components/login/login.component';
import {PostModule} from "./components/post/post.module";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './components/register/register.component';
import {UsersModule} from "./components/users/users.module";
import { ChangePasswordComponent } from './users/change-password/change-password.component';

@NgModule({
    declarations: [
        AppComponent,
        MasterComponent,
        NarbarComponent,
        FooterComponent,
        SidebarLeftComponent,
        SidebarRightComponent,
        HeaderComponent,
        LeftMenuComponent,
        SectionLeftComponent,
        SectionRightComponent,
        StoryComponent,
        LoginComponent,
        RegisterComponent,
        ChangePasswordComponent,

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        PostModule,
        HttpClientModule,
        ReactiveFormsModule,
        UsersModule
    ],
    providers: [],
  exports: [
    StoryComponent,
    SidebarLeftComponent,
    SidebarRightComponent,
  ],
    bootstrap: [AppComponent]
})
export class AppModule { }

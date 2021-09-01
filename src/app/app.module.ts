import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MasterComponent } from './components/layout/master/master.component';
import { NarbarComponent } from './components/layout/narbar/narbar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { SidebarLeftComponent } from './components/layout/sidebar-left/sidebar-left.component';
import { SidebarRightComponent } from './components/layout/sidebar-right/sidebar-right.component';
import { PostCreatComponent } from './components/post/post-creat/post-creat.component';
import { PostListComponent } from './components/post/post-list/post-list.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { LeftMenuComponent } from './components/layout/left-menu/left-menu.component';
import { SectionLeftComponent } from './components/layout/section-left/section-left.component';
import { SectionRightComponent } from './components/layout/section-right/section-right.component';
import { StoryComponent } from './components/layout/story/story.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MasterComponent,
    NarbarComponent,
    FooterComponent,
    SidebarLeftComponent,
    SidebarRightComponent,
    PostCreatComponent,
    PostListComponent,
    HeaderComponent,
    LeftMenuComponent,
    SectionLeftComponent,
    SectionRightComponent,
    StoryComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

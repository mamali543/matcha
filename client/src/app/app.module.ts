import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { Route } from '@angular/router';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NotificationComponent } from './components/notifications/notification/notification.component';
import { HomeComponent } from './components/home/home.component';
import { MatchesComponent } from './components/matches/matches.component';
import { MatcheComponent } from './components/matches/matche/matche.component';
import { UsersService } from './services/users.service';


// const routes: Route = [
//   {path: 'Home', component}
// ]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    NotificationsComponent,
    NotificationComponent,
    HomeComponent,
    MatchesComponent,
    MatcheComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }

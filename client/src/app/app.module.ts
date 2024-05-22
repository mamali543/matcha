import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NotificationComponent } from './components/notifications/notification/notification.component';
import { HomeComponent } from './components/home/home.component';
import { MatchesComponent } from './components/matches/matches.component';
import { MatcheComponent } from './components/matches/matche/matche.component';
import { UsersService } from './services/users.service';
import { ChatComponent } from './components/chat/chat.component';
import { DiscussionComponent } from './components/chat/discussion/discussion.component';
import { ChatService } from './services/chat.service';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { AuthGuard } from './services/auth.guard';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ResetComponent } from './components/reset/reset.component';

const routes: Routes = [
  // {path: '', component: HomeComponent},
  // {path: 'Home', component: HomeComponent},
  // {path: 'Signup', component: SignupComponent},
  // {path: 'Login', component: LoginComponent},
  // {path: 'Matches', component: MatchesComponent},
  // {path: 'Chat', component: ChatComponent},
  // {path: 'Notifications', component: NotificationsComponent},
  // { path: 'layout', component: LayoutComponent }, 
  // { path: '', redirectTo: '/login', pathMatch: 'full' }, 

    {
      path: 'layout',
      component: LayoutComponent,
      canActivate: [AuthGuard], // Apply the guard here
      children: [
        { path: 'Home', component: HomeComponent },
        { path: 'Matches', component: MatchesComponent },
        { path: 'Chat', component: ChatComponent },
        { path: 'Notifications', component: NotificationsComponent },
        { path: '', redirectTo: 'Home', pathMatch: 'full' }, // Default to HomeComponent

      ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'forgotPassword', component: ForgotpasswordComponent },
    // Redirect to 'home' as the default route
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'reset', component: ResetComponent},
];
  

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    NotificationsComponent,
    NotificationComponent,
    HomeComponent,
    MatchesComponent,
    MatcheComponent,
    ChatComponent,
    DiscussionComponent,
    ProfileComponent,
    SignupComponent,
    ForgotpasswordComponent,
    ResetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    RouterModule.forRoot(routes),
    ReactiveFormsModule,    
    HttpClientModule ,// Add HttpClientModule here

  ],
  providers: [UsersService, ChatService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

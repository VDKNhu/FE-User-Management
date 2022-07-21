import { UserService } from './services/user.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GroupUsersComponent } from './components/dashboard/group-users/group-users.component';
import { UserComponent } from './components/dashboard/user/user.component';
import { AddUserComponent } from './components/dialog/add-user/add-user.component';
import { ConfirmDeleteUserComponent } from './components/dialog/confirm-delete-user/confirm-delete-user.component';
import { HeaderComponent } from './shared/header/header.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { titlesReducer } from './state/titles/titles.reducer';
import { usersReducer } from './state/users/users.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UsersEffects } from './state/users/users.effects';
import { EffectsModule } from '@ngrx/effects';

import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
// import { UniqueEmailValidationDirective } from './directives/unique-email-validation.directive';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    GroupUsersComponent,
    UserComponent,
    AddUserComponent,
    ConfirmDeleteUserComponent,
    HeaderComponent,
    // UniqueEmailValidationDirective,
  ],
  imports: [
    HttpClientModule,
    FontAwesomeModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      titles: titlesReducer,
      users: usersReducer,
    }),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    EffectsModule.forRoot([UsersEffects]),
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
    UserService,
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import './rxjs-extensions';

import { AppComponent } from './app.component';
import { ItemListComponent } from './components/item-list.component'
import { DashboardComponent } from './components/dashboard.component'
import { GameComponent } from './components/game.component'
import { MovieComponent } from './components/movie.component'
import { ItemDetailComponent } from './components/item-detail.component'
import { ItemSearchComponent } from './components/item-search.component'
import { ItemReviewComponent } from './components/item-review.component'

import { ItemService } from './_services/item.service'
import { ItemSearchService } from './_services/item-search.service'

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component'

import { AuthGuard } from './_guards/auth.guard';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent, 
    GameComponent,
    MovieComponent,
    ItemDetailComponent,
    ItemListComponent,
    DashboardComponent,
    ItemSearchComponent,
    ItemReviewComponent,
    LoginComponent,
    SignupComponent
  ],
  providers: [
    ItemService,
    ItemSearchService,

    AuthGuard,
    AuthenticationService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

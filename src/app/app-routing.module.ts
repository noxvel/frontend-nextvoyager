import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ItemListComponent } from './components/item-list.component'
import { DashboardComponent } from './components/dashboard.component'
import { GameComponent } from './components/game.component'
import { MovieComponent } from './components/movie.component'
import { ItemDetailComponent } from './components/item-detail.component'
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    { path: 'movies', component: MovieComponent, children:[
          { path: '', component: ItemListComponent},
          { path: ':id', component: ItemDetailComponent}
        ],
      data: { type: "movies"}
    },
    { path: 'games', component: GameComponent, children:[
          { path: '', component: ItemListComponent},
          { path: ':id', component: ItemDetailComponent}
        ],
      data: { type: "games"}
    },
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: '**', redirectTo: '' }
]

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}
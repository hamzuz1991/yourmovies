import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { ProfilComponent } from './dashbord/profil/profil.component';
import { HomeComponent } from './dashbord/home/home.component';
import { CinemaComponent } from './dashbord/cinema/cinema.component';
import { AdminComponent } from './admin/admin.component';
import { HomeadminComponent } from './admin/homeadmin/homeadmin.component';
import { LoginadinComponent } from './admin/loginadin/loginadin.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/accueil',
    pathMatch: 'full'
  }
  ,
  {
    path: 'admin',
    component: CinemaComponent,
    data: { title: 'admin' },
    canActivate : [AdminGuard]  
  },
  {
    path: 'accueil',
    component: AccueilComponent,
    data: { title: 'Accueil' }
  },
  
  {
    path: 'loginadmin',
    component: LoginadinComponent,
  },

  

  {
    path: 'dashbord',
    component: DashbordComponent,
    data: { title: 'Dashbord' },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'profil',
        component: ProfilComponent,
      },
      {
        path: 'home',
        component: HomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { NavbarComponent } from './Accueil/navbar/navbar.component';
import { CarouselComponent } from './Accueil/carousel/carousel.component';
import { LoginnComponent } from './accueil/loginn/loginn.component';
import { RegisterComponent } from './accueil/register/register.component';
import { FooterComponent } from './accueil/footer/footer.component';
import { FilmService } from './film.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { DashbordComponent } from './dashbord/dashbord.component';
import { NavComponent } from './dashbord/nav/nav.component';
import { ProfilComponent } from './dashbord/profil/profil.component';
import { MapComponent } from './dashbord/map/map.component';
import { GetAllService } from './get-all.service';
import { HomeComponent } from './dashbord/home/home.component';
import { UpdateProfilComponent } from './dashbord/update-profil/update-profil.component';
import { CinemaComponent } from './dashbord/cinema/cinema.component';
import { FtrComponent } from './dashbord/ftr/ftr.component';
import { AdminComponent } from './admin/admin.component';
import { HomeadminComponent } from './admin/homeadmin/homeadmin.component';
import { LoginadinComponent } from './admin/loginadin/loginadin.component';
import { WeatherComponent } from './dashbord/weather/weather.component';


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    NavbarComponent,
    CarouselComponent,
    LoginnComponent,
    RegisterComponent,
    FooterComponent,
    DashbordComponent,
    NavComponent,
    ProfilComponent,
    MapComponent,
    HomeComponent,
    UpdateProfilComponent,
    CinemaComponent,
    FtrComponent,
    AdminComponent,
    HomeadminComponent,
    LoginadinComponent,
    WeatherComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    FormsModule,
    AngularFirestoreModule
  ],
  providers: [FilmService, GetAllService],
  bootstrap: [AppComponent]
})
export class AppModule { }

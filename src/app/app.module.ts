import { BrowserModule ,Title} from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import {HttpClientModule, HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AdminHomeComponent } from './Admin/admin-home/admin-home.component';
import { LoginComponent } from './Admin/login/login.component';
import { RegisterComponent } from './Admin/register/register.component';
import {AppHttpInterceptorService} from './services/shared/app-http-interceptor.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/auth-guard.service';
import {EtudiantService} from './services/etudiants/etudiant.service';
import { AjouterFonctionnaireComponent } from './Admin/ajouter-fonctionnaire/ajouter-fonctionnaire.component';
import {ProfsService} from './services/profs/profs.service';
import {ScolariteService} from './services/scolarite/scolarite.service';
import {GuardScolaritieService} from './services/guard-scolaritie.service';
import { ScolaritieLoginComponent } from './Scolaritie/scolaritie-login/scolaritie-login.component';
import { ScolaritieHomeComponent } from './Scolaritie/scolaritie-home/scolaritie-home.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    AdminHomeComponent,
    LoginComponent,
    RegisterComponent,
    AjouterFonctionnaireComponent,
    ScolaritieLoginComponent,
    ScolaritieHomeComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    Title,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptorService ,
      multi: true
    },
    AuthService,
    AuthGuardService,
    EtudiantService,
    ProfsService,
    ScolariteService,
    GuardScolaritieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

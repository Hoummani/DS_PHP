import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from './welcome/welcome.component';
import {LoginComponent} from './Admin/login/login.component';
import {RegisterComponent} from './Admin/register/register.component';
import {AdminHomeComponent} from './Admin/admin-home/admin-home.component';
import {AuthGuardService} from './services/auth-guard.service';
import {AjouterFonctionnaireComponent} from './Admin/ajouter-fonctionnaire/ajouter-fonctionnaire.component';
import {GuardScolaritieService} from './services/guard-scolaritie.service';


const routes: Routes = [
  {path:'' ,pathMatch:'full' ,component:WelcomeComponent},
  {path:'admin/login',component:LoginComponent},
  {path:'admin/register',component:RegisterComponent},
  {path:'admin/home',component:AdminHomeComponent, canActivate:[AuthGuardService]},
  {path:'admin/home/ajouterFoctionnaire',component:AjouterFonctionnaireComponent, canActivate:[AuthGuardService]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

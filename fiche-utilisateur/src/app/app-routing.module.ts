import { PersonnelUgaComponent } from './personnel-uga/personnel-uga.component';
import { FicheRenseignementComponent } from './fiche-renseignement/fiche-renseignement.component';
import { AccueilComponent } from './accueil/accueil.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path : '', component: AccueilComponent},
  { path : 'fiche-renseignement', component: FicheRenseignementComponent},
  { path : 'personnels', component: PersonnelUgaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

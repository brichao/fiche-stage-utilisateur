import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { FicheRenseignementComponent } from './fiche-renseignement/fiche-renseignement.component';
import { PersonnelUgaComponent } from './personnel-uga/personnel-uga.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    FicheRenseignementComponent,
    PersonnelUgaComponent,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatButtonModule,
    AppRoutingModule
  ],
  providers: [MatToolbarModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

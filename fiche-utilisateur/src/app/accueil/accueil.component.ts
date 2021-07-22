import { ExtractionPdfComponent } from './../extraction-pdf/extraction-pdf.component';
import { DataService } from './../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent{

  constructor(private router: Router, private dataService: DataService, private dialogue: MatDialog) { }

  //Formulaire pour chercher une fiche de renseignement
  formRecherche= new FormGroup({
    recherche: new FormGroup({
      nom: new FormControl('', [
        Validators.required
      ]),
      prenom: new FormControl('', [
        Validators.required
      ])
    })
  })

  get nom(){
    return this.formRecherche.get("recherche.nom");
  }

  get prenom(){
    return this.formRecherche.get("recherche.prenom");
  }

  validerRecherche(): void {
    const nomComplet: string[] = [this?.nom?.value, this?.prenom?.value];
    this.dataService.sendData(nomComplet);
    this.router.navigate(['recherche-fiche']);
  }

  extrairePdf(): void {
    let dialogRef = this.dialogue.open(ExtractionPdfComponent, {
      width: '2000px',
      data: {
              nom: this?.nom?.value,
              prenom: this?.prenom?.value
      }
    });
  }
}

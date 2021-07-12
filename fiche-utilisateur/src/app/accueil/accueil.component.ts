import { DataService } from './../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent{

  constructor(private router: Router, private dataService: DataService) { }

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
}

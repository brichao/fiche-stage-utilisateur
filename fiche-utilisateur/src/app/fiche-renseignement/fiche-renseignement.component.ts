import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-fiche-renseignement',
  templateUrl: './fiche-renseignement.component.html',
  styleUrls: ['./fiche-renseignement.component.scss']
})
export class FicheRenseignementComponent{

  affiliationDefaut:string ='ayant droit';
  caisseAssuranceDefaut:string = 'CPAM';

  constructor() { }

  formEtudiant = new FormGroup({
    etudiant : new FormGroup({
      nom : new FormControl('', [
        Validators.required
      ]),
      prenom : new FormControl('', [
        Validators.required
      ]),
      numEtudiant : new FormControl('',[
        Validators.required,
        Validators.pattern("^[0-9]{8}$")
      ]),
      numPortable : new FormControl('',[
        Validators.required,
        Validators.pattern("^[0-9]{10}")
      ]),
      mail : new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-zA-Z]+.[a-zA-Z]+@etu.univ-grenoble-alpes.fr")
      ]),
      adresse : new FormControl('',[
        Validators.required
      ]),
      affiliation : new FormControl('',[
        Validators.required
      ]),
      caisseAssurance : new FormControl('',[
        Validators.required
      ])
    })
  })

  get nom(){
    return this.formEtudiant.get('etudiant.nom');
  }

  get prenom(){
    return this.formEtudiant.get('etudiant.prenom');
  }

  get numEtudiant(){
    return this.formEtudiant.get('etudiant.numEtudiant');
  }

  get numPortable(){
    return this.formEtudiant.get('etudiant.numPortable');
  }

  get mail(){
    return this.formEtudiant.get('etudiant.mail');
  }

  get adresse(){
    return this.formEtudiant.get('etudiant.adresse');
  }

  get affiliation(){
    return this.formEtudiant.get('etudiant.affiliation');
  }

  get caisseAssurance(){
    return this.formEtudiant.get('etudiant.caisseAssurance');
  }

  validerEtudiant(): void{

  }
}

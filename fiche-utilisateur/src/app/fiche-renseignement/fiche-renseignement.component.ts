import { Etudiants, Entreprises, ServicesGestion, Tuteurs, Adresses } from './../../classes';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-fiche-renseignement',
  templateUrl: './fiche-renseignement.component.html',
  styleUrls: ['./fiche-renseignement.component.scss']
})
export class FicheRenseignementComponent{

  private etudiant: Etudiants | null = null;
  private entreprise : Entreprises | null = null;
  private serviceGestion : ServicesGestion | null = null;
  private tuteur : Tuteurs | null = null;
  private adresseObject : Adresses | null = null;

  affiliationDefaut:string = 'ayant droit';
  caisseAssuranceDefaut:string = 'CPAM';
  disponibiliteDefaut:string = 'importante';

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
    console.log(this.etudiant);
    this.etudiant = {
      nom : this?.nom?.value,
      prenom : this?.prenom?.value,
      numEtudiant : this?.numEtudiant?.value,
      numPortable : this?.numPortable?.value,
      mail : this?.mail?.value,
      adresse : this?.adresse?.value,
      typeAffiliation : this?.affiliation?.value,
      caisseAssurance : this?.caisseAssurance?.value
    }
  }



  formEntreprise = new FormGroup({
    entreprise : new FormGroup({
      raisonSociale : new FormControl('',[
        Validators.required
      ]),
      representantLegal : new FormControl('',[
        Validators.required
      ]),
      fonction : new FormControl('',[
        Validators.required
      ]),
      numSiret : new FormControl('',[
        Validators.required,
        Validators.pattern("[0-9]*$")
      ]),
      codeApe : new FormControl(''),
      domaineActivite : new FormControl('',[
        Validators.required
      ]),
      effectif : new FormControl('',[
        Validators.required,
        Validators.pattern("[0-9]*$")
      ]),
      adresseEntreprise : new FormControl('',[
        Validators.required
      ]),
      codePostal : new FormControl('',[
        Validators.required,
        Validators.pattern("[0-9]{5}$")
      ]),
      ville : new FormControl('',[
        Validators.required
      ]),
      pays : new FormControl('',[
        Validators.required
      ]),
      serviceAccueil : new FormControl('',[
        Validators.required
      ])
    })
  })

  get raisonSociale(){
    return this.formEntreprise.get('entreprise.raisonSociale');
  }

  get representantLegal(){
    return this.formEntreprise.get('entreprise.representantLegal');
  }

  get fonction(){
    return this.formEntreprise.get('entreprise.fonction');
  }

  get numSiret(){
    return this.formEntreprise.get('entreprise.numSiret');
  }

  get codeApe(){
    return this.formEntreprise.get('entreprise.codeApe');
  }

  get domaineActivite(){
    return this.formEntreprise.get('entreprise.domaineActivite');
  }

  get effectif(){
    return this.formEntreprise.get('entreprise.effectif');
  }

  get adresseEntreprise(){
    return this.formEntreprise.get('entreprise.adresseEntreprise');
  }

  get codePostal(){
    return this.formEntreprise.get('entreprise.codePostal');
  }

  get ville(){
    return this.formEntreprise.get('entreprise.ville');
  }

  get pays(){
    return this.formEntreprise.get('entreprise.pays');
  }

  get serviceAccueil(){
    return this.formEntreprise.get('entreprise.serviceAccueil');
  }

  validerEntreprise(): void{
    console.log(this.adresseObject);
    this.adresseObject = {
      adresse : this?.adresseEntreprise?.value,
      codePostal : this?.codePostal?.value,
      ville : this?.ville?.value,
      pays : this?.pays?.value
    }

    console.log(this.entreprise);
    this.entreprise = {
      raisonSociale : this?.raisonSociale?.value,
      representantLegal : this?.representantLegal?.value,
      fonction : this?.fonction?.value,
      numeroSiret : this?.numSiret?.value,
      codeApe : this?.codeApe?.value,
      domaineActivite : this?.domaineActivite?.value,
      effectif : this?.effectif?.value,
      serviceAccueil : this?.serviceAccueil?.value,
      adresse : this.adresseObject
    }
  }

  formServiceGestion = new FormGroup({
    serviceGestion : new FormGroup({
      nomService : new FormControl('', [
        Validators.required
      ]),
      prenomService : new FormControl('', [
        Validators.required
      ]),
      numPortableService : new FormControl('',[
        Validators.required,
        Validators.pattern("^[0-9]{10}")
      ]),
      mailService : new FormControl('',[
        Validators.required
      ]),
      adresseService : new FormControl('',[
        Validators.required
      ])
    })
  })

  get nomService(){
    return this.formServiceGestion.get('serviceGestion.nomService');
  }

  get prenomService(){
    return this.formServiceGestion.get('serviceGestion.prenomService');
  }

  get numPortableService(){
    return this.formServiceGestion.get('serviceGestion.numPortableService');
  }

  get mailService(){
    return this.formServiceGestion.get('serviceGestion.mailService');
  }

  get adresseService(){
    return this.formServiceGestion.get('serviceGestion.adresseService');
  }

  validerServiceGestion(): void{
    console.log(this.serviceGestion);
    this.serviceGestion = {
      nom : this?.nomService?.value,
      prenom : this?.prenomService?.value,
      numeroTel : this?.numPortableService?.value,
      mail : this?.mailService?.value,
      adresse : this?.adresseService?.value
    }
  }


  formTuteur = new FormGroup({
    tuteur : new FormGroup({
      nomTuteur : new FormControl('', [
        Validators.required
      ]),
      prenomTuteur : new FormControl('', [
        Validators.required
      ]),
      fonctionTuteur : new FormControl('', [
        Validators.required
      ]),
      serviceTuteur : new FormControl('', [
        Validators.required
      ]),
      numPortableTuteur : new FormControl('',[
        Validators.required,
        Validators.pattern("^[0-9]{10}")
      ]),
      mailTuteur : new FormControl('',[
        Validators.required
      ]),
      adresseTuteur : new FormControl('',[
        Validators.required
      ]),
      disponibiliteTuteur : new FormControl('',[
        Validators.required
      ])
    })
  })

  get nomTuteur(){
    return this.formTuteur.get('tuteur.nomTuteur');
  }

  get prenomTuteur(){
    return this.formTuteur.get('tuteur.prenomTuteur');
  }

  get fonctionTuteur(){
    return this.formTuteur.get('tuteur.fonctionTuteur');
  }

  get serviceTuteur(){
    return this.formTuteur.get('tuteur.serviceTuteur');
  }

  get numPortableTuteur(){
    return this.formTuteur.get('tuteur.numPortableTuteur');
  }

  get mailTuteur(){
    return this.formTuteur.get('tuteur.mailTuteur');
  }

  get adresseTuteur(){
    return this.formTuteur.get('tuteur.adresseTuteur');
  }

  get disponibiliteTuteur(){
    return this.formTuteur.get('tuteur.disponibiliteTuteur');
  }

  validerTuteur(): void{
    console.log(this.tuteur);
    this.tuteur = {
      nom : this?.nomTuteur?.value,
      prenom : this?.prenomTuteur?.value,
      fonction : this?.fonctionTuteur?.value,
      service : this?.serviceTuteur?.value,
      numTelephone : this?.numPortableTuteur?.value,
      mail : this?.mailTuteur?.value,
      adresse : this?.adresseTuteur?.value,
      disponibilite : this?.disponibiliteTuteur?.value
    }
  }
}

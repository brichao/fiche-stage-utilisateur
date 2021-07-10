import { InfosStageService } from './../services/infos-stage.service';
import { TuteurService } from './../services/tuteur.service';
import { ServiceGestionService } from './../services/service-gestion.service';
import { EntrepriseService } from './../services/entreprise.service';
import { EtudiantService } from './../services/etudiant.service';
import { Etudiants, Entreprises, ServicesGestion, Tuteurs, Adresses, infosStage } from './../../classes';
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
  private infoStage: infosStage | null = null;

  affiliationDefaut:string = 'ayant droit';
  caisseAssuranceDefaut:string = 'CPAM';
  disponibiliteDefaut:string = 'importante';
  confidentialiteDefaut: boolean = true;
  gratificationShow: boolean = false;
  versementDefaut: string = 'Chèque';


  minDate = new Date();
  maxDate = new Date(2024, 8, 1);

  etudiantValide: boolean = false;
  entrepriseValide: boolean = false;
  serviceGestionValide: boolean = false;
  tuteurValide: boolean = false;
  infoStageValide: boolean = false;

  constructor(private etudiantService: EtudiantService, private entrepriseService: EntrepriseService, private gestionService: ServiceGestionService,
    private tuteurService: TuteurService, private infosStageService: InfosStageService) { }

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
        Validators.pattern("^[a-zA-Z-]+\.[a-zA-Z\.-]+@etu.univ-grenoble-alpes.fr")
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
    this.etudiantService.addEtudiant(this.etudiant).subscribe(etudiant => console.log(etudiant));
    this.etudiantValide = true;
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
    this.adresseObject = {
      adresse : this?.adresseEntreprise?.value,
      codePostal : this?.codePostal?.value,
      ville : this?.ville?.value,
      pays : this?.pays?.value
    }
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
    this.entrepriseService.addEntreprise(this.entreprise).subscribe(entreprise => console.log(entreprise));
    this.entrepriseValide = true;
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
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9-_\.]+@[a-zA-Z0-9-_\.]+\.[a-zA-Z]{2,5}$")
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
    this.serviceGestion = {
      nom : this?.nomService?.value,
      prenom : this?.prenomService?.value,
      numeroTel : this?.numPortableService?.value,
      mail : this?.mailService?.value,
      adresse : this?.adresseService?.value
    }
    this.gestionService.addServiceGestion(this.serviceGestion).subscribe(servicegestion => console.log(servicegestion));
    this.serviceGestionValide = true;
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
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9-_\.]+@[a-zA-Z0-9-_\.]+\.[a-zA-Z]{2,5}$")
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
    this.tuteurService.addTuteur(this.tuteur).subscribe(tuteur => console.log(tuteur));
    this.tuteurValide = true;
  }

  formInfosStage = new FormGroup({
    infoStage : new FormGroup({
      dateDebutPartiel : new FormControl(''),
      dateFinPartiel : new FormControl(''),
      dateDebutPlein : new FormControl(new Date(2021,4,25)),
      dateFinPlein : new FormControl('', [
        Validators.required
      ]),
      dateDebutInterruption : new FormControl(''),
      dateFinInterruption : new FormControl(''),
      nbHeures : new FormControl('', [
        Validators.required,
        Validators.pattern("^[0-9]+")
      ]),
      gratification : new FormControl('', [
        Validators.required
      ]),
      montantGratification : new FormControl('', [
        Validators.pattern("^[0-9.]+")
      ]),
      versementGratification : new FormControl(''),
      laboratoireUGA : new FormControl(''),
      avantages : new FormControl(''),
      confidentialite : new FormControl('',[
        Validators.required
      ]),
      titre : new FormControl('',[
        Validators.required
      ]),
      description : new FormControl('',[
        Validators.required
      ]),
      objectifs : new FormControl('',[
        Validators.required
      ]),
      taches : new FormControl('',[
        Validators.required
      ]),
      details : new FormControl('',[
        Validators.required
      ])
    })
  })

  get dateDebutPartiel(){
    return this.formInfosStage.get('infoStage.dateDebutPartiel');
  }

  get dateFinPartiel(){
    return this.formInfosStage.get('infoStage.dateFinPartiel');
  }

  get dateDebutPlein(){
    return this.formInfosStage.get('infoStage.dateDebutPlein');
  }

  get dateFinPlein(){
    return this.formInfosStage.get('infoStage.dateFinPlein');
  }

  get dateDebutInterruption(){
    return this.formInfosStage.get('infoStage.dateDebutInterruption');
  }

  get dateFinInterruption(){
    return this.formInfosStage.get('infoStage.dateFinInterruption');
  }

  get nbHeures(){
    return this.formInfosStage.get('infoStage.nbHeures');
  }

  get gratification(){
    return this.formInfosStage.get('infoStage.gratification');
  }

  get montantGratification(){
    return this.formInfosStage.get('infoStage.montantGratification');
  }

  get versementGratification(){
    return this.formInfosStage.get('infoStage.versementGratification');
  }

  get laboratoireUGA(){
    return this.formInfosStage.get('infoStage.laboratoireUGA');
  }

  get avantages(){
    return this.formInfosStage.get('infoStage.avantages');
  }

  get confidentialite(){
    return this.formInfosStage.get('infoStage.confidentialite');
  }

  get titre(){
    return this.formInfosStage.get('infoStage.titre');
  }

  get description(){
    return this.formInfosStage.get('infoStage.description');
  }

  get objectifs(){
    return this.formInfosStage.get('infoStage.objectifs');
  }

  get taches(){
    return this.formInfosStage.get('infoStage.taches');
  }

  get details(){
    return this.formInfosStage.get('infoStage.details');
  }

  validerInfosStage(): void{
    this.infoStage = {
      dateDebutPartiel : this?.dateDebutPartiel?.value,
      dateFinPartiel : this?.dateFinPartiel?.value,
      dateDebutPlein : this?.dateDebutPlein?.value,
      dateFinPlein : this?.dateFinPlein?.value,
      dateDebutInterruption : this?.dateDebutInterruption?.value,
      dateFinInterruption : this?.dateFinInterruption?.value,
      nbHeures : this?.nbHeures?.value,
      gratification : this?.gratification?.value,
      montantGratification : this?.montantGratification?.value,
      versementGratification : this?.versementGratification?.value,
      laboratoireUGA : this?.laboratoireUGA?.value,
      avantages : this?.avantages?.value,
      confidentialite : this?.confidentialite?.value,
      titre : this?.titre?.value,
      description : this?.description?.value,
      objectifs : this?.objectifs?.value,
      taches : this?.taches?.value,
      details : this?.details?.value
    }

    this.infosStageService.addInfosStage(this.infoStage).subscribe(infoStage => console.log(infoStage));
    this.infoStageValide = true;
  }

}

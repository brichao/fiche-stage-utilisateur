import { Adresses, Entreprises, FicheRenseignement, infosStage, ServicesGestion, Tuteurs } from './../../classes';
import { DataService } from './../services/data.service';
import { Etudiants } from 'src/classes';
import { FicheRenseignementService } from '../services/fiche-renseignement.service';
import { Component, OnInit } from '@angular/core';
import { EntrepriseService } from '../services/entreprise.service';
import { EtudiantService } from '../services/etudiant.service';
import { InfosStageService } from '../services/infos-stage.service';
import { ServiceGestionService } from '../services/service-gestion.service';
import { TuteurService } from '../services/tuteur.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';


//Format des dates en français
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};


@Component({
  selector: 'app-recherche-fiche',
  templateUrl: './recherche-fiche.component.html',
  styleUrls: ['./recherche-fiche.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class RechercheFicheComponent implements OnInit {

  messageError: string = '';
  rechercheSucces: boolean = false;
  nom: string = '';
  prenom: string = '';
  fiche: FicheRenseignement | null = null;

  etudiant: Etudiants | null = null;
  entreprise : Entreprises | null = null;
  serviceGestion : ServicesGestion | null = null;
  tuteur : Tuteurs | null = null;
  private adresseObject : Adresses | null = null;
  infoStage: infosStage | null = null;

  disponibiliteDefaut:string = 'importante';
  confidentialiteDefaut: boolean = true;
  gratificationShow: boolean = false;
  versementDefaut: string = 'Chèque';

  minDate = new Date(2021, 5, 25);
  maxDate = new Date(2024, 8, 1);

  entrepriseValide: boolean = false;
  serviceGestionValide: boolean = false;
  tuteurValide: boolean = false;
  infoStageValide: boolean = false;

  errorMessageEntreprise: string = "";
  errorMessageService: string = "";
  errorMessageTuteur: string = "";
  errorMessageInfos: string = "";

  infos: string ="";
  raison: string ="";
  //Injection de tous les services de chaque partie du formulaire pour avoir accèsaux méthodes CRUD
  constructor(private ficheService: FicheRenseignementService, private dataService: DataService, private etudiantService: EtudiantService,
     private entrepriseService: EntrepriseService, private gestionService: ServiceGestionService, private tuteurService: TuteurService,
     private infosStageService: InfosStageService) { }

  ngOnInit(): void {
    this.dataService.nomPrenom$.subscribe(
      data => { this.nom = data[0],
                this.prenom = data[1]}
    );

    this.ficheService.getFiche(this.nom, this.prenom).subscribe(
      fiche => { this.fiche = fiche,
                  this.rechercheSucces = true,
                  this.etudiant = this.fiche.etudiant,
                  this.entreprise = this.fiche.etablissement,
                  this.serviceGestion = this.fiche.serviceGestion,
                  this.tuteur = this.fiche.tuteur,
                  this.infoStage = this.fiche.infosStage},
      error => { this.messageError = error,
                  this.rechercheSucces = false;
      }
    );
  }



  /***********************************************************************************************************************************************
   * ***********************************************   ENTREPRISE     ****************************************************************************
   * *********************************************************************************************************************************************
   * *********************************************************************************************************************************************/
  //Formulaire entreprise avec les validateurs
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

  //Méthodes de récupération des données saisies dans la partie entreprise
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

  //Construction de l'objet entreprise et insertion dans la base de données, avec messages d'erreurs dans le cas où l'envoie échoue
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
      adresse : this.adresseObject,
      nomEtudiant : this.etudiant?.nom!,
      prenomEtudiant : this.etudiant?.prenom!
    }
    this.entrepriseService.addEntreprise(this.entreprise).subscribe(
      entreprise => { console.log(entreprise),
        this.entrepriseValide=true},
      error => { this.errorMessageEntreprise = error,
        this.entrepriseValide=false}
    );
  }


  /***********************************************************************************************************************************************
   * ***********************************************   SERVICE DE GESTION     ********************************************************************
   * *********************************************************************************************************************************************
   * *********************************************************************************************************************************************/
  //Formulaire service de gestion avec les validateurs
  formServiceGestion = new FormGroup({
    serviceGestion : new FormGroup({
      nomService : new FormControl(this.serviceGestion?.nom, [
        Validators.required
      ]),
      prenomService : new FormControl(this.serviceGestion?.prenom, [
        Validators.required
      ]),
      numPortableService : new FormControl(this.serviceGestion?.numeroTel,[
        Validators.required,
        Validators.pattern("^[0-9]{10}")
      ]),
      mailService : new FormControl(this.serviceGestion?.mail,[
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9-_\.]+@[a-zA-Z0-9-_\.]+\.[a-zA-Z]{2,5}$")
      ]),
      adresseService : new FormControl(this.serviceGestion?.adresse,[
        Validators.required
      ])
    })
  })

  //Méthodes de récupération des données saisies dans la partie service de gestion
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

  //Construction de l'objet service de gestion et insertion dans la base de données, avec messages d'erreurs dans le cas où l'envoie échoue
  validerServiceGestion(): void{
    this.serviceGestion = {
      nom : this?.nomService?.value,
      prenom : this?.prenomService?.value,
      numeroTel : this?.numPortableService?.value,
      mail : this?.mailService?.value,
      adresse : this?.adresseService?.value,
      nomEtudiant : this.etudiant?.nom!,
      prenomEtudiant : this.etudiant?.prenom!
    }
    this.gestionService.addServiceGestion(this.serviceGestion).subscribe(
      servicegestion => { console.log(servicegestion),
        this.serviceGestionValide = true},
      error => { this.errorMessageService = error,
        this.serviceGestionValide = false}
    );
  }


  /***********************************************************************************************************************************************
   * ***********************************************   TUTEUR     ********************************************************************************
   * *********************************************************************************************************************************************
   * *********************************************************************************************************************************************/
  //Formulaire tuteur avec les validateurs
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

  //Méthodes de récupération des données saisies dans la partie tuteur
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

  //Construction de l'objet tuteur et insertion dans la base de données, avec messages d'erreurs dans le cas où l'envoie échoue
  validerTuteur(): void{
    this.tuteur = {
      nom : this?.nomTuteur?.value,
      prenom : this?.prenomTuteur?.value,
      fonction : this?.fonctionTuteur?.value,
      service : this?.serviceTuteur?.value,
      numTelephone : this?.numPortableTuteur?.value,
      mail : this?.mailTuteur?.value,
      adresse : this?.adresseTuteur?.value,
      disponibilite : this?.disponibiliteTuteur?.value,
      nomEtudiant : this.etudiant?.nom!,
      prenomEtudiant : this.etudiant?.prenom!
    }
    this.tuteurService.addTuteur(this.tuteur).subscribe(
      tuteur => { console.log(tuteur),
        this.tuteurValide = true},
      error => { this.errorMessageTuteur = error,
        this.tuteurValide = false}
    );
  }


  /***********************************************************************************************************************************************
   * ***********************************************   INFORMATIONS DU STAGE     *****************************************************************
   * *********************************************************************************************************************************************
   * *********************************************************************************************************************************************/
  //Formulaire informations de stage avec les validateurs
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

  //Méthodes de récupération des données saisies dans la partie informations de stage
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

  //Construction de l'objet informations de stage et insertion dans la base de données, avec messages d'erreurs dans le cas où l'envoie échoue
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
      details : this?.details?.value,
      nomEtudiant : this.etudiant?.nom!,
      prenomEtudiant : this.etudiant?.prenom!
    }

    this.infosStageService.addInfosStage(this.infoStage).subscribe(
      infoStage => { console.log(infoStage),
        this.infoStageValide = true},
      error => { this.errorMessageInfos = error,
        this.infoStageValide = false}
    );
  }

}

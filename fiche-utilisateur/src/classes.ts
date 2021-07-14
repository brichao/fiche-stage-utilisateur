//Définition des interfaces de chaque schéma dans la BD, assurer l'intégrité
export interface Etudiants{
  nom: string;
  prenom: string;
  numEtudiant: number;
  numPortable: number;
  mail: string;
  adresse: string;
  typeAffiliation: string;
  caisseAssurance: string;
}

export interface Adresses{
  adresse: string;
  codePostal: number;
  ville: string;
  pays: string;
}

export interface Entreprises{
  raisonSociale: string;
  representantLegal: string;
  fonction: string;
  numeroSiret: number;
  codeApe: string;
  domaineActivite: string;
  effectif: number;
  adresse: Adresses;
  serviceAccueil: string;
  nomEtudiant: string;
  prenomEtudiant: string;
}

export interface ServicesGestion{
  nom: string;
  prenom: string;
  numeroTel: number;
  mail: string;
  adresse: string;
  nomEtudiant: string;
  prenomEtudiant: string;
}

export interface Tuteurs{
  nom: string;
  prenom: string;
  fonction: string;
  service: string;
  numTelephone: number;
  mail: string;
  adresse: string;
  disponibilite: string;
  nomEtudiant: string;
  prenomEtudiant: string;
}

export interface infosStage{
  dateDebutPartiel: Date;
  dateFinPartiel: Date;
  dateDebutPlein: Date;
  dateFinPlein: Date;
  dateDebutInterruption: Date;
  dateFinInterruption: Date;
  nbHeures: number;
  gratification: boolean;
  montantGratification: number;
  versementGratification: string;
  laboratoireUGA: string;
  avantages: string;
  confidentialite: boolean;
  titre: string;
  description: string;
  objectifs: string;
  taches: string;
  details: string;
  nomEtudiant: string;
  prenomEtudiant: string;
}

export interface FicheRenseignement{
  etudiant: Etudiants;
  etablissement : Entreprises;
  serviceGestion: ServicesGestion;
  tuteur: Tuteurs;
  infosStage: infosStage;
}

export interface Utilisateur{
  mail: string;
  motDePasse: string;
  token?: string;
}

export interface DialogData{
  nom: string;
  prenom: string;
}

export interface EmailData{
  mailEtudiant: string;
  mailTuteur: string;
  messageRefus: string;
}

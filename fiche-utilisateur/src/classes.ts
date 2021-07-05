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
}

export interface ServicesGestion{
  nom: string;
  prenom: string;
  numeroTel: number;
  mail: string;
  adresse: string;
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
}

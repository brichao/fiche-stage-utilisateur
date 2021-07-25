import { VisualisationPdfComponent } from './../visualisation-pdf/visualisation-pdf.component';
import { EnvoieMailService } from './../services/envoie-mail.service';
import { FicheRenseignement, EmailData } from './../../classes';
import { MatDialog } from '@angular/material/dialog';
import { FicheRenseignementService } from './../services/fiche-renseignement.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personnel-uga',
  templateUrl: './personnel-uga.component.html',
  styleUrls: ['./personnel-uga.component.scss']
})
export class PersonnelUgaComponent implements OnInit {

  listeFiches: FicheRenseignement[] = [];
  mailInfos: EmailData | null = null;

  constructor(private ficheService: FicheRenseignementService, private dialogue: MatDialog, private mailService: EnvoieMailService) {}

  ngOnInit(): void {
    this.ficheService.getFicheAll().subscribe(
      listeFiches => this.listeFiches = listeFiches
    );
  }

  visualiserFiche(nomEtudiant: string, prenomEtudiant: string): void{
    let dialogRef = this.dialogue.open(VisualisationPdfComponent, {
      width: '2000px',
      data: {
              nom: nomEtudiant,
              prenom: prenomEtudiant
      }
    });
  }

  refuserFiche(mailEtudiant: string, mailTuteur: string, messageRefus: string, indice: number){
    if(messageRefus !== ''){
      this.mailInfos = {
        mailEtudiant: mailEtudiant,
        mailTuteur: mailTuteur,
        messageRefus: messageRefus
      }

      console.log(this.mailInfos);
      this.mailService.envoieMail(this.mailInfos).subscribe(
        data => { console.log(data),
                  this.listeFiches[indice].ficheValidee = 2,
                  this.ficheService.updateFiche(this.listeFiches[indice]).subscribe(
                    data =>  console.log(data),
                    error => console.log(error)
                  )},
        error => { console.log(error),
                  this.listeFiches[indice].ficheValidee = 0}
      );
    } else {
      console.log("Impossible de refuser, pas de motif !");
    }
  }

  validerFiche(mailEtudiant: string, indice: number){
    this.mailInfos = {
      mailEtudiant: mailEtudiant,
      mailTuteur: '',
      messageRefus: ''
    }

    this.mailService.envoieMailValidation(this.mailInfos).subscribe(
      data => {console.log(data),
              this.listeFiches[indice].ficheValidee = 1,
              console.log("Fiche de renseignements validation : " + this.listeFiches[indice].ficheValidee),
              this.ficheService.updateFiche(this.listeFiches[indice]).subscribe(
                data =>  console.log(data),
                error => console.log(error)
              )},
      error => {console.log(error),
              this.listeFiches[indice].ficheValidee = 0}
    );

  }

}

import { Observable, of } from 'rxjs';
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
  boutonValide: boolean = false;
  boutonRefuse: boolean = false;

  constructor(private ficheService: FicheRenseignementService, private dialogue: MatDialog, private mailService: EnvoieMailService) { }

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

  refuserFiche(mailEtudiant: string, mailTuteur: string, messageRefus: string){
    this.mailInfos = {
      mailEtudiant: mailEtudiant,
      mailTuteur: mailTuteur,
      messageRefus: messageRefus
    }

    console.log(this.mailInfos);
    this.mailService.envoieMail(this.mailInfos).subscribe(
      data => { console.log(data),
                this.boutonRefuse= true},
      error => { console.log(error),
                 this.boutonRefuse = false}
    );
  }

  validerFiche(mailEtudiant: string){
    this.mailInfos = {
      mailEtudiant: mailEtudiant,
      mailTuteur: '',
      messageRefus: ''
    }

    this.mailService.envoieMailValidation(this.mailInfos).subscribe(
      data => {console.log(data),
              this.boutonValide = true},
      error => {console.log(error),
              this.boutonValide = false}
    )
  }

}

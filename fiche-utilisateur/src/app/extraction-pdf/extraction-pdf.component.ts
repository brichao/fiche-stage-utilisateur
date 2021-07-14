import { FicheRenseignementService } from './../services/fiche-renseignement.service';
import { DialogData, FicheRenseignement } from './../../classes';
import { DataService } from './../services/data.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-extraction-pdf',
  templateUrl: './extraction-pdf.component.html',
  styleUrls: ['./extraction-pdf.component.scss']
})
export class ExtractionPdfComponent implements OnInit {

  fiche: FicheRenseignement | null = null;
  messageErreur: string = "";
  rechercheSucces: boolean = false;

  constructor(private dataService: DataService, private ficheService: FicheRenseignementService,
    public dialogRef: MatDialogRef<ExtractionPdfComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.ficheService.getFiche(this.data.nom, this.data.prenom).subscribe(
      fiche => { this.fiche = fiche,
                 this.rechercheSucces = true},
      error => { this.messageErreur = "La fiche de renseignement n'existe pas, merci de créer une nouvelle.",
                 this.rechercheSucces = false}
    );

  }

  fermerDialogue(): void{
    this.dialogRef.close();
  }

  extractionPdf(){
    const element = document.getElementById('htmlPDF');
    const options = {
      filename: this.fiche?.etudiant?.nom + '_' + this.fiche?.etudiant?.prenom + '_fiche.pdf',
      image : { type : 'jpeg'},
      html2canvas: { },
      jsPDF : { orientation:'portrait'}
    }
    html2pdf().from(element).set(options).save();
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FicheRenseignement, DialogData } from 'src/classes';
import { ExtractionPdfComponent } from '../extraction-pdf/extraction-pdf.component';
import { FicheRenseignementService } from '../services/fiche-renseignement.service';

@Component({
  selector: 'app-suppression-fiche',
  templateUrl: './suppression-fiche.component.html',
  styleUrls: ['./suppression-fiche.component.scss']
})
export class SuppressionFicheComponent implements OnInit {

  messageErreur: string = "";
  rechercheSucces: boolean = false;

  constructor(private ficheService: FicheRenseignementService,
    public dialogRef: MatDialogRef<SuppressionFicheComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.ficheService.deleteFiche(this.data.nom, this.data.prenom).subscribe(
      succes => this.rechercheSucces = true,
      error => { this.messageErreur = error,
                  this.rechercheSucces = false}
    )
  }

  fermerDialogue(): void{
    this.dialogRef.close();
  }
}

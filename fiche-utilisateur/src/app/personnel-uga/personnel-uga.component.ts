import { MatPaginator } from '@angular/material/paginator';
import { VisualisationPdfComponent } from './../visualisation-pdf/visualisation-pdf.component';
import { EnvoieMailService } from './../services/envoie-mail.service';
import { FicheRenseignement, EmailData } from './../../classes';
import { MatDialog } from '@angular/material/dialog';
import { FicheRenseignementService } from './../services/fiche-renseignement.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-personnel-uga',
  templateUrl: './personnel-uga.component.html',
  styleUrls: ['./personnel-uga.component.scss']
})
export class PersonnelUgaComponent implements OnInit {

  listeFiches: FicheRenseignement[] = [];
  mailInfos: EmailData | null = null;
  colonnesTableau: string[] = ['dateDeCreation', 'etudiant.nom', 'etudiant.prenom', 'Visualisation', 'Valider', 'Refuser', 'ficheValidee'];
  dataSource!: MatTableDataSource<FicheRenseignement>;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  constructor(private ficheService: FicheRenseignementService, private dialogue: MatDialog, private mailService: EnvoieMailService,
              private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.ficheService.getFicheAll().subscribe(
      listeFiches => {this.listeFiches = listeFiches,
                      this.dataSource = new MatTableDataSource<FicheRenseignement>(this.listeFiches),
                      this.cdr.detectChanges(),
                      this.dataSource.paginator = this.paginator,
                      this.dataSource.sortingDataAccessor = (item, property) => {
                        switch(property) {
                          case 'etudiant.nom': return item.etudiant.nom;
                          case 'etudiant.prenom': return item.etudiant.prenom;
                          default: return item[property];
                        }
                      }
                      this.dataSource.sort = this.sort,
                      this.dataSource.filterPredicate =
                        (data: FicheRenseignement, filter: string) => {
                          const colonneNom = data.etudiant.nom;
                          const customFilter = colonneNom.toLowerCase().includes(filter);
                          return customFilter;
                        }}
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

  filtrer(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

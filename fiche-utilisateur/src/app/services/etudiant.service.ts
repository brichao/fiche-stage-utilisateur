import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etudiants } from 'src/classes';

@Injectable({
  providedIn: 'root'
})
//Cette classe est un service qui nous permettra d'utiliser ses fonctions dans tout le projet
export class EtudiantService {

  //Déclaration de l'url du serveur, qui est déclaré dans l'environnements (=localhost:8080)
  private apiServerUrl = environment.apiBaseUrl;

  //Déclaration d'un objet de type HTTPClient et qui nous permettra d'utiliser les méthodes http pour comminuquer avec le serveur
  constructor(private http: HttpClient) { }

  //Les méthodes en dessous correspondent aux méthodes CRUD dans le serveur
  getAll(): Observable<Etudiants[]> {
    return this.http.get<Etudiants[]>(`${this.apiServerUrl}/etudiants/`);
  }

  addEtudiant(etudiant: Etudiants): Observable<Etudiants> {
    return this.http.post<Etudiants>(`${this.apiServerUrl}/etudiants/${etudiant.mail}`, etudiant);
  }

  updateEtudiant(etudiant: Etudiants): Observable<Etudiants> {
    return this.http.put<Etudiants>(`${this.apiServerUrl}/etudiants/${etudiant.mail}`, etudiant);
  }

  deleteEtudiant(etudiant: Etudiants): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/etudiants/${etudiant.mail}`);
  }
}

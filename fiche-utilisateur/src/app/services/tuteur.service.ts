import { Tuteurs } from './../../classes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
//Cette classe est un service qui nous permettra d'utiliser ses fonctions dans tout le projet
export class TuteurService {

  //Déclaration de l'url du serveur, qui est déclaré dans l'environnements (=localhost:8080)
  private apiServerUrl = environment.apiBaseUrl;

  //Déclaration d'un objet de type HTTPClient et qui nous permettra d'utiliser les méthodes http pour comminuquer avec le serveur
  constructor(private http: HttpClient) { }

  //Les méthodes en dessous correspondent aux méthodes CRUD dans le serveur
  getAll(): Observable<Tuteurs[]> {
    return this.http.get<Tuteurs[]>(`${this.apiServerUrl}/tuteurs/`);
  }

  addTuteur(tuteur: Tuteurs): Observable<Tuteurs> {
    return this.http.post<Tuteurs>(`${this.apiServerUrl}/tuteurs/${tuteur.mail}`, tuteur);
  }

  updateTuteur(tuteur: Tuteurs): Observable<Tuteurs> {
    return this.http.put<Tuteurs>(`${this.apiServerUrl}/tuteurs/${tuteur.mail}`, tuteur);
  }

  deleteTuteur(tuteur: Tuteurs): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/tuteurs/${tuteur.mail}`);
  }
}

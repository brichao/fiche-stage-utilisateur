import { infosStage } from './../../classes';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//Cette classe est un service qui nous permettra d'utiliser ses fonctions dans tout le projet
export class InfosStageService {

  //Déclaration de l'url du serveur, qui est déclaré dans l'environnements (=localhost:8080)
  private apiServerUrl = environment.apiBaseUrl;

  //Déclaration d'un objet de type HTTPClient et qui nous permettra d'utiliser les méthodes http pour comminuquer avec le serveur
  constructor(private http: HttpClient) { }

  //Les méthodes en dessous correspondent aux méthodes CRUD dans le serveur
  getAll(): Observable<infosStage[]> {
    return this.http.get<infosStage[]>(`${this.apiServerUrl}/infosStages/`);
  }

  addInfosStage(infoStage: infosStage): Observable<infosStage> {
    return this.http.post<infosStage>(`${this.apiServerUrl}/infosStages/${infoStage.titre}`, infoStage);
  }

  updateInfosStage(infoStage: infosStage): Observable<infosStage> {
    return this.http.put<infosStage>(`${this.apiServerUrl}/infosStages/${infoStage.titre}`, infoStage);
  }

  deleteInfosStage(infoStage: infosStage): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/infosStages/${infoStage.titre}`);
  }
}

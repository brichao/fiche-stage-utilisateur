import { ServicesGestion } from './../../classes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
//Cette classe est un service qui nous permettra d'utiliser ses fonctions dans tout le projet
export class ServiceGestionService {

  //Déclaration de l'url du serveur, qui est déclaré dans l'environnements (=localhost:8080)
  private apiServerUrl = environment.apiBaseUrl;

  //Déclaration d'un objet de type HTTPClient et qui nous permettra d'utiliser les méthodes http pour comminuquer avec le serveur
  constructor(private http: HttpClient) { }

  //Les méthodes en dessous correspondent aux méthodes CRUD dans le serveur
  getAll(): Observable<ServicesGestion[]> {
    return this.http.get<ServicesGestion[]>(`${this.apiServerUrl}/services/`);
  }

  addServiceGestion(serviceGestion: ServicesGestion): Observable<ServicesGestion> {
    return this.http.post<ServicesGestion>(`${this.apiServerUrl}/services/${serviceGestion.mail}`, serviceGestion);
  }

  updateServiceGestion(serviceGestion: ServicesGestion): Observable<ServicesGestion> {
    return this.http.put<ServicesGestion>(`${this.apiServerUrl}/services/${serviceGestion.mail}`, serviceGestion);
  }

  deleteServiceGestion(serviceGestion: ServicesGestion): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/services/${serviceGestion.mail}`);
  }
}

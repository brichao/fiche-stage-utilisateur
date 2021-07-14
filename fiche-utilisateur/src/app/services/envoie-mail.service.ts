import { EmailData } from './../../classes';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//Cette classe est un service qui nous permettra d'utiliser ses fonctions dans tout le projet
export class EnvoieMailService {

  //Déclaration de l'url du serveur, qui est déclaré dans l'environnements (=localhost:8080)
  private apiServerUrl = environment.apiBaseUrl;

  //Déclaration d'un objet de type HTTPClient et qui nous permettra d'utiliser les méthodes http pour comminuquer avec le serveur
  constructor(private http: HttpClient) { }

  envoieMail(emailInfos: EmailData): Observable<EmailData> {
    return this.http.post<EmailData>(`${this.apiServerUrl}/mail/`, emailInfos);
  }

  envoieMailValidation(emailInfos: EmailData): Observable<EmailData>{
    return this.http.post<EmailData>(`${this.apiServerUrl}/mail/validation`, emailInfos);
  }
}

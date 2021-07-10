import { Tuteurs } from './../../classes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TuteurService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

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

import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etudiants } from 'src/classes';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

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

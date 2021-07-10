import { Entreprises } from './../../classes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Entreprises[]> {
    return this.http.get<Entreprises[]>(`${this.apiServerUrl}/etablissements/`);
  }

  addEntreprise(entreprise: Entreprises): Observable<Entreprises> {
    return this.http.post<Entreprises>(`${this.apiServerUrl}/etablissements/${entreprise.numeroSiret}`, entreprise);
  }

  updateEntreprise(entreprise: Entreprises): Observable<Entreprises> {
    return this.http.put<Entreprises>(`${this.apiServerUrl}/etablissements/${entreprise.numeroSiret}`, entreprise);
  }

  deleteEntreprise(entreprise: Entreprises): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/etablissements/${entreprise.numeroSiret}`);
  }
}

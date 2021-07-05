import { ServicesGestion } from './../../classes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceGestionService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<ServicesGestion[]> {
    return this.http.get<ServicesGestion[]>(`${this.apiServerUrl}/services/`);
  }

  addEtudiant(serviceGestion: ServicesGestion): Observable<ServicesGestion> {
    return this.http.post<ServicesGestion>(`${this.apiServerUrl}/services/${serviceGestion.mail}`, serviceGestion);
  }

  updateEtudiant(serviceGestion: ServicesGestion): Observable<ServicesGestion> {
    return this.http.put<ServicesGestion>(`${this.apiServerUrl}/services/${serviceGestion.mail}`, serviceGestion);
  }

  deleteEtudiant(serviceGestion: ServicesGestion): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/services/${serviceGestion.mail}`);
  }
}

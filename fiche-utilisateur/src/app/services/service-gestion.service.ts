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

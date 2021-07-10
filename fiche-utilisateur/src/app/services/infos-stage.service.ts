import { infosStage } from './../../classes';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfosStageService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

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

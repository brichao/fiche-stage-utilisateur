import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//Un service qui permet d'envoyer des données entre n'importe quel component
export class DataService {

  //On déclare un BehaviorSubject pour stocker les tableaux de string, accessible ensuite dans tout le projet
  private _sourceData = new BehaviorSubject<string[]>(['']);
  //Observable à s'abonner dans le component dans lequel on veut recevoir les données, et qui publiera les données à chaque demande dans chaque component
  nomPrenom$ = this._sourceData.asObservable();

  constructor() { }

  //Méthode qui permet d'ajouter des données (de type tableau de string) dans le BehaviorSubject
  sendData(data: string[]): void {
    this._sourceData.next(data);
  }
}

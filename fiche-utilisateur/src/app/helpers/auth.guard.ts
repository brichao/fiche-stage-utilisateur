import { AuthentificationService } from './../services/authentification.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthentificationService) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //On récupère la valeur booléenne de l'utilisateur connecté
    const userConnected = this.authService.getUserCurrentValue();
    //Si il est connecté, on retourne vrai
    if(userConnected){
      return true;
    }
    //Sinon on le redirige vers la page de login pour se connecter
    this.router.navigate(['login']), { queryParams: { returnUrl: state.url}};
    return false;
  }

}

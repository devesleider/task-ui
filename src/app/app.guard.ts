import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AppGuard implements CanActivate {

    // Ya que vamos a hacer un redirección si la hora es mayor de 22
    // Necesitamos importar el Router e inyectarlo al construictor
    constructor(private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | UrlTree  {

        const value = sessionStorage.getItem('user'); // Reemplaza 'miValor' con la clave que deseas verificar

        if (value) {
            // El valor existe en sessionStorage, permite la navegación
            return true;
        } else {
            // El valor no existe en sessionStorage, redirige a una página de inicio de sesión u otra página
            return this.router.parseUrl(''); // Reemplaza '/login' con la ruta que deseas redirigir
        }
    }

}
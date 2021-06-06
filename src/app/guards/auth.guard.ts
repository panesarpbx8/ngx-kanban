import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private toast: HotToastService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    
    return this.auth.user$.pipe(
      map(user => !!user),
      map(isLoggedIn => {
        if (!isLoggedIn) {
          this.toast.error('You must be logged in', {
            duration: 3000,
          });
          return false;
        }
        return true;
      }),
    );
  }
  
}

import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {EUserRole} from '../interfaces/users.interfaces';

@Injectable({
  providedIn: 'root',
})
export class IsAuthorizedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (Boolean(this.authService.getCurrentUser().value)) {
      return true;
    }

    this.router.navigate(['catalog']);

    return false;
  }
}

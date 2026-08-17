import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { SupabaseService } from 'src/app/shared/services/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    try {
      const user = await this.supabaseService.getUser();
      if (!user) {
        return this.router.createUrlTree(['/auth/login'], {
          queryParams: { returnUrl: state.url },
        });
      }
      if (user.role?.toLowerCase() !== 'admin') {
        return this.router.createUrlTree(['/']);
      }
      return true;
    } catch (error) {
      console.error('AdminGuard error:', error);
      return this.router.createUrlTree(['/auth/login']);
    }
  }
}
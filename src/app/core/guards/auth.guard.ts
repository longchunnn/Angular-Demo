import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SupabaseService } from 'src/app/shared/services/supabase.service';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private supabaseService: SupabaseService,private router:Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const isAuthenticated = await this.supabaseService.isAuthenticated();
    if (!isAuthenticated) {
      return this.router.createUrlTree(['/auth/login']);
    }
    return true;
  }
  
}

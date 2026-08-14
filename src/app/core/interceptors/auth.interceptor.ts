import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(req.url.includes('/auth/login')|| req.url.includes('/auth/register')){
      return next.handle(req);
    }
    const token=localStorage.getItem('token')
    let authReq= req;
    if(token) {
      authReq=req.clone(
        {
          setHeaders:{Authorization:`Bearer ${token}` }
        }
      )
    }
    return next.handle(authReq)
  }
}

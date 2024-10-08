import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.authService.token;

    if (token) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(cloned);
    } else {
      return next.handle(request);
    }
  }
}
/*   intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Pasar el token
    /*if (!request.url.includes("change-password") && !this.authService.getToken()) {
      this.router.navigate(['/login'])
    }*/
//if (this.authService.isLoggedInUser()) {
/*  request = request.clone({
      setHeaders: {
        authorization: sessionStorage.getItem('token') || '',
        //authorization: `Bearer ${this.authService.getToken()}`,
      },
/*     });
    //}
    return next.handle(request);
  } 
} 
*/

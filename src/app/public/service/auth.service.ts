import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credentials } from '../interfaces/auth.models';
import { map } from 'rxjs';
import * as jwtDecode from 'jwt-decode';
import moment from 'moment';
import { Usuario } from '../interfaces/user.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: Credentials) {
    return this.http
      .post(`${environment.URL_BASE}/login`, credentials, {
        observe: 'response',
      })
      .pipe(
        map((response: HttpResponse<any>) => {
          const body = response.body;
          const headers = response.headers;

          console.log('headers', headers);

          const bearerToken = headers.get('Authorization')!;
          const token = bearerToken.split('Bearer ')[1];
          const tokenData: any = jwtDecode.default(token);

          console.log('tokenData', tokenData);

          const expiresAt = moment('1970-01-01').add(tokenData.exp, 'seconds');

          console.log('expiresAt', expiresAt, tokenData.exp);

          localStorage.setItem('mifact_user_id', tokenData.userId);
          localStorage.setItem('mifact_name', tokenData.name);
          localStorage.setItem('mifact_role', tokenData.role);
          localStorage.setItem('mifact_token', token);
          localStorage.setItem(
            'mifact_expires_at',
            JSON.stringify(expiresAt.valueOf())
          );

          return body;
        })
      );
  }

  get name() {
    return localStorage.getItem('mifact_name') || '';
  }

  get role() {
    return localStorage.getItem('mifact_role') || '';
  }
  get token() {
    return localStorage.getItem('mifact_token');
  }

  isAdmin() {
    return localStorage.getItem('mifact_role') === 'ADMIN';
  }

  isLoggedIn() {
    const expiration = localStorage.getItem('mifact_expires_at');

    if (expiration) {
      return moment().isBefore(moment(JSON.parse(expiration)));
    }
    return false;
  }

  logout() {
    localStorage.removeItem('inrosac_user_id');
    localStorage.removeItem('inrosac_name');
    localStorage.removeItem('inrosac_role');
    localStorage.removeItem('inrosac_token');
    localStorage.removeItem('inrosac_expires_at');
  }

  registrar(usuario: Usuario) {
    return this.http.post(`${environment.URL_BASE}/v1/auth/registrar`, usuario);
  }

  verificarEmail(email: string) {
    return this.http.get(
      `${environment.URL_BASE}/v1/auth/verificar-email?email=${email}`
    );
  }
}

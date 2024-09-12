import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import {
  Page,
  ProductoHttpResponse,
  ProductoState,
} from '../interface/appstates';
import { Producto } from '../interface/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private readonly server: string = 'http://localhost:8090/v1';
  constructor(private http: HttpClient) {}

  productos$ = (page: number = 0) =>
    <Observable<ProductoHttpResponse<Page<Producto>>>>(
      this.http
        .get<ProductoHttpResponse<Page<Producto>>>(
          `${this.server}/producto/list?page=${page}`
        )
        .pipe(tap(console.log), catchError(this.handleError))
    );

  producto$ = (productoId: number) =>
    <Observable<ProductoHttpResponse<ProductoState>>>(
      this.http
        .get<ProductoHttpResponse<ProductoState>>(
          `${this.server}/producto/get/${productoId}`
        )
        .pipe(tap(console.log), catchError(this.handleError))
    );

  update$ = (producto: Producto) =>
    <Observable<ProductoHttpResponse<ProductoState>>>(
      this.http
        .put<ProductoHttpResponse<ProductoState>>(
          `${this.server}/producto/update`,
          producto
        )
        .pipe(tap(console.log), catchError(this.handleError))
    );

  searchProductos$ = (name: string = '', page: number = 0) =>
    <Observable<ProductoHttpResponse<Page<Producto>>>>(
      this.http
        .get<ProductoHttpResponse<Page<Producto>>>(
          `${this.server}/producto/search?name=${name}&page=${page}`
        )
        .pipe(tap(console.log), catchError(this.handleError))
    );

  newProductos$ = (producto: Producto) =>
    <Observable<ProductoHttpResponse<Producto>>>(
      this.http
        .post<ProductoHttpResponse<Producto>>(
          `${this.server}/producto/create`,
          producto
        )
        .pipe(tap(console.log), catchError(this.handleError))
    );

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      errorMessage = `A client error occurred - ${error.error.message}`;
    } else {
      if (error.error.reason) {
        errorMessage = error.error.reason;
        console.log(errorMessage);
      } else {
        errorMessage = `An error occurred - Error status ${error.status}`;
      }
    }
    return throwError(() => errorMessage);
  }
}

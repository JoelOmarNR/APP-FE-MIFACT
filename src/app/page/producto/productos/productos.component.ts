import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  startWith,
} from 'rxjs';
import { State } from '../../../interface/state';
import { Producto } from '../../../interface/producto';
import { Page, ProductoHttpResponse } from '../../../interface/appstates';
import { DataState } from '../../../enum/datastate.enum';
import { Router } from '@angular/router';
import { ProductoService } from '../../../service/producto.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent implements OnInit {
  productosState$!: Observable<State<ProductoHttpResponse<Page<Producto>>>>;
  private dataSubject = new BehaviorSubject<
    ProductoHttpResponse<Page<Producto>>
  >(null!);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();
  private showLogsSubject = new BehaviorSubject<boolean>(false);
  showLogs$ = this.showLogsSubject.asObservable();
  readonly DataState = DataState;

  constructor(
    private router: Router,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.productosState$ = this.productoService.searchProductos$().pipe(
      map((response) => {
        console.log(response);
        this.dataSubject.next(response);
        return { dataState: DataState.LOADED, appData: response };
      }),
      startWith({ dataState: DataState.LOADING }),
      catchError((error: string) => {
        return of({ dataState: DataState.ERROR, error });
      })
    );
  }

  searchProductos(searchForm: NgForm): void {
    this.currentPageSubject.next(0);
    this.productosState$ = this.productoService
      .searchProductos$(searchForm.value.name)
      .pipe(
        map((response) => {
          console.log(response);
          this.dataSubject.next(response);
          return { dataState: DataState.LOADED, appData: response };
        }),
        startWith({
          dataState: DataState.LOADED,
          appData: this.dataSubject.value,
        }),
        catchError((error: string) => {
          return of({ dataState: DataState.ERROR, error });
        })
      );
  }

  goToPage(pageNumber?: number, name?: string): void {
    this.productosState$ = this.productoService
      .searchProductos$(name, pageNumber)
      .pipe(
        map((response) => {
          console.log(response);
          this.dataSubject.next(response);
          this.currentPageSubject.next(pageNumber!);
          return { dataState: DataState.LOADED, appData: response };
        }),
        startWith({
          dataState: DataState.LOADED,
          appData: this.dataSubject.value,
        }),
        catchError((error: string) => {
          return of({
            dataState: DataState.LOADED,
            error,
            appData: this.dataSubject.value,
          });
        })
      );
  }

  goToNextOrPreviousPage(direction?: string, name?: string): void {
    this.goToPage(
      direction === 'forward'
        ? this.currentPageSubject.value + 1
        : this.currentPageSubject.value - 1,
      name
    );
  }

  selectProducto(producto: Producto): void {
    this.router.navigate([`/productos/${producto.id}`]);
  }
}

import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./productos/productos.component'),
  },
  {
    path: 'newproducto',
    loadComponent: () => import('./newproducto/newproducto.component'),
  },
  {
    path: 'producto/:id',
    loadComponent: () => import('./producto-detail/producto-detail.component'),
  },
] as unknown as Routes;

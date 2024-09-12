import { DataState } from '../enum/datastate.enum';
import { Producto } from './producto';

export interface LoginState {
  dataState: DataState;
  loginSuccess?: boolean;
  error?: string;
  message?: string;
  isUsingMfa?: boolean;
  phone?: string;
}

export interface ProductoHttpResponse<T> {
  timestamp: Date;
  statusCode: number;
  status: string;
  message: string;
  reason?: string;
  developerMessage?: string;
  data?: T;
}

export interface Profile {
  access_token?: string;
  refresh_token?: string;
}

export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  size: number;
  number: number;
}

export interface ProductoState {
  producto: Producto;
}

export interface RegisterState {
  dataState: DataState;
  registerSuccess?: boolean;
  error?: string;
  message?: string;
}

export type AccountType = 'account' | 'password';

export interface VerifySate {
  dataState: DataState;
  verifySuccess?: boolean;
  error?: string;
  message?: string;
  title?: string;
  type?: AccountType;
}

import { Rol } from '../../enum/rol.enum';

export interface Usuario {
  nombres: string;
  apellidos: string;
  nombreCompleto: string;
  status: string;
  email: string;
  password: string;
  rol: Rol;
}

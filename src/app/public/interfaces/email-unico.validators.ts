import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({ providedIn: 'root' })
export class EmailUnicoValidator implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.authService.verificarEmail(control.value).pipe(
      map((response: any) => (response.exists ? { emailExiste: true } : null)),
      catchError(() => of(null))
    );
  }
}

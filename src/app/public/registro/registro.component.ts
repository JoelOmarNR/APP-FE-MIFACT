import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { EmailUnicoValidator } from '../interfaces/email-unico.validators';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
  ],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  form?: FormGroup;
  passwordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private emailUnicoValidator: EmailUnicoValidator
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      email: [
        ,
        [Validators.required, Validators.email],
        [this.emailUnicoValidator],
      ],
      nombres: [, [Validators.required]],
      apellidos: [, [Validators.required]],
      password: [, [Validators.required, Validators.minLength(4)]],
    });
  }

  controlHasError(control: string, error: string) {
    return this.form?.controls[control].hasError(error);
  }

  registrar() {
    if (this.form?.invalid) {
      if (this.controlHasError('email', 'emailExiste')) {
        this.toastr.error('Ya existe un usuario con ese email', 'Error');
      }
      return;
    }

    const registroValues = this.form?.value;

    this.authService.registrar(registroValues).subscribe(() => {
      this.authService
        .login({
          username: registroValues.email,
          password: registroValues.password,
        })
        .subscribe(() => {
          this.router.navigate(['/']);

          Swal.fire(
            'Nuevo usuario',
            `Bienvenido ${registroValues.nombres} tu usuario ha sido creado con éxito`,
            'success'
          );
        });
    });
  }
}

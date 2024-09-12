import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credentials } from '../interfaces/auth.models';
import { AuthService } from '../service/auth.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  credentials: Credentials = {
    username: '',
    password: '',
  };
  error: boolean = false;

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  showPassword = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    const passwordField = document.getElementById(
      'password'
    ) as HTMLInputElement;
    passwordField.type = this.showPassword ? 'text' : 'password';
  }

  login(formulario: NgForm) {
    if (formulario.form.invalid) {
      return;
    }

    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.error = false;
        this.toastr.success('Control de acceso exitoso', 'Aviso');
        this.router.navigate(['/page/panel']);
      },
      error: () => {
        this.error = true;
        this.toastr.error('Error de credenciales de acceso', 'Error');
      },
    });
  }
}

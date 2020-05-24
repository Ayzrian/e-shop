import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../utilities/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  getEmailErrorMessage() {
    if (this.loginForm.controls.email.hasError('required')) {
      return 'Это поле обязательное!';
    }

    return this.loginForm.controls.email.hasError('email')
      ? 'Введите валидный електронный аддрес!'
      : '';
  }

  getPasswordErrorMessage() {
    if (this.loginForm.controls.password.hasError('required')) {
      return 'Это поле обязательно!';
    }

    return this.loginForm.controls.password.hasError('minlength')
      ? 'Минимальная длина пароля - 6!'
      : '';
  }

  async onSubmit() {
    try {
      this.loading = true;

      await this.authService.login(this.loginForm.value);
      this.loginForm.reset();

      this.router.navigate(['/catalog']);
    } catch (e) {
      this.notificationService.notify('Что-то пошло не так. Может вы ввели не правильный пароль.');
    } finally {
      this.loading = false;
    }
  }
}

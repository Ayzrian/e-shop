import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {IUser} from '../../interfaces/users.interfaces';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../utilities/notification.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
    personalDataForm: FormGroup;
    addressForm: FormGroup;
    paymentForm: FormGroup;

    sexOptions = [
        {
            value: 'Мужчина',
            label: 'Мужчина',
        },
        {
            value: 'Женщина',
            label: 'Женщина',
        },
    ];

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private notificationService: NotificationService
    ) {
        this.personalDataForm = this.fb.group({
            firstName: [
                '',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(20),
                ],
            ],
            lastName: [
                '',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(20),
                ],
            ],
            dateOfBirth: [moment.now(), [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(20),
                ],
            ],
            phoneNumber: [
                '',
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(20),
                ]
            ],
            sex: ['Мужчина', [Validators.required]],
        });

        this.addressForm = this.fb.group({
            country: ['', [Validators.required, Validators.minLength(3)]],
            city: ['', [Validators.required, Validators.minLength(3)]],
            street: ['', [Validators.required, Validators.minLength(3)]],
            building: ['', [Validators.required, Validators.minLength(1)]],
            flat: [''],
        });

        this.paymentForm = this.fb.group({
            cardNumber: [
                '',
                [
                    Validators.required,
                    Validators.minLength(16),
                    Validators.maxLength(16),
                ],
            ],
            expirationDate: [
                '',
                [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
            ],
            cvv: [
                '',
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(3),
            ],
        });
    }

    isInvalid(form: FormGroup, control: string): boolean {
        return form.controls[control].invalid;
    }

    getErrorMessage(
        form: FormGroup,
        control: string,
        minLength = 3,
        maxLength = 20
    ): string {
        const {errors} = form.controls[control];
        if (errors) {
            if (errors.required) {
                return 'Это поле обязательное!';
            }

            if (errors.minlength) {
                return 'Минимальная длина этого поля = ' + minLength;
            }

            if (errors.maxlength) {
                return 'Максимальная длина этого поля = ' + maxLength;
            }

            if (errors.email) {
                return 'Введите пожалуйста валидный електронный адрес';
            }
        }
    }

    isFormValid(): boolean {
        return (
            this.addressForm.valid &&
            this.personalDataForm.valid &&
            this.paymentForm.valid
        );
    }

    async signUp() {
        const user: IUser = {
            ...this.personalDataForm.value,
            roleId: 2,
            addresses: [this.addressForm.value],
            cards: [this.paymentForm.value],
        };

        await this.authService.register(user);

        this.notificationService.notify('Вы успешно зарегестрировались!');

        this.router.navigate(['/catalog']);

        this.personalDataForm.reset();
        this.addressForm.reset();
        this.paymentForm.reset();
    }

    ngOnInit(): void {
    }
}

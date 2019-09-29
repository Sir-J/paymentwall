import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CardDto, PaymentMethodDto, SelectOption } from 'src/app/models/classes';
import { CountriesEnum } from 'src/app/models/enums';
import { PaymentwallService } from 'src/app/services';
import { CardNumberValidator } from 'src/app/validators';

@Component({
    selector: 'app-default-page',
    templateUrl: './default-page.component.html',
    styleUrls: ['./default-page.component.less']
})
export class DefaultPageComponent implements OnInit, OnDestroy {
    countries: Array<SelectOption<string>>;
    methods: Array<PaymentMethodDto>;
    card: CardDto = new CardDto();
    minDate: Date = moment()
        .month(moment().month() + 1)
        .toDate();
    paymentValue: string = undefined;
    paymentCurrency: string = undefined;
    cardForm: FormGroup;
    paymentForm: FormGroup;

    showPayment = false;

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(private route: ActivatedRoute, private service: PaymentwallService, private snackBar: MatSnackBar) {}

    ngOnInit() {
        this.countries = Object.keys(CountriesEnum).map(key => new SelectOption<string>(key, CountriesEnum[key]));
        this.methods = this.route.snapshot.data.data.payments as Array<PaymentMethodDto>;
        this.paymentValue = this.route.snapshot.queryParams.value;
        this.paymentCurrency = this.route.snapshot.queryParams.currency;

        this.paymentForm = new FormGroup({
            country: new FormControl(this.route.snapshot.data.data.countryCode),
            method: new FormControl('')
        });

        this.paymentForm.get('country').valueChanges.subscribe(val => {
            this.showPayment = false;
            this.paymentForm.get('method').setValue(undefined);
            this.service
                .getPaymentInfo(val)
                .pipe(takeUntil(this.ngUnsubscribe))
                .subscribe((data: Array<PaymentMethodDto>) => {
                    if (data instanceof Array) {
                        this.methods = data;
                    } else {
                        this.methods = [];
                    }
                });
        });

        this.paymentForm.get('method').valueChanges.subscribe(val => {
            this.showPayment = val ? true : false;
        });

        this.cardForm = new FormGroup({
            cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{15,16}'), CardNumberValidator()]),
            expired: new FormControl('', [Validators.required]),
            cvc: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
            holder: new FormControl('', [Validators.required, Validators.pattern('^((?:[A-Za-z]+ ?){1,3})$')])
        });
    }

    chosenYearHandler(normalizedYear: moment.Moment) {
        const ctrlValue = moment(this.card.expired);
        ctrlValue.year(normalizedYear.year());
        this.card.expired = ctrlValue.toDate();
    }

    chosenMonthHandler(normalizedMonth: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
        const ctrlValue = moment(this.card.expired);
        ctrlValue.month(normalizedMonth.month());
        this.card.expired = ctrlValue.toDate();
        datepicker.close();
    }

    cancel() {
        this.cardForm.markAsUntouched();
        this.cardForm.updateValueAndValidity();
        this.paymentForm.get('method').setValue(undefined);
        this.showPayment = false;
    }

    submit() {
        this.cardForm.markAllAsTouched();
        this.cardForm.updateValueAndValidity();
        if (this.cardForm.valid) {
            this.snackBar.open('Success payment', 'Close', {
                duration: 5000,
                panelClass: ['mat-primary']
            });
        }
    }

    isCardFormControlInvalid(name: string): boolean {
        return !this.cardForm.controls[name].valid;
    }

    getCardControlErrorMessage(name: string): string {
        const control = this.cardForm.controls[name];
        switch (name) {
            case 'cardNumber': {
                return control.hasError('required')
                    ? 'Card number is required'
                    : control.hasError('pattern')
                    ? 'Card number must consists only numbers'
                    : control.hasError('luhnAlgorithm')
                    ? 'Card number not valid'
                    : '';
            }
            case 'expired': {
                return control.hasError('required') ? 'Expired date is required' : '';
            }
            case 'cvc': {
                return control.hasError('required')
                    ? 'Cvc is required'
                    : control.hasError('pattern')
                    ? 'Cvc must consists only numbers'
                    : '';
            }
            case 'holder': {
                return control.hasError('required')
                    ? 'Card holder is required'
                    : control.hasError('pattern')
                    ? 'Card holder must consists only characters'
                    : '';
            }
        }
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}

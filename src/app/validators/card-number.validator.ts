import { AbstractControl, ValidatorFn } from '@angular/forms';

export function CardNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        let isInvalid = false;
        let sum = 0;
        const digits = (control.value as string).split('');
        if (digits.length >= 15) {
            for (let i = 0; i < digits.length; i++) {
                // tslint:disable-next-line:radix
                let cardNum = parseInt(digits[i]);

                if ((digits.length - i) % 2 === 0) {
                    cardNum = cardNum * 2;

                    if (cardNum > 9) {
                        cardNum = cardNum - 9;
                    }
                }

                sum += cardNum;
            }

            isInvalid = sum % 10 !== 0;
        }
        return isInvalid ? { luhnAlgorithm: { value: 'Card number not valid' } } : null;
    };
}

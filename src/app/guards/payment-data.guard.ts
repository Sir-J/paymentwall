import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class PaymentDataGuard implements CanActivate {
    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const paymentValue = route.queryParams.value;
        const paymentCurrency = route.queryParams.currency as string;

        if (isNaN(parseFloat(paymentValue)) || paymentCurrency.length === 0) {
            this.router.navigateByUrl(`/error`);
            return false;
        }
        return true;
    }
}

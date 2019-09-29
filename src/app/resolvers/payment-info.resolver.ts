import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IpDataService, PaymentwallService } from 'src/app/services';

@Injectable()
export class PaymentInfoResolver {
    constructor(private service: IpDataService, private paymentwall: PaymentwallService) {}

    resolve(
        route: ActivatedRouteSnapshot
    ): Observable<{
        countryCode: string;
        payments: any;
    }> {
        return this.service.getCountryCodeInfoByIp().pipe(
            switchMap((code: string) => {
                return this.paymentwall.getPaymentInfo(code).pipe(
                    map((data: any) => {
                        return {
                            countryCode: code,
                            payments: data
                        };
                    })
                );
            })
        );
    }
}

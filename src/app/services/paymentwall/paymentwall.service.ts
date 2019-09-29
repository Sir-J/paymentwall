import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentMethodDto } from 'src/app/models/classes';

@Injectable()
export class PaymentwallService {
    apiUrl = 'https://api.paymentwall.com/api';

    constructor(private service: HttpClient) {}

    getPaymentInfo(countryCode: string): Observable<Array<PaymentMethodDto>> {
        let params = new HttpParams();

        params = params.append('key', environment.productKey);
        params = params.append('country_code', countryCode);
        params = params.append('sign_version', '2');

        return this.service.get<Array<PaymentMethodDto>>(`${this.apiUrl}/payment-systems`, {
            params
        });
    }
}

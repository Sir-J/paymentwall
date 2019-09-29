import { Observable, of } from 'rxjs';
import { PaymentMethodDto } from 'src/app/models/classes';

export class PaymentwallServiceMock {
    constructor() {}

    getPaymentInfo(countryCode: string): Observable<Array<PaymentMethodDto>> {
        return of([]);
    }
}

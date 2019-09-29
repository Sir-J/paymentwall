import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PaymentwallService } from './paymentwall.service';

describe('PaymentwallService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PaymentwallService]
        })
    );

    it('should be created', () => {
        const service: PaymentwallService = TestBed.get(PaymentwallService);
        expect(service).toBeTruthy();
    });
});

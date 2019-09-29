import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class IpDataService {
    apiUrl = 'http://ip-api.com/json';

    constructor(private service: HttpClient) {}

    getCountryCodeInfoByIp(): Observable<string> {
        return this.service.get(this.apiUrl).pipe(
            map((obj: any) => {
                return obj.countryCode;
            }),
            catchError(() => {
                return of('RU');
            })
        );
    }
}

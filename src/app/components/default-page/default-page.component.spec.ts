import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ValueFormatDirective } from 'src/app/directives';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { PaymentwallService } from 'src/app/services';
import { PaymentwallServiceMock } from 'src/app/services/paymentwall/paymentwall.service.mock';

import { DefaultPageComponent } from './default-page.component';

describe('DefaultPageComponent', () => {
    let component: DefaultPageComponent;
    let fixture: ComponentFixture<DefaultPageComponent>;
    const route = ({
        snapshot: {
            queryParams: {
                value: 5,
                currency: 'USD'
            },
            data: {
                data: {
                    countryCode: 'RU',
                    payments: []
                }
            }
        }
    } as any) as ActivatedRoute;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserModule,
                FormsModule,
                ReactiveFormsModule,
                RouterTestingModule.withRoutes([]),
                MaterialModule,
                BrowserAnimationsModule
            ],
            declarations: [DefaultPageComponent, ValueFormatDirective],
            providers: [
                { provide: ActivatedRoute, useValue: route },
                {
                    provide: PaymentwallService,
                    useValue: PaymentwallServiceMock
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DefaultPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

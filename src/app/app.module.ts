import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ValueFormatDirective } from 'src/app/directives';
import { PaymentDataGuard } from 'src/app/guards';
import { DATE_PICKER_FORMAT } from 'src/app/models/constants';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { PaymentInfoResolver } from 'src/app/resolvers';
import { IpDataService, PaymentwallService } from 'src/app/services';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, DefaultPageComponent, ErrorPageComponent } from './components';

@NgModule({
    declarations: [AppComponent, DefaultPageComponent, ValueFormatDirective, ErrorPageComponent],
    imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule, MaterialModule],
    providers: [
        IpDataService,
        PaymentwallService,
        PaymentInfoResolver,
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: DATE_PICKER_FORMAT },
        PaymentDataGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

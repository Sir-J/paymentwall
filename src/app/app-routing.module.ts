import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultPageComponent, ErrorPageComponent } from 'src/app/components';
import { PaymentDataGuard } from 'src/app/guards';
import { PaymentInfoResolver } from 'src/app/resolvers';

const routes: Routes = [
    {
        path: '',
        component: DefaultPageComponent,
        resolve: {
            data: PaymentInfoResolver
        },
        canActivate: [PaymentDataGuard]
    },
    {
        path: 'error',
        component: ErrorPageComponent
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}

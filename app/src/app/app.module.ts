import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './header/header.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import {LoginModule} from './pages/login/login.module';
import {SignUpModule} from './pages/sign-up/sign-up.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {BasketModule} from './pages/basket/basket.module';
import {CatalogModule} from './pages/catalog/catalog.module';
import {AdminBarModule} from './pages/admin-bar/admin-bar.module';
import {ProductModule} from './pages/product/product.module';
import {MatBadgeModule} from '@angular/material/badge';
import {TrackOrderComponent} from './pages/track-order/track-order.component';
import {TrackOrderModule} from './pages/track-order/track-order.module';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {ProfileModule} from './pages/profile/profile.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    ReactiveFormsModule,
    LoginModule,
    SignUpModule,
    BasketModule,
    CatalogModule,
    AdminBarModule,
    MatMomentDateModule,
    ProductModule,
    MatBadgeModule,
    TrackOrderModule,
    ProfileModule,
  ],
  providers: [
    MatMomentDateModule,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterceptor
    },
    {
      provide: MatPaginatorIntl, useFactory: () => {
        const intl = new MatPaginatorIntl();

        intl.itemsPerPageLabel = 'Количество записей на странице ';

        return intl;
      }
    },
    {
      provide: MAT_DATE_LOCALE, useValue: 'ru-RU'
    },
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { fakeBackendProvider, JwtInterceptor } from './_helpers';
import { TabsComponent } from './tabs/tabs.component';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CustomersComponent } from './customers/customers.component';
import { EditCustomersComponent } from './customers/edit-customers/edit-customers.component';
import { ListCustomerComponent } from './customers/list-customer/list-customer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TabsComponent,
    CustomersComponent,
    EditCustomersComponent,
    ListCustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    TabsModule.forRoot() ,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

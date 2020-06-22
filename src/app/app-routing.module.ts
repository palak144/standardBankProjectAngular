import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_helpers/auth.guard';
import { CustomersComponent } from './customers/customers.component';
import { EditCustomersComponent } from './customers/edit-customers/edit-customers.component';
import { ListCustomerComponent } from './customers/list-customer/list-customer.component';


const routes: Routes = [
  { path: '', redirectTo : '/customers', pathMatch:'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path:'customers',component: CustomersComponent,canActivate: [AuthGuard] ,children:[
    {path:'', component : ListCustomerComponent},
    {path:'new', component : EditCustomersComponent},
      {path:':id/edit', component:EditCustomersComponent}]},
  
  // otherwise redirect to home
  { path: '**', redirectTo: 'newCustomer' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

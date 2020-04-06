import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './services/auth/auth.service';
import { LoginComponent } from './components/login/login.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MailComponent } from './components/mail/mail.component';



// Parent Routes
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthService]
  },
  {
    path: 'mail',
    component: MailComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

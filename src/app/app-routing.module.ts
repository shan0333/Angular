import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

import { CheckoutComponent } from './components/checkout/checkout.component';
import { MailComponent } from './components/mail/mail.component';
import { OrderhisComponent } from './components/orderhis/orderhis.component';
import { FinalcheckoutComponent } from './components/finalcheckout/finalcheckout.component';
import { GiftcardComponent } from './components/giftcard/giftcard.component';
import { BuyComponent } from './components/buy/buy.component';


// Parent Routes
const routes: Routes = [
  
  {
    path: 'g1',
    component: GiftcardComponent
  },
  {
    path: 'g2',
    component: BuyComponent
  },
  {
    path: 'g3',
    component: CheckoutComponent
  },
  {
    path: 'g4',
    component: MailComponent
  },
  {
    path: 'g5',
    component: OrderhisComponent
  },
  {
    path: 'g6',
    component: FinalcheckoutComponent
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

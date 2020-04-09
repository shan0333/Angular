import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modules
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// Services
import { AuthService } from './services/auth/auth.service';

// Components
import { AppComponent } from './components/index/app.component';

import { AppRoutingModule } from './app-routing.module';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MailComponent } from './components/mail/mail.component';
import { OrderhisComponent } from './components/orderhis/orderhis.component';
import { FinalcheckoutComponent } from './components/finalcheckout/finalcheckout.component';
import { GiftcardComponent } from './components/giftcard/giftcard.component';
import { BuyComponent } from './components/buy/buy.component';




@NgModule({
	declarations: [
		AppComponent,
		CheckoutComponent,
		MailComponent,
		OrderhisComponent,
		FinalcheckoutComponent,
		GiftcardComponent,
		BuyComponent
	],
	imports: [
		BrowserModule,
		RouterModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		ToastrModule.forRoot({
			timeOut: 3000,
			positionClass: 'toast-bottom-right',
			preventDuplicates: true,
		}),
	],
	providers: [AuthService],
	bootstrap: [AppComponent]
})

// enableProdMode();

export class AppModule { }

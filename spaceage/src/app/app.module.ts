import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemMasterComponent } from './item-master/item-master.component';
import { PartListComponent } from './part-list/part-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RightsideHeaderComponent } from './rightside-header/rightside-header.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { HttpClientModule } from '@angular/common/http';
import { Location } from '@angular/common';
import { NgxBarcodeModule } from 'ngx-barcode';
import { BarcodeComponent } from './barcode/barcode.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    ItemMasterComponent,
    PartListComponent,
    DashboardComponent,
    RightsideHeaderComponent,
    MainHeaderComponent,
    BarcodeComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      closeButton: true
    }),
    NgxBarcodeModule,
    NgxDatatableModule
  ],
  providers: [Location],
  bootstrap: [AppComponent]
})
export class AppModule { }

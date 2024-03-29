import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemMasterComponent } from './item-master/item-master.component';
import { PartListComponent } from './part-list/part-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RightsideHeaderComponent } from './rightside-header/rightside-header.component';
import { MainHeaderComponent } from './main-header/main-header.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemMasterComponent,
    PartListComponent,
    DashboardComponent,
    RightsideHeaderComponent,
    MainHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

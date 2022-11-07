import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PartListComponent } from '../app/part-list/part-list.component';
import {ItemMasterComponent } from '../app/item-master/item-master.component';
import { DashboardComponent } from '../app/dashboard/dashboard.component';

const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },    
    { path: 'partlist', component: PartListComponent },    
    { path: 'itemlist', component: ItemMasterComponent },    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

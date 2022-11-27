import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartListComponent } from '../app/part-list/part-list.component';
import { ItemMasterComponent } from '../app/item-master/item-master.component';
import { DashboardComponent } from '../app/dashboard/dashboard.component';
import { BarcodeComponent } from '../app/barcode/barcode.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'partlist', component: PartListComponent },
  { path: 'item-master', component: ItemMasterComponent },
  { path: 'barcode', component: BarcodeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

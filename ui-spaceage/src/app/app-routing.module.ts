import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartListComponent } from '../app/part-list/part-list.component';
import { ItemMasterComponent } from '../app/item-master/item-master.component';
import { DashboardComponent } from '../app/dashboard/dashboard.component';
import { BarcodeComponent } from '../app/barcode/barcode.component';
import { PicklableComponent } from '../app/picklable/picklable.component'
import { GunscannerComponent } from '../app/gunscanner/gunscanner.component'
import { LoginComponent } from '../app/login/login.component';
import { LogoutComponent } from '../app/logout/logout.component';
import { AuthGaurdService } from '../app/services/auth-gaurd.service';
import { AddComponents } from './project/add/add.component';
import { ProjectComponent } from './project/project.component';
import { AddComponent } from './customer/add/add.component';
import { CustomerComponent } from './customer/customer.component';
import { UploadFilesComponent } from './upload-files/upload-files.component'
import { DatatableComponent } from '../app/part-list/datatable/datatable.component'


const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent},
    { path: 'dashboard', component: DashboardComponent },
    { path: 'item-master', component: ItemMasterComponent },
    { path: 'partlist', component: DatatableComponent },
    { path: 'barcode', component: BarcodeComponent },

  /*{ path: 'dashboard', component: DashboardComponent },
    {
        path: 'item-master', component: ItemMasterComponent,
            data: {
            title: 'ItemMaster',
            breadcrumb: [
                {
                    label: 'ItemMaster',
                    url: ''
                }
            ]
        },
    },
    {
        path: 'item-master/partlist', component: PartListComponent,
        data: {
            title: 'PartList',
            breadcrumb: [
                {
                    label: 'ItemMaster',
                    url: '/item-master',
                },
                {
                    label: 'PartList',
                    url: '',
                },
            ]
        },
    },
    {
        path: 'item-master/partlist/barcode', component: BarcodeComponent,
            data: {
            title: 'Barcode',
            breadcrumb: [
                {
                    label: 'ItemMaster',
                    url: '/item-master',
                },
                {
                    label: 'PartList',
                    url: 'item-master/partlist',
                },
                {
                    label: 'Barcode',
                    url: '',
                },
            ]
        },
    },*/
  { path: 'picklable', component: PicklableComponent },
  { path: 'gunscanner', component: GunscannerComponent },
  /*{ path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },*/
  /*{ path: 'logout', component: LogoutComponent, canActivate: [AuthGaurdService] },*/
    { path: 'project', component: AddComponents },
    { path: 'customer', component: AddComponent },
  { path: 'image', component: UploadFilesComponent }
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

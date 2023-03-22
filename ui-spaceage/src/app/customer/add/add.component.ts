import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { ItemserviceService } from 'src/app/services/itemservice.service';
import { HttpClient } from '@angular/common/http';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { SortType } from '@swimlane/ngx-datatable';
declare var $: any;
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

    faEdit = faEdit;
    faRemove = faRemove;
    sortType = SortType.single;
    page = {
        totalElements: 0,
        pageNumber: 0,
        size: 10
    }
    sort = {
        sortByColumn: '',
        sortByMode: ''
    }
    loading = false;
    tempPolicy: any;
    policy: any;

    cus: Customer = new Customer();
    customerList: Array<any> =[];
    constructor(private itemService: ItemserviceService,
        private httpClient: HttpClient,
        private toastr: ToastrService) {

    }

    setPage(pageInfo: any) {
        this.page.pageNumber = pageInfo.offset;
        this.getCustomer();
    }

    ngOnInit(): void {
        this.setPage({ offset: 0 });
        this.tempPolicy = sessionStorage.getItem('policy')
        this.policy = JSON.parse(this.tempPolicy);

    }

    getCustomer() {
        this.itemService.getCustomerList().subscribe(
                {
                    next: res => {
                        this.loading = false;
                        this.customerList = [...res?.data];
                        this.page.totalElements = res?.totalElements;
                    },
                    error: error => {
                        this.loading = false;

                    }
                });
    }

    createCustomer() {

        this.itemService.customer(this.cus).subscribe(
            {
                next: data => {
                    this.toastr.success('Created Successfully!!!');
                    this.getCustomer();
                    this.closePopup();
                },
                error: error => {

                    this.toastr.error('Customer Code Already Present!!.');
                }
            });
    }
    updateCustomer(cus: any) {
        this.itemService.customer(cus).subscribe(
            {
                next: data => {
                    this.toastr.success('Updated Successfully!!!');
                    this.getCustomer();
                    this.closePopup();
                },
                error: error => {

                    this.toastr.error('Please Try Again!!.');
                }
            });
    }

    delete(id: any) {
        this.cus.customer_id = id;
        this.cus.deleteFlag = true;
        this.itemService.customer(this.cus).subscribe(
            {
                next: data => {
                    this.toastr.success('Deleted Successfully!!!');
                    this.getCustomer();
                    this.closePopup();
                },
                error: error => {

                    this.toastr.error('Please Try Again!!.');
                }
            });
    }

    openPopup() {
        this.cus = new Customer();
        $('#createItemModal').modal('show');

    }

    openEditPopup(cus: any) {
        this.cus = cus;
        $('#createItemModal').modal('show');
    }

    closePopup() {
        $('#createItemModal').modal('hide');
    }

}



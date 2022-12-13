import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { ItemserviceService } from 'src/app/services/itemservice.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
    cus: Customer = new Customer();
    constructor(private itemService: ItemserviceService,
        private httpClient: HttpClient,
        private toastr: ToastrService) {

    }

    createCustomer() {
       
        this.itemService.customer(this.cus).subscribe(
            {
                next: data => {
                    this.toastr.success('Created Successfully!!!');

                },
                error: error => {

                    this.toastr.error('Customer Code Already Present!!.');
                }
            });
    }

}

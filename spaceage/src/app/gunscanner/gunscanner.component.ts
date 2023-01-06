import { Component, OnInit } from '@angular/core';
import { ItemserviceService } from 'src/app/services/itemservice.service';
import { Gunscanner } from '../models/gunscanner';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-gunscanner',
    templateUrl: './gunscanner.component.html',
    styleUrls: ['./gunscanner.component.css']
})
export class GunscannerComponent implements OnInit {
    lotRefNo: any;
    gun: Gunscanner = new Gunscanner();

    radioTitle: string | undefined;
    radioItems: Array<string> | undefined;
    model = { option: 'Pick Label' };

    constructor(private itemService: ItemserviceService, private toastr: ToastrService,) {
        this.radioItems = ['Pick Label', 'Part Label'];
    }

    ngOnInit(): void {

    }
    barcodeScan() {
        this.gun.value = this.model.option;
        if (this.gun.value == "Pick Label") {
            this.gun.value = "pick"
        } else {
            this.gun.value = "part"
        }
        this.itemService.gunScanner(this.gun.barcode, this.gun.value).subscribe({
            next: res => {
                this.toastr.success(res.message);
            },
            error: error => {
                this.toastr.error(error.error.message);
            }
        });

    }
   /* getLotRefNo() {
      this.itemService.getLotRefNo().subscribe(data => {
      this.lotRefNo = data;

     },
         error => console.log(error));
   }*/
 }

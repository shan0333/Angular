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
    bomId: any;
    gun: Gunscanner = new Gunscanner();

    radioTitle: string | undefined;
    radioItems: Array<string> | undefined;
    model = { option: 'Pick Label' };
    enablePart: boolean=false;
    

    constructor(private itemService: ItemserviceService, private toastr: ToastrService,) {
        this.radioItems = ['Pick Label', 'Part Label'];
        this.enablePart = false;
    }

    ngOnInit(): void {
        this.enablePart = false;
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
                if (res.data != null) {
                    this.enablePart = res.data[0].enablePartLabel;
                    this.bomId = res.data[0].bomId;
                    this.lotRefNo = res.data[0].lot_ref_no;
                }
            },
            error: error => {
                this.enablePart = false;
                
                this.toastr.error("Please Scan valid Pick/Part Number");
            }
        });

    }
   
 }

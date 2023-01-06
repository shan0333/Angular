import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemserviceService } from 'src/app/services/itemservice.service';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faBarcode } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '@angular/common';
import { Case } from 'src/app/models/caselist';
import * as saveAs from 'file-saver';
declare var $: any;
@Component({
  selector: 'app-part-list',
  templateUrl: './part-list.component.html',
  styleUrls: ['./part-list.component.css']
})
export class PartListComponent implements OnInit {
    faFileDownload = faDownload;
    faBarcode = faBarcode;
    lotRefNo: any;
    partList: Array<any> = [];
    curr = formatDate(new Date(), 'dd-MM-yyyy', this.locale);
    

    constructor(private route: ActivatedRoute,
        private itemService: ItemserviceService,
        @Inject(LOCALE_ID) public locale: string) { }

    ngOnInit(): void {
        this.route.queryParams
            .subscribe(params => {
                this.lotRefNo = params;
            }
        );

       this.getBomById();
  }
    case: Case = new Case();
    bomObject: any;
    openPopup(p: any) {
        this.bomObject = p;

        $('#createItemModal').modal('show');
    }

    closePopup() {
        $('#createItemModal').modal('hide');
    }

   

  getBomById() {
     this.itemService.getBomById(this.lotRefNo.lotNo).subscribe(data => {
         this.partList = data;
         localStorage.setItem('picklable', JSON.stringify(this.partList));
     },
        error => console.log(error));
    }

    passObject(i:any) {
        localStorage.setItem('list', JSON.stringify(i));
    }
    pdfDownload(value: any) {
        this.itemService.pdfDownload(value).subscribe(
                blob => saveAs(blob, 'Bill_of_Material_Report_' + "_" + this.curr + '.pdf'));
    }


    createNewRecord(d: any, p: any) {
        p.netWeight = d.netWeight;
        p.grossWeight = d.grossWeight;
        this.itemService.createCaseRecord(p).subscribe(blob => saveAs(blob, 'CaseList' + "_" + this.curr + '.pdf'));
    }

      
}

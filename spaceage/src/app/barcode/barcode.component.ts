import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.css']
})
export class BarcodeComponent implements OnInit {
	barcodeListFirst: any = [];
	barcodeList: any = [];
	partList: any = []; 
	
	constructor(private router: ActivatedRoute) { }
	
	ngOnInit(): void {
		this.partList.push(localStorage.getItem("list"));

		console.log(JSON.parse(this.partList));

		this.barcodeListFirst.push(JSON.parse(this.partList));
		this.barcodeListFirst[0].totalNoOfPackingGroup
		if (this.barcodeListFirst[0].totalNoOfPackingGroup >1) {
			for (let i = 0; i < this.barcodeListFirst[0].totalNoOfPackingGroup; i++) {	
				this.barcodeList.push(JSON.parse(this.partList));
				this.barcodeList[i].barCodeNo = this.barcodeList[i].partNo + (i+1) + this.barcodeListFirst[0].totalNoOfPackingGroup;
				this.barcodeList[i].bomSlNo = i+1 + "-" + this.barcodeListFirst[0].totalNoOfPackingGroup;
				console.log(this.barcodeList);

			}
		}
		
  }

	/*printSerials = [{
		serialId: 'PRTLAMZ16460288041',
		name: 'A'
	},
	{
		serialId: 'PRTLAMZ16460288042',
		name: 'A'
		}];
 */
 
}

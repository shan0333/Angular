import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.css']
})
export class BarcodeComponent implements OnInit {
	barcodeList: any = [];
	partList: any = []; 
	
	constructor(private router: ActivatedRoute) { }
	
	ngOnInit(): void {
		this.partList.push(localStorage.getItem("list"));
		this.barcodeList.push(JSON.parse(this.partList));
		
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

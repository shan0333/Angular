import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { jsPDF } from 'jspdf';
import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { ItemserviceService } from 'src/app/services/itemservice.service';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.css']
})
export class BarcodeComponent implements OnInit {
	barcodeList: any = [];
	partList: any = []; 
    bomId: any;
	
	constructor(private router: ActivatedRoute,
		private itemService: ItemserviceService) { }
	
	ngOnInit(): void {
		this.router.queryParams
			.subscribe(params => {
				this.bomId = params;
			}
			);
		this.getBomByIdForBarcode();

		
	}

	getBomByIdForBarcode() {
		this.itemService.getBomByIdForBarcode(this.bomId.bomId).subscribe(data => {
			
			this.barcodeList = data;
			
		},
			error => console.log(error));
	}

	public print() {
		window.print();
	}
}

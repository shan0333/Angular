import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.css']
})
export class BarcodeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

	PrintSerials = [{
		SerialId: 'PRTLAMZ16460288041',
		Name: 'A'
	},
	{
		SerialId: 'PRTLAMZ16460288042',
		Name: 'A'
	}];
}

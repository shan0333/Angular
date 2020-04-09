import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-giftcard',
  templateUrl: './giftcard.component.html',
  styleUrls: ['./giftcard.component.css']
})
export class GiftcardComponent implements OnInit {

  cardValueCount:any; 
	cardValue:any;
	tempKey:any;
	isClicked = false;
	data:any=[{1:'50 SEK'}, {2:'100 SEK'}, {3:'500 SEK'}, {4:'1000 SEK'}, {5:'1500 SEK'}];
	constructor() {
	
	}

	
	ngOnInit() {
		this.cardValueCount = 0
	this.cardValue = '50 SEK'
	
		
	}

	

	
	onClick(value){
		this.cardValue = value
		var isClicked = true;
	}

	negative(key){
		debugger
		if (key != 0){
			this.tempKey = key-2
		key = key-1
			console.log(this.data[this.tempKey][key])
		this.cardValueCount = key
		this.cardValue = this.data[this.tempKey][key]
		}
	
	}
	
	positive(key){
		debugger
		if (key == 0){
			this.tempKey = key+1
		key = key  +2
		}else{
			this.tempKey = key
			key = key  +1
		}
		
		
		
		
		this.cardValueCount = key
		this.cardValue = this.data[this.tempKey][key]

	}



}


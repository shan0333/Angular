import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  active:string;
  cardImg:any; 
  constructor() {
  }

  ngOnInit() {
   this.cardImg = "gCard3"
   
 }

 
 imageDynamic(value){
   this.cardImg = value
 }



  // Detect route changes for active sidebar menu
  routeChanged(val){
    this.active = val.url;
  }

  
}


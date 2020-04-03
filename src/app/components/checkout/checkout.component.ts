import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  data:any 
  totalAmt:any
  constructor() { }

  ngOnInit() {
    this.getDetails()
    
  }

  getDetails() {
      this.data =[ {'product':'IKEA Gift card', 'quantity':1,
       'amount':100}, {'product':'BILLY', 'quantity':1,
       'amount':200}, {'product':'KIVIK', 'quantity':1,
       'amount':250},];
    
       this.getTotal()
  }
getTotal(){
  this.totalAmt = this.data.reduce(function(prev, cur) {
    return prev + cur.amount;
  }, 0);
 
}

}

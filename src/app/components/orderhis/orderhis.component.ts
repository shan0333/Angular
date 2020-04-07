import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orderhis',
  templateUrl: './orderhis.component.html',
  styleUrls: ['./orderhis.component.css']
})
export class OrderhisComponent implements OnInit {
  data:any
  data1:any
  data2:any 
  totalAmt:any
  constructor() { }

  ngOnInit() {
    this.getDetails()
    
  }

  getDetails() {
      this.data =[ {'number':'IKEA Gift card', 'quantity':1,
       'amount':100}, {'product':'BILLY', 'quantity':1,
       'amount':200}, {'product':'KIVIK', 'quantity':1,
       'amount':250},];


      this.data1 =[ {'number':'6278xxxx1234', 'status':'Active',
       'availamount':50, 'avail':50, 'remain':0}];
    
       this.data2 =[ {'number':'6278xxxx6787', 'status':'Active',
       'availamount':100, 'avail':100, 'remain':0}];

       this.getTotal()
  }
getTotal(){
  this.totalAmt = this.data.reduce(function(prev, cur) {
    return prev + cur.amount;
  }, 0);
 
}

}

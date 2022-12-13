import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-picklable',
  templateUrl: './picklable.component.html',
  styleUrls: ['./picklable.component.css']
})
export class PicklableComponent implements OnInit {
    partList: any = []; 
    picklableList: any = [];
    picklableListFinal: any = [];
    constructor() { }

    ngOnInit(): void {
        this.partList.push(localStorage.getItem("picklable"));
        this.picklableList.push(JSON.parse(this.partList[0]))
        for (let i = 0; i < this.picklableList[0].length; i++) {
            this.picklableListFinal.push(this.picklableList[0][i])
            this.picklableListFinal[i].barCodeNo = this.picklableList[0][i].bomNo + this.picklableList[0][i].partNo + this.picklableList[0][i].bomId;
                //+ (i + 1) + this.picklableList[0][i].totalNoOfPackingGroup;
            this.picklableListFinal[i].bomSlNo = i + 1 + "-" + this.picklableList[0][i].totalNoOfPackingGroup;
        }
        console.log(this.picklableListFinal)
    }


}

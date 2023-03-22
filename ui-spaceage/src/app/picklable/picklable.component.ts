import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemserviceService } from 'src/app/services/itemservice.service';

@Component({
  selector: 'app-picklable',
  templateUrl: './picklable.component.html',
  styleUrls: ['./picklable.component.css']
})
export class PicklableComponent implements OnInit {
    partList: any = []; 
    picklableList: any = [];
    picklableListFinal: any = [];
    lotRefNo: any;
    image: string | undefined;
    constructor(private route: ActivatedRoute,
        private itemService: ItemserviceService    ) { }

    ngOnInit(): void {
        this.route.queryParams
            .subscribe(params => {
                this.lotRefNo = params;
            }
        );
        this.getBomByIdForPicklable();
        
       /* this.partList.push(localStorage.getItem("picklable"));
        this.picklableList.push(JSON.parse(this.partList[0]))
        for (let i = 0; i < this.picklableList[0].length; i++) {
            this.picklableListFinal.push(this.picklableList[0][i])
            this.picklableListFinal[i].barCodeNo = this.picklableList[0][i].bomNo + this.picklableList[0][i].partNo + this.picklableList[0][i].bomId;
            //this.picklableListFinal[i].barCodeNo = this.picklableList[0][i].partNo + this.picklableList[0][i].bomId;
                //+ (i + 1) + this.picklableList[0][i].totalNoOfPackingGroup;
            this.picklableListFinal[i].bomSlNo = i + 1 + "-" + this.picklableList[0][i].totalNoOfPackingGroup;
        }*/
    }

    getBomByIdForPicklable() {
        this.itemService.getBomByIdForPicklable(this.lotRefNo.lotNo).subscribe(data => {
            this.partList.push(data);
            this.picklableList.push(this.partList[0])
            for (let i = 0; i < this.picklableList[0].length; i++) {
                this.picklableListFinal.push(this.picklableList[0][i])
                this.picklableListFinal[i].picByte = 'data:image/jpg;base64,' + atob(this.picklableList[0][i].picByte);
                this.picklableListFinal[i].barCodeNo = this.picklableList[0][i].bomNo + this.picklableList[0][i].partNo + this.picklableList[0][i].bomId;
                //this.picklableListFinal[i].barCodeNo = this.picklableList[0][i].partNo + this.picklableList[0][i].bomId;
                //+ (i + 1) + this.picklableList[0][i].totalNoOfPackingGroup;
                this.picklableListFinal[i].bomSlNo = i + 1 + "-" + this.picklableList[0][i].totalNoOfPackingGroup;
            }
        },
            error => console.log(error));
    }
}

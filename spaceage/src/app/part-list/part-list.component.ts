import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemserviceService } from 'src/app/services/itemservice.service';

@Component({
  selector: 'app-part-list',
  templateUrl: './part-list.component.html',
  styleUrls: ['./part-list.component.css']
})
export class PartListComponent implements OnInit {

    lotRefNo: any;
    partList: Array<any> = [];
    

    constructor(private route: ActivatedRoute, private itemService: ItemserviceService) { }

    ngOnInit(): void {
        this.route.queryParams
            .subscribe(params => {
                this.lotRefNo = params;
            }
        );

       this.getBomById();
  }

  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
  getBomById() {
     this.itemService.getBomById(this.lotRefNo.lotNo).subscribe(data => {
         this.partList = data;

     },
        error => console.log(error));
    }

    passObject(i:any) {
        localStorage.setItem('list', JSON.stringify(i));
    } 
}
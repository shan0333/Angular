import { Component, OnInit } from '@angular/core';
import { ItemserviceService } from 'src/app/services/itemservice.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-item-master',
  templateUrl: './item-master.component.html',
  styleUrls: ['./item-master.component.css']
})
export class ItemMasterComponent implements OnInit {
  selectedFile:any = null;
  resData: any;
 groups = [
     {
         sno: '1', refNo: 'CA0001', customerCode: 'AL', customerName: 'Ashok Leyland', customerLocation: 'Hosur', project: 'Car',
         projectDescription: 'Car parts',createdDate:'09-11-2022',destinationCustomerName:'Australia'
     },
     {
         sno: '2', refNo: 'CA0002', customerCode: 'AL', customerName: 'Ashok Leyland', customerLocation: 'Hosur', project: 'Car',
         projectDescription: 'Car parts',createdDate:'09-11-2022',destinationCustomerName:'England'
     }
];
  constructor(private itemService: ItemserviceService,private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    console.log(event.target.files[0])
    this.selectedFile = event.target.files[0]
  }

  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
  createNewRecord() {
    const payload = new FormData();
    payload.append('item', "Test");
    payload.append('file', this.selectedFile);

    console.log("Testtt");
    if (this.selectedFile) {
      this.httpClient
      .post('http://localhost:8080/api/csv/upload',
        payload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).subscribe((data: any) => {
        this.resData = data;
        console.log(this.resData);
      },error => {
        console.log('Log the error here: ', error);
    });
    
  }
     else {
      alert("Please select a file first")
    }
  }
}

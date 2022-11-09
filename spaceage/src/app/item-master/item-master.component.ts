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
    { firstName: 'John', lastName: 'Doe', age: '35', salary: 5000 },
    { firstName: 'Michael', lastName: 'Smith', age: '39', salary: 5000 },
    { firstName: 'Michael', lastName: 'Jordan', age: '45', salary: 7000 },
    { firstName: 'Tanya', lastName: 'Blake', age: '47', salary: 8000 }
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

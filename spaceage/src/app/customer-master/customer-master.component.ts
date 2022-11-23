import { Component, OnInit } from '@angular/core';
import { ItemserviceService } from 'src/app/services/itemservice.service';
import { HttpClient } from '@angular/common/http';
import { ItemMaster } from '../itemmaster';
import { FormGroup, FormBuilder, FormArray, AbstractControl, FormControl } from '@angular/forms';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-item-master',
  templateUrl: './item-master.component.html',
  styleUrls: ['./item-master.component.css']
})
export class ItemMasterComponent implements OnInit {
  selectedFile:any = null;
  resData: any;
  dataList: Array<any> = [];
  projectList: Array<any> = [];
  customerList: Array<any> = [];
  packagingTypeList: Array<any> = [];
  countryList: Array<any> = [];
  itemList: Array<any> = [];

  item: ItemMaster = new ItemMaster();
  userForm: FormGroup;
 groups = [
    { firstName: 'John', lastName: 'Doe', age: '35', salary: 5000 },
    { firstName: 'Michael', lastName: 'Smith', age: '39', salary: 5000 },
    { firstName: 'Michael', lastName: 'Jordan', age: '45', salary: 7000 },
    { firstName: 'Tanya', lastName: 'Blake', age: '47', salary: 8000 }
];
  
  constructor(private itemService: ItemserviceService,private httpClient: HttpClient, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      
      containers: this.fb.array([
        this.fb.control(null)
      ])
    })
    
   }

  ngOnInit(): void {
    this.getItem();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]
  }

  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
    this.getProject();
    this.getCustomer();
    this.getPackagingType();
    this.getCountry();
  }
  closePopup() {
    this.displayStyle = "none";
   
  }

  onSubmit() {
   
    this.createNewRecord();    
  }
  createNewRecord() {
    
    const payload = new FormData();
    this.item.containers = this.userForm.value.containers;
    payload.append('item', JSON.stringify(this.item));
    payload.append('file', this.selectedFile);
    console.log(JSON.stringify(this.item));
    console.log(this.userForm.value);
    if (this.selectedFile) {
      this.itemService.uploadfile(payload).subscribe(data => {
        console.log(data)
        
        this.userForm.reset();
      }, 
      error => console.log(error));
    }
    
     else {
      alert("Please select a file first")
      }
      this.getItem();
    
  }

  getItem(){
    this.itemService.getItem().subscribe(data => {
      this.itemList = data;
      
    }, 
    error => console.log(error));
  }

  getProject(){
    this.itemService.getProject().subscribe(data => {
      this.projectList = data;
      
    }, 
    error => console.log(error));
  }

  getCustomer(){
    this.itemService.getCustomer().subscribe(data => {
      this.customerList = data;
      
    }, 
    error => console.log(error));
  }

  getPackagingType(){
    this.itemService.getPackagingType().subscribe(data => {
      this.packagingTypeList = data;
      
    }, 
    error => console.log(error));
  }

  getCountry(){
    this.itemService.getCountry().subscribe(data => {
      this.countryList = data;
      
    }, 
    error => console.log(error));
  }

  addContainers(): void {
    (this.userForm.get('containers') as FormArray).push(
      this.fb.control(null)
    );
  }

  removeContainers(index: number) {
    (this.userForm.get('containers') as FormArray).removeAt(index);
  }

  getContainersFormControls(): AbstractControl[] {
    return (<FormArray> this.userForm.get('containers')).controls
  }

}

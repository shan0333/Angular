import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SortType } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { ItemserviceService } from 'src/app/services/itemservice.service';
import { itemMasterColumns } from '../config/data-table-config';
import { IGetItem } from '../interfaces/http-request-payload';
import { ItemMaster } from '../itemmaster';
declare var $: any;

@Component({
  selector: 'app-item-master',
  templateUrl: './item-master.component.html',
  styleUrls: ['./item-master.component.css']
})
export class ItemMasterComponent implements OnInit {
  selectedFile: any = null;
  resData: any;
  dataList: Array<any> = [];
  projectList: Array<any> = [];
  customerList: Array<any> = [];
  packagingTypeList: Array<any> = [];
  countryList: Array<any> = [];
  itemList: Array<any> = [];
  cols = [...itemMasterColumns];
  sortType = SortType.single;
  page = {
    totalElements: 0,
    pageNumber: 0,
    size: 10
  }
  sort = {
    sortByColumn: '',
    sortByMode: ''
  }
  loading = false;

  item: ItemMaster = new ItemMaster();
  userForm: FormGroup;
  groups = [
    { firstName: 'John', lastName: 'Doe', age: '35', salary: 5000 },
    { firstName: 'Michael', lastName: 'Smith', age: '39', salary: 5000 },
    { firstName: 'Michael', lastName: 'Jordan', age: '45', salary: 7000 },
    { firstName: 'Tanya', lastName: 'Blake', age: '47', salary: 8000 }
  ];

  constructor(
    private itemService: ItemserviceService,
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.userForm = this.fb.group({

      containers: this.fb.array([
        this.fb.control(null)
      ])
    })

  }

  ngOnInit(): void {
    this.setPage({ offset: 0 });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]
  }


  openPopup() {
    $('#createItemModal').modal('show');
    this.getProject();
    this.getCustomer();
    this.getPackagingType();
    this.getCountry();
  }

  closePopup() {
    $('#createItemModal').modal('hide');
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
      this.itemService.uploadfile(payload).subscribe(
        {
          next: data => {
            this.toastr.success(data?.message);
            console.log(data);
            this.userForm.reset();
            this.getItem();
            this.closePopup();
          },
          error: error => {
            console.log(error);
            this.toastr.error(error?.error?.message);
          }
        });
    }

    else {
      alert("Please select a file first");
    }
  }

  getItem() {
    const requestPayload: IGetItem = {
      sortByColumn: this.sort.sortByColumn,
      sortByMode: this.sort.sortByMode,
      offset: this.page.pageNumber * this.page.size,
      limit: this.page.size
    }
    this.itemService.getItem(requestPayload).subscribe(
      {
        next: res => {
          this.loading = false;
          this.itemList = [...res?.data];
          this.page.totalElements = res?.totalElements;
        },
        error: error => {
          this.loading = false;
          console.log(error);
        }
      });
  }

  getProject() {
    this.itemService.getProject().subscribe(data => {
      this.projectList = data;

    },
      error => console.log(error));
  }

  getCustomer() {
    this.itemService.getCustomer().subscribe(data => {
      this.customerList = data;

    },
      error => console.log(error));
  }

  getPackagingType() {
    this.itemService.getPackagingType().subscribe(data => {
      this.packagingTypeList = data;

    },
      error => console.log(error));
  }

  getCountry() {
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
    return (<FormArray>this.userForm.get('containers')).controls
  }

  setPage(pageInfo: any) {
    this.page.pageNumber = pageInfo.offset;
    this.getItem();
  }

  onSort(event: any) {
    this.loading = true;
    const sortObj = event?.sorts?.[0];
    this.sort.sortByColumn = sortObj?.prop;
    this.sort.sortByMode = sortObj?.dir;
    this.getItem();
  }

}

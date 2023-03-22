import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { ItemserviceService } from 'src/app/services/itemservice.service';
import { HttpClient } from '@angular/common/http';
import { ItemMaster } from 'src/app/models/itemmaster';
import { FormGroup, FormBuilder, FormArray, AbstractControl, FormControl } from '@angular/forms';
import { formatCurrency } from '@angular/common';
import { columns } from './data-table-config';
import { SortType } from '@swimlane/ngx-datatable';
import { IGetItem } from '../interfaces/http-request-payload';
import { ToastrService } from 'ngx-toastr';
import * as saveAs from 'file-saver';
import { formatDate } from '@angular/common';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/services/authentication.service';

declare var $: any;

@Component({
  selector: 'app-item-master',
  templateUrl: './item-master.component.html',
  styleUrls: ['./item-master.component.css']
})
export class ItemMasterComponent implements OnInit {
    faFileDownload = faDownload;
    faPlusSquare = faPlusCircle;
    faMinusCircle = faMinusCircle;
    curr = formatDate(new Date(), 'dd-MM-yyyy', this.locale);
  selectedFile: any = null;
  resData: any;
  dataList: Array<any> = [];
  projectList: Array<any> = [];
  customerList: Array<any> = [];
  packagingTypeList: Array<any> = [];
  countryList: Array<any> = [];
  itemList: Array<any> = [];
  cols = [...columns];
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
    hideLotRefNo: boolean | undefined;
    hideUpload: boolean | undefined;
    selectedProjects: String | undefined;
    selectedCustomer: any;
    tempPolicy: any;
    policy: any;

  constructor(
    private itemService: ItemserviceService,
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private toastr: ToastrService,
      @Inject(LOCALE_ID) public locale: string,
      private loginService: AuthenticationService  ) { 
  
    this.userForm = this.fb.group({

      containers: this.fb.array([
        this.fb.control(null)
      ])
    })

  }
    


    ngOnInit(): void {

      this.setPage({ offset: 0 });
        this.getProject();
        this.tempPolicy = sessionStorage.getItem('policy')
        this.policy = JSON.parse(this.tempPolicy);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]
  }


    openPopup() {
        this.item = new ItemMaster();
    this.getProject();
    this.getCustomer();
    this.getPackagingType();
      this.getCountry();
      this.hideLotRefNo = false;
      this.hideUpload = false;
      $('#createItemModal').modal('show');
    }

    openEditPopup(item: any) {
        $('#editModal').modal('show');
        this.item = item;
        this.selectedProjects = this.item.project_name;
        this.hideLotRefNo = true;
        this.hideUpload = true;
       
        this.getCustomer();
        this.getPackagingType();
        this.getCountry();
        console.log(this.selectedProjects);
        this.selectedCustomer = item.customer_id;
        
       // this.selectedProjects = item.project_id;
        console.log(this.selectedProjects);
    }


   

    closePopup() {
        this.item = new ItemMaster();
      $('#createItemModal').modal('hide');
     
    }

    editClosePopup() {
       // this.item = new ItemMaster();
       
        $('#editModal').modal('hide');
        
    }

  onSubmit() {

    this.createNewRecord();
  }
  createNewRecord() {

    const payload = new FormData();
    this.item.containers = this.userForm.value.containers;
    payload.append('item', JSON.stringify(this.item));
    payload.append('file', this.selectedFile);
    
    if (this.selectedFile) {
      this.itemService.uploadfile(payload).subscribe(
        {
          next: data => {
            this.toastr.success(data.message);
           
            this.userForm.reset();
            this.getItem();
            this.closePopup();
          },
          error: error => {
            
            this.toastr.error(error.error.message);
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
      limit: this.page.size,

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
         
        }
      });
    }

    UpdateRecord(item: any) {
        this.item = item;
        
        this.itemService.itemUpdate(this.item).subscribe(
            {
                next: data => {
                    this.toastr.success('Updated Successfully!!!');
                    this.getItem();
                    this.closePopup();
                },
                error: error => {

                    this.toastr.error('Please Try Again!!.');
                }
            });
    }

    delete(id: any) {
        this.item.item_id = id;
        this.item.deleteFlag = true;
        this.itemService.itemUpdate(this.item).subscribe(
            {
                next: data => {
                    this.toastr.success('Deteted Successfully!!!');
                    this.getItem();
                    this.closePopup();
                },
                error: error => {

                    this.toastr.error('Please Try Again!!.');
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

    fileDownload(value: any) {
        
      this.itemService.fileDownload(value).subscribe(
          blob => saveAs(blob, 'Bill_of_Material_Report_'+value+"_" + this.curr + '.xlsx'));
  }

}

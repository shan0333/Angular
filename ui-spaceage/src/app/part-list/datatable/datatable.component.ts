import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { ItemserviceService } from 'src/app/services/itemservice.service';
import { HttpClient } from '@angular/common/http';
import { ItemMaster } from 'src/app/models/itemmaster';
import { FormGroup, FormBuilder, FormArray, AbstractControl, FormControl } from '@angular/forms';
import { formatCurrency } from '@angular/common';
import { columns } from './data-table-config';
import { SortType } from '@swimlane/ngx-datatable';
import { IGetPart} from '../../interfaces/http-partlist-payload';
import { ToastrService } from 'ngx-toastr';
import * as saveAs from 'file-saver';
import { formatDate } from '@angular/common';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { faBarcode } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PartList } from '../../models/partlist';
import { ActivatedRoute } from '@angular/router';
import { Case } from 'src/app/models/caselist';
import { Search } from '../../models/Search';

declare var $: any;

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent {
    faFileDownload = faDownload;
    faBarcode = faBarcode;
    faEdit = faEdit;
    faRemove = faRemove;
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

    item: PartList = new PartList();
    userForm: FormGroup;
    lotNo: string | undefined;
    lotRefNo: any;

    partNo: any;
    bomNo: any;
    tempPolicy: any;
    policy: any;

    constructor(
        private itemService: ItemserviceService,
        private httpClient: HttpClient,
        private fb: FormBuilder,
        private toastr: ToastrService,
        @Inject(LOCALE_ID) public locale: string,
        private loginService: AuthenticationService,
        private route: ActivatedRoute) {

        this.userForm = this.fb.group({

            containers: this.fb.array([
                this.fb.control(null)
            ])
        })

    }

    case: Case = new Case();
    bomObject: any;
    openPopup(p: any) {
        this.bomObject = p;

        $('#createItemModal').modal('show');
    }

    closePopup() {
        $('#createItemModal').modal('hide');
    }


    ngOnInit(): void {

        this.route.queryParams
            .subscribe(params => {
                this.lotRefNo = params;
                this.lotNo = params['lotNo'];
            }
            );

        this.setPage({ offset: 0 });
        this.tempPolicy = sessionStorage.getItem('policy')
        this.policy = JSON.parse(this.tempPolicy);

    }

    getItem() {
        const requestPayload: IGetPart = {
            sortByColumn: this.sort.sortByColumn,
            sortByMode: this.sort.sortByMode,
            offset: this.page.pageNumber * this.page.size,
            limit: this.page.size,
            key: this.lotRefNo.lotNo
        }
        this.itemService.getBomById(requestPayload).subscribe(
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

    createNewRecord(d: any, p: any) {
        p.netWeight = d.netWeight;
        p.grossWeight = d.grossWeight;
        this.itemService.createCaseRecord(p).subscribe(blob => saveAs(blob, 'CaseList' + "_" + this.curr + '.pdf'));
    }

    CreateRecord(item: any) {
        this.item.lot_ref_no = this.lotNo;
        this.item = item;
        this.itemService.partCreation(this.item).subscribe(
            {
                next: data => {
                    this.toastr.success('Created Successfully!!!');
                    this.getItem();
                    this.partClosePopup();
                },
                error: error => {

                    this.toastr.error('Please Try Again!!.');
                }
            });
    }

    UpdateRecord(item: any) {
        this.item = item;
        this.item.lot_ref_no = this.lotNo;
        this.itemService.partCreation(this.item).subscribe(
            {
                next: data => {
                    this.toastr.success('Updated Successfully!!!');
                    this.getItem();
                    this.partClosePopup();
                },
                error: error => {

                    this.toastr.error('Please Try Again!!.');
                }
            });
    }

    delete(id: any) {
        this.item.bomId = id;
        this.item.deleteFlag = true;
        this.itemService.partCreation(this.item).subscribe(
            {
                next: data => {
                    this.toastr.success('Deleted Successfully!!!');
                    this.getItem();
                    this.partClosePopup();
                },
                error: error => {

                    this.toastr.error('Please Try Again!!.');
                }
            });
    }

    

    search(partNo: any, bomNo: any) {
        const payload: Search = {
            part_no: partNo,
            bomid: bomNo,
            lot_ref_no: this.lotNo
            } 
        this.itemService.search(payload).subscribe(
            {
                next: res => {
                    
                    this.itemList = [...res?.data];
                   
                },
                error: error => {
                    

                }
            });
    }

    
    partOpenPopup(p: any) {
        this.item = p;

        $('#partModal').modal('show');
    }

    partClosePopup() {
        $('#partModal').modal('hide');
    }

    createPartOpenPopup() {
        this.item = new PartList();

        $('#partModal').modal('show');
    }
}

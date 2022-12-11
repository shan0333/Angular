import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SortType } from '@swimlane/ngx-datatable';
import { ItemserviceService } from 'src/app/services/itemservice.service';
import { partListColumns } from '../config/data-table-config';
import { GlobalDataService } from '../services/global-data.service';

@Component({
  selector: 'app-part-list',
  templateUrl: './part-list.component.html',
  styleUrls: ['./part-list.component.css']
})
export class PartListComponent implements OnInit {

  lotRefNo: any;
  partList: Array<any> = [];
  cols = [...partListColumns];
  sortType = SortType.single;
  page = {
    totalElements: 100,
    pageNumber: 0,
    size: 10
  }
  sort = {
    sortByColumn: '',
    sortByMode: ''
  }
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemserviceService,
    private globalDataService: GlobalDataService
  ) { }

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

  onClickPartLabel(partDetails: any) {
    this.globalDataService.partDetails$.next(partDetails);
    localStorage.setItem('list', JSON.stringify(partDetails));
  }

  setPage(event: any) {

  }

  onSort(event: any) {

  }
}

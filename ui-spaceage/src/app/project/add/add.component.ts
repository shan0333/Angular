import { Component } from '@angular/core';
import { SortType } from '@swimlane/ngx-datatable';
import { Project } from '../../models/project';
declare var $: any;
import { ItemserviceService } from 'src/app/services/itemservice.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faRemove } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponents {
    faEdit = faEdit;
    faRemove = faRemove;
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

    pro: Project = new Project();
    projectList: Array<any> = [];
    tempPolicy: any;
    policy: any;
    constructor(private itemService: ItemserviceService,
        private httpClient: HttpClient,
        private toastr: ToastrService) {

    }

    setPage(pageInfo: any) {
        this.page.pageNumber = pageInfo.offset;
        this.getProject();
    }

    ngOnInit(): void {
        this.setPage({ offset: 0 });
        this.tempPolicy = sessionStorage.getItem('policy')
        this.policy = JSON.parse(this.tempPolicy);

    }

    getProject() {
        this.itemService.getProjectList().subscribe(
            {
                next: res => {
                    this.loading = false;
                    this.projectList = [...res?.data];
                    this.page.totalElements = res?.totalElements;
                },
                error: error => {
                    this.loading = false;

                }
            });
    }

    createProject() {

        this.itemService.project(this.pro).subscribe(
            {
                next: data => {
                    this.toastr.success('Created Successfully!!!');
                    this.getProject();
                    this.closePopup();
                },
                error: error => {

                    this.toastr.error('Project Code Already Present!!.');
                }
            });
    }

    updateProject(pro:any) {
        this.itemService.project(pro).subscribe(
            {
                next: data => {
                    this.toastr.success('Updated Successfully!!!');
                    this.getProject();
                    this.closePopup();
                },
                error: error => {

                    this.toastr.error('Please Try Again!!.');
                }
            });
    }

    delete(id: any) {
        this.pro.project_id = id;
        this.pro.deleteFlag = true;
        this.itemService.project(this.pro).subscribe(
            {
                next: data => {
                    this.toastr.success('Deleted Successfully!!!');
                    this.getProject();
                    this.closePopup();
                },
                error: error => {

                    this.toastr.error('Please Try Again!!.');
                }
            });
    }

    openPopup() {
        this.pro = new Project();
        $('#createItemModal').modal('show');

    }

    openEditPopup(pro: any) {
        this.pro = pro;
        $('#createItemModal').modal('show');
    }

    closePopup() {
        $('#createItemModal').modal('hide');
    }

}
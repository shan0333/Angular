import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Project } from 'src/app/models/project';
import { ItemserviceService } from 'src/app/services/itemservice.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {

    pro: Project = new Project();
    constructor(private itemService: ItemserviceService,
        private httpClient: HttpClient,
        private toastr: ToastrService) {

    }
    
    createProject() {
       

        this.itemService.project(this.pro).subscribe(
            {
                next: data => {
                    this.toastr.success('Created Successfully!!!');

                },
                error: error => {

                    this.toastr.error('Project Code Already Present!!.');
                }
            });
    }

    }


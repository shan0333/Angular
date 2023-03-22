import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemserviceService } from 'src/app/services/itemservice.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent {
    selectedFiles?: FileList;
    progressInfos: any[] = [];
    message: string[] = [];

    radioTitle: string | undefined;
    radioItems: Array<string> | undefined;
    model = { option: 'Pick Label' };

    fileInfos?: Observable<any>;

    constructor(private uploadService: ItemserviceService) {
        this.radioItems = ['Part', 'Case'];
    }

    ngOnInit(): void {
        //this.fileInfos = this.uploadService.getFiles();
    }

    selectFiles(event: any): void {
        this.message = [];
        this.progressInfos = [];
        this.selectedFiles = event.target.files;
    }

    upload(idx: number, file: File): void {

        var extension = file.name.substr(file.name.lastIndexOf('.'));
        let flag = false;
        if (extension.toLowerCase() == ".png") {
            flag = true;
            this.progressInfos[idx] = { value: 0, fileName: file.name };
        }
        if (!flag) {
                if (extension.toLowerCase() == ".jpeg") {
                    flag = true
                    this.progressInfos[idx] = { value: 0, fileName: file.name };
                } else if (extension.toLowerCase() == ".jpg") {
                    flag = true
                    this.progressInfos[idx] = { value: 0, fileName: file.name };
                } else {
                    alert("Please upload only .png or .jpeg files");
                }
        }
        
       if (flag) { 
        if (file) {
            this.uploadService.uploadImage(file).subscribe({
                next: (event: any) => {
                    if (event.type === HttpEventType.UploadProgress) {
                        this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
                    } else if (event instanceof HttpResponse) {
                        const msg = 'Uploaded the file successfully: ' + file.name;
                        this.message.push(msg);
                        //this.fileInfos = this.uploadService.getFiles();
                    }
                },
                error: (err: any) => {
                    this.progressInfos[idx].value = 0;
                    const msg = 'Could not upload the file: ' + file.name;
                    this.message.push(msg);
                    //this.fileInfos = this.uploadService.getFiles();
                }
            });
        }
       }
    }

    uploadFiles(): void {
        this.message = [];

        if (this.selectedFiles) {
            for (let i = 0; i < this.selectedFiles.length; i++) {
                this.upload(i, this.selectedFiles[i]);
            }
        }
    }
}
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URLS } from '../constants/url-constants';
import { IGetPart } from '../interfaces/http-partlist-payload';
import { IGetItem } from '../interfaces/http-request-payload';

@Injectable({
    providedIn: 'root'
})
export class ItemserviceService {

   //ROOT_URI: String = "http://spaceage-env.eba-b36hrahx.us-east-2.elasticbeanstalk.com/api/"
    ROOT_URI: String ="http://Devspaceage-env.eba-6m34gmba.us-east-2.elasticbeanstalk.com/api/"

   //ROOT_URI: String = "http://localhost:5000/api/"

    headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': ""+sessionStorage.getItem('token')
    });

    headers_object_for_fileUpload = new HttpHeaders({
        'Authorization': "" + sessionStorage.getItem('token')
    });

 httpOptions = {
    headers: this.headers_object
    };
    httpOptionsForFileUpload = {
        headers: this.headers_object_for_fileUpload
    };

    constructor(private httpClient: HttpClient) { }

    public uploadfile(payload: any): Observable<any> {
        return this.httpClient.post(this.ROOT_URI + "upload", payload, this.httpOptionsForFileUpload);
    }

    getItem(payload: IGetItem): Observable<any> {
        
        return this.httpClient.post(this.ROOT_URI + "item-master", payload, this.httpOptions);
    }

    public getProject(): Observable<any> {
        return this.httpClient.get(this.ROOT_URI + "project", this.httpOptions);
    }

    getProjectList(): Observable<any> {
        return this.httpClient.get(this.ROOT_URI + "getProject", this.httpOptions);
    }

    getCustomer(): Observable<any> {
        return this.httpClient.get(this.ROOT_URI + "customer", this.httpOptions);
    }

    getCustomerList(): Observable<any> {
        return this.httpClient.get(this.ROOT_URI + "getCustomer", this.httpOptions);
    }

    getPackagingType(): Observable<any> {
        return this.httpClient.get(this.ROOT_URI + "packagingtype", this.httpOptions);
    }

    getCountry(): Observable<any> {
        return this.httpClient.get(this.ROOT_URI + "country", this.httpOptions);
    }

    /*getBomById(id: any): Observable<any> {
        return this.httpClient.get(this.ROOT_URI + "bombyid/" + id, this.httpOptions);
    }*/

    getBomById(payload: IGetPart): Observable<any> {

        return this.httpClient.post(this.ROOT_URI + "bombyid", payload, this.httpOptions);
    }

    gunScanner(barcode: any, value: any): Observable<any> {
        return this.httpClient.get(this.ROOT_URI + "gunscanner/" + barcode + "/" + value, this.httpOptions);
    }

    project(payload: any): Observable<any> {
        return this.httpClient.post(this.ROOT_URI + "createProject", payload, this.httpOptions);
    }

    customer(payload: any): Observable<any> {
        return this.httpClient.post(this.ROOT_URI + "createCustomer", payload, this.httpOptions);
    }

    partCreation(payload: any): Observable<any> {
        return this.httpClient.post(this.ROOT_URI + "createPart", payload, this.httpOptions);
    }

    getLotRefNo(): Observable<any> {
        return this.httpClient.get(this.ROOT_URI + "lotrefno", this.httpOptions);
    }

    fileDownload(value: any): Observable<any> {
        
        return this.httpClient.get(this.ROOT_URI + "download/" + value, {
            headers: this.headers_object, responseType: 'blob'
        });

    }

    pdfDownload(value: any): Observable<any> {
        
        return this.httpClient.post(this.ROOT_URI + "caseList", value,{
            headers: this.headers_object, responseType: 'blob'

        });

    }

    createCaseRecord(p:any): Observable<any> {
        return this.httpClient.post(this.ROOT_URI + "case", p, {
            headers: this.headers_object, responseType: 'blob'
            });
    }

   /* upload(file: File): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();

        formData.append('file', file);

        const req = new HttpRequest('POST', this.ROOT_URI/upload`, formData, {
            reportProgress: true,
            responseType: 'json'
        });

        return this.http.request(req);
    }*/

    public uploadImage(file: File): Observable<any> {
        const formData: FormData = new FormData();

        formData.append('imageFile', file);
        return this.httpClient.post(this.ROOT_URI + "imgupload", formData, this.httpOptionsForFileUpload);
    }

   /* getFiles(): Observable<any> {
        return this.httpClient.get(this.ROOT_URI+'files');
    }*/

    getBomByIdForPicklable(id: any): Observable<any> {
        return this.httpClient.get(this.ROOT_URI + "bomByIdForPicklable/" + id, this.httpOptions);
    }

    getBomByIdForBarcode(id: any): Observable<any> {
        return this.httpClient.get(this.ROOT_URI + "bomByIdForBarcode/" + id, this.httpOptions);
    }

    search(payload: any): Observable<any> {

        return this.httpClient.post(this.ROOT_URI + "search", payload, this.httpOptions);
    }

    itemUpdate(item: any): Observable<any> {
        return this.httpClient.post(this.ROOT_URI + "itemUpdate", item, this.httpOptions);
    }

}  
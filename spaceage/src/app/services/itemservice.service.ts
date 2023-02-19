import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URLS } from '../constants/url-constants';
import { IGetItem } from '../interfaces/http-request-payload';

@Injectable({
    providedIn: 'root'
})
export class ItemserviceService {

    ROOT_URI: String = "http://spaceage-env.eba-qf52mubb.us-east-2.elasticbeanstalk.com/api/"

   //ROOT_URI: String = "http://localhost:5000/api/"

    headers_object = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': ""+sessionStorage.getItem('token')
    });

 httpOptions = {
    headers: this.headers_object
};

    constructor(private httpClient: HttpClient) { }

    public uploadfile(payload: any): Observable<any> {
        return this.httpClient.post(this.ROOT_URI + "upload", payload, this.httpOptions);
    }

    getItem(payload: IGetItem): Observable<any> {
        
        return this.httpClient.post(this.ROOT_URI + "item-master", payload, this.httpOptions);
    }

    public getProject(): Observable<any> {
        return this.httpClient.get(this.ROOT_URI + "project", this.httpOptions);
    }

    public getCustomer(): Observable<any> {
        return this.httpClient.get(this.ROOT_URI + "customer", this.httpOptions);
    }

    getPackagingType(): Observable<any> {
        return this.httpClient.get(this.ROOT_URI + "packagingtype", this.httpOptions);
    }

    getCountry(): Observable<any> {
        return this.httpClient.get(this.ROOT_URI + "country", this.httpOptions);
    }

    getBomById(id: any): Observable<any> {
        return this.httpClient.get(this.ROOT_URI + "bombyid/" + id, this.httpOptions);
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

}
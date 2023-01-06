import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URLS } from '../constants/url-constants';
import { IGetItem } from '../interfaces/http-request-payload';

@Injectable({
    providedIn: 'root'
})
export class ItemserviceService {

    ROOT_URI: String = "http://spaceagev02-env.eba-stvf92rb.us-east-2.elasticbeanstalk.com/api/"

    //ROOT_URI: String = "http://localhost:5000/api/"

    constructor(private httpClient: HttpClient) { }

    public uploadfile(payload: any): Observable<any> {
        return this.httpClient.post(this.ROOT_URI + "upload", payload);
    }

    getItem(payload: IGetItem): Observable<any> {
        return this.httpClient.post(this.ROOT_URI + "item-master", payload);
    }

    public getProject(): Observable<any> {
        return this.httpClient.get(this.ROOT_URI + "project");
    }

    public getCustomer(): Observable<any> {
        return this.httpClient.get(this.ROOT_URI + "customer");
    }

    getPackagingType(): Observable<any> {
        return this.httpClient.get(this.ROOT_URI + "packagingtype");
    }

    getCountry(): Observable<any> {
        return this.httpClient.get(this.ROOT_URI + "country");
    }

    getBomById(id: any): Observable<any> {
        return this.httpClient.get(this.ROOT_URI + "bombyid/" + id);
    }

    gunScanner(barcode: any, value: any): Observable<any> {
        return this.httpClient.get(this.ROOT_URI + "gunscanner/" + barcode + "/" + value);
    }

    project(payload: any): Observable<any> {
        return this.httpClient.post(this.ROOT_URI + "createProject", payload);
    }

    customer(payload: any): Observable<any> {
        return this.httpClient.post(this.ROOT_URI + "createCustomer", payload);
    }
    getLotRefNo(): Observable<any> {
        return this.httpClient.get(this.ROOT_URI + "lotrefno");
    }

    fileDownload(value: any): Observable<Blob> {
        
       return this.httpClient.get(this.ROOT_URI + "download/"+value,  {
            responseType: 'blob'
        });

    }

    pdfDownload(value: any): Observable<any> {
        console.log(value);
        return this.httpClient.post(this.ROOT_URI + "caseList", value,{
            responseType: 'blob'

        });

    }

    createCaseRecord(p:any): Observable<any> {
        return this.httpClient.post(this.ROOT_URI + "case", p,{
                responseType: 'blob'
            });
    }

}
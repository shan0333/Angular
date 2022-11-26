import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGetItem } from '../interfaces/http-request-payload';

@Injectable({
  providedIn: 'root'
})
export class ItemserviceService {

  baseUrl = 'http://localhost:8080/api/csv/';
  id: string;

  constructor(private httpClient: HttpClient) { }

  public uploadfile(payload: any): Observable<any> {

    return this.httpClient.post(this.baseUrl + 'upload', payload);
  }
  getItem(payload: IGetItem): Observable<any> {
    return this.httpClient.post(this.baseUrl + 'item', payload);
  }

  public getProject(): Observable<any> {

    return this.httpClient.get(this.baseUrl + 'project');
  }

  public getCustomer(): Observable<any> {

    return this.httpClient.get(this.baseUrl + 'customer');
  }

  getPackagingType(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'packagingtype');
  }

  getCountry(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'country');
  }

  getBomById(id: any): Observable<any> {
    console.log(id);
    console.log(this.baseUrl + 'bombyid/' + id)
    return this.httpClient.get(this.baseUrl + 'bombyid/' + id);
  }

}
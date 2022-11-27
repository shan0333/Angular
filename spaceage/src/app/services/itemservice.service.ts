import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URLS } from '../constants/url-constants';
import { IGetItem } from '../interfaces/http-request-payload';

@Injectable({
  providedIn: 'root'
})
export class ItemserviceService {

  constructor(private httpClient: HttpClient) { }

  public uploadfile(payload: any): Observable<any> {
    return this.httpClient.post(`${API_URLS.UPLOAD_FILE}`, payload);
  }

  getItem(payload: IGetItem): Observable<any> {
    return this.httpClient.post(`${API_URLS.ITEM_MASTER}`, payload);
  }

  public getProject(): Observable<any> {
    return this.httpClient.get(`${API_URLS.PROJECT}`);
  }

  public getCustomer(): Observable<any> {
    return this.httpClient.get(`${API_URLS.CUSTOMER}`);
  }

  getPackagingType(): Observable<any> {
    return this.httpClient.get(`${API_URLS.PACKAGING_TYPE}`);
  }

  getCountry(): Observable<any> {
    return this.httpClient.get(`${API_URLS.COUNTRY}`);
  }

  getBomById(id: any): Observable<any> {
    console.log(id);
    console.log(`${API_URLS.GET_BOMBY_ID(id)}`)
    return this.httpClient.get(`${API_URLS.GET_BOMBY_ID(id)}`);
  }

}
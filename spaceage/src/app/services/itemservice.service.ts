import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 
@Injectable({
 providedIn: 'root'
})
export class ItemserviceService {
  
 baseUrl = 'http://localhost:8080/api/csv/';

 constructor(private httpClient: HttpClient) { }
 
 public uploadfile(payload: any) :Observable<any>{
  
   return this.httpClient.post(this.baseUrl+'upload', payload);
 }
 getItem() :Observable<any>{
  return this.httpClient.get(this.baseUrl+'item');
}

 public getProject() :Observable<any>{
  
  return this.httpClient.get(this.baseUrl+'project');
}

public getCustomer() :Observable<any>{
  
  return this.httpClient.get(this.baseUrl+'customer');
}

getPackagingType()  :Observable<any>{
  return this.httpClient.get(this.baseUrl+'packagingtype');
}

getCountry()  :Observable<any>{
  return this.httpClient.get(this.baseUrl+'country');
}

}
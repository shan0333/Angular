import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
 
@Injectable({
 providedIn: 'root'
})
export class ItemserviceService {
 
 constructor(
   private httpClient: HttpClient,
 ) { }
 
 public uploadfile(payload: any) :Observable<any>{
  
   return this.httpClient.get('http://localhost:8080/api/csv/upload', payload)
 }
}
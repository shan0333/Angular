import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {
  partList$: Subject<any> = new Subject<any>();
  partDetails$: Subject<any> = new Subject<any>();
  constructor() { }
}

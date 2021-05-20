import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatashareService {
  SharingData: Subject<any> = new Subject<any>();
constructor() { }

}

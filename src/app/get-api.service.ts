import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IFaq} from "../app/interface/FAQ/i-faq";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetAPIService {
  private apiUrl = 'http://localhost'; // Replace with your PHP server URL

  constructor(private http: HttpClient) { }

  getSomeData():Observable<IFaq[]>{
    var result = this.http.get<IFaq[]>(`${this.apiUrl}/dbBridge.php`);
    return result;
  }
}

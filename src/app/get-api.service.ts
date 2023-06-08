import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GetAPIService {
  private apiUrl = 'http://localhost'; // Replace with your PHP server URL

  constructor(private http: HttpClient) { }

  getSomeData() {
    var result = this.http.get(`${this.apiUrl}/dbBridge.php`);
    return result;
  }
}

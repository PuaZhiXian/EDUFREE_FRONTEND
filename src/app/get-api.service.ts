import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IFaq} from "../app/interface/FAQ/i-faq";
import {ICourseCategory} from "../app/interface/courses/i-course-category";
import {ICourseDetail} from "../app/interface/courses/i-course-detail";
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetAPIService {
  private apiUrl = 'http://localhost/finalbackendgithub/wie2002backend/finalbackend'; // Replace with your PHP server URL

  constructor(private http: HttpClient) {
  }

  getFaq(): Observable<IFaq[]> {
    var result = this.http.get<IFaq[]>(`${this.apiUrl}/db_getFaq.php`);
    return result;
  } 

  getCourseList(): Observable<ICourseCategory[]>{
    var result = this.http.get<ICourseCategory[]>(`${this.apiUrl}/db_getICourseCategory.php`);
    return result;
  }

  getRecommendedCourseList(): Observable<ICourseDetail[]>{
    var result = this.http.get<ICourseDetail[]>(`${this.apiUrl}/db_GetRecommendCourse.php`);
    return result;
  }
}

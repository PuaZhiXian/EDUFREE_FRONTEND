import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IFaq} from "../app/interface/FAQ/i-faq";
import {ICourseCategory} from "../app/interface/courses/i-course-category";
import {ICourseDetail} from "../app/interface/courses/i-course-detail";
import {ISingleCourseDetail} from "../app/interface/courses/i-single-course-detail";
import {ILearning} from "../app/interface/learning/i-learning";
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetAPIService {
  private courseId: String|null = '';
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
    var result = this.http.get<ICourseDetail[]>(`${this.apiUrl}/db_getRecommendCourse.php`);
    return result;
  }

  getSingleCourseDetail(param: string|null): Observable<ISingleCourseDetail>{
    var result = this.http.get<ISingleCourseDetail>(`${this.apiUrl}/db_getCourseDetail.php?param=${param}`);
    return result;
  }

  getLearningDetails(param: string|null): Observable<ILearning>{
    var result = this.http.get<ILearning>(`${this.apiUrl}/db_getLearningDetail.php?param=${param}`);
    return result;
  }
}

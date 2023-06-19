import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IFaq} from "../app/interface/FAQ/i-faq";
import {ICourseCategory} from "../app/interface/courses/i-course-category";
import {ICourseDetail} from "../app/interface/courses/i-course-detail";
import {ISingleCourseDetail} from "../app/interface/courses/i-single-course-detail";
import {ILearning} from "../app/interface/learning/i-learning";
import {ILogin} from "../app/interface/login/i-login";
import {IRegister} from "../app/interface/login/i-register";
import { IMyLearning, IMyLearningCategory } from "../app/interface/learning/i-my-learning";
import { ICourseProgress } from "../app/interface/courses/i-progress";
import {ILogout} from "../app/interface/login/i-logout";
import { IColumnDataPoints } from "../app/interface/chart/i-column-data-points";
import {IMyTeaching} from "../app/interface/learning/i-my-teaching";
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

  login(param: any): Observable<ILogin>{
    var result = this.http.post<ILogin>(`${this.apiUrl}/db_getLogin.php`, param);
    return result;
  }

  logout(param: any): Observable<ILogout>{
    var result = this.http.post<ILogout>(`${this.apiUrl}/db_getLogout.php`, param);
    return result;
  }

  getUserCourse(param: any): Observable<IMyLearning[]>{
    var result = this.http.post<IMyLearning[]>(`${this.apiUrl}/db_getUserCourses.php`, param);
    return result;
  }

  getUserCategory(param: any): Observable<IMyLearningCategory[]>{
    var result = this.http.get<IMyLearningCategory[]>(`${this.apiUrl}/db_getUserCourseCategory.php?param=${param}`);
    return result;
  }

  getChartDay(): Observable<IColumnDataPoints[]>{
    var result = this.http.get<IColumnDataPoints[]>(`${this.apiUrl}/db_getChartDay.php`);
    return result;
  }

  getChartMonth(): Observable<IColumnDataPoints[]>{
    var result = this.http.get<IColumnDataPoints[]>(`${this.apiUrl}/db_getChartMonth.php`);
    return result;
  }

  getUserProgress(param: any): Observable<ICourseProgress>{
    var result = this.http.post<ICourseProgress>(`${this.apiUrl}/db_getUserProgress.php`, param);
    return result;
  }

  enrollClass(param: any){
    var result = this.http.post(`${this.apiUrl}/db_enrollCourse.php`, param);
    return result;
  }

  register(param: any): Observable<IRegister>{
    var result = this.http.post<IRegister>(`${this.apiUrl}/db_register.php`, param);
    return result;
  }

  updateProgress(param: any){
    var result = this.http.post(`${this.apiUrl}/db_updateProgress.php`, param);
    return result;
  }

  getTeachingCourse(param: any): Observable<IMyTeaching[]>{
    var result = this.http.get<IMyTeaching[]>(`${this.apiUrl}/db_getTeachingCourse.php?param=${param}`);
    return result;
  }

  getSubCategoryName(): Observable<string[]>{
    var result = this.http.get<string[]>(`${this.apiUrl}/db_getSubCategoryName.php`);
    return result;
  }

  updateCourse(param: any): Observable<IMyTeaching[]>{
    var result = this.http.post<IMyTeaching[]>(`${this.apiUrl}/db_updateCourse.php`, param);
    return result;
  }

  getEditCourse(param: any): Observable<IMyTeaching[]>{
    var result = this.http.get<IMyTeaching[]>(`${this.apiUrl}/db_getEditCourse.php?param=${param}`);
    return result;
  }

  addCourse(param: any) {
    var result = this.http.post(`${this.apiUrl}/db_addCourse.php`, param);
    return result;
  }

  getAuthorName(param: any): Observable<string>{
    var result = this.http.get<string>(`${this.apiUrl}/db_getAuthorName.php?param=${param}`);
    return result;
  }

  deleteCourse(param: any): Observable<any>{
    var result = this.http.post<any>(`${this.apiUrl}/db_deleteCourse.php`, param);
    return result;
  }

  checkEnroll(param: any): Observable<any>{
    var result = this.http.post<any>(`${this.apiUrl}/db_checkEnroll.php`, param);
    return result;
  }

  unenroll(param: any):Observable<any>{
    var result = this.http.post<any>(`${this.apiUrl}/db_unenroll.php`, param);
    return result;
  }
}

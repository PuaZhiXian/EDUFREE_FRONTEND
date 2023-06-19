import {ICourseDetail} from "./i-course-detail";

export interface ICourseCategory {
  displayName: string,
  category: string,
  courses: ICourseDetail[]
  displayName:string;
}

import {ICourseDetail} from "./i-course-detail";

export interface ICourseCategory {
  category: string,
  courses: ICourseDetail[]
}

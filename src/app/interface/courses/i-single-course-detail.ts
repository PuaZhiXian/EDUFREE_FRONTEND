import {ICourseDetail} from "./i-course-detail";

export interface ISingleCourseDetail extends ICourseDetail {
  description: string,
  courseIncludes: string[]
}

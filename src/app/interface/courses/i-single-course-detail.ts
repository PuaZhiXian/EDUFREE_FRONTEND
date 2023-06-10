import {ICourseDetail} from "./i-course-detail";

export interface ISingleCourseDetail extends ICourseDetail {
  enrolled:boolean,
  overview: string,
  courseIncludes: string[],
  whatWillLearn: string[],
  courseContent: ICourseContent[],
  instructor: Iinstructor,
  description:string
}

interface ICourseContent {
  title: string,
  content: string[]
}

interface Iinstructor {
  name: string,
  image: string,
  rating: number,
  reviews: number,
  student: number,
  courses: number,
  introduction:string
}

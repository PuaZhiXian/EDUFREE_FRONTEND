import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CoursesComponent} from "./page/courses/courses.component";
import {SingleCourseComponent} from "./page/single-course/single-course.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':category',
        component: CoursesComponent
      },
      {
        path: ':category/:courseId',
        component: SingleCourseComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule {
}

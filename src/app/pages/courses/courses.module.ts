import {NgModule} from '@angular/core';
import {CoursesRoutingModule} from './courses-routing.module';
import {CoursesComponent} from './page/courses/courses.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {CommonModule} from "@angular/common";
import {NzRadioModule} from "ng-zorro-antd/radio";
import { CourseTableComponent } from './component/course-table/course-table.component';
import {NzSkeletonModule} from "ng-zorro-antd/skeleton";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzRateModule} from "ng-zorro-antd/rate";
import {NzStatisticModule} from "ng-zorro-antd/statistic";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import { SingleCourseComponent } from './page/single-course/single-course.component';
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {NzFormModule} from "ng-zorro-antd/form";


@NgModule({
  imports: [CoursesRoutingModule, FormsModule, NzInputModule, NzTabsModule, CommonModule, NzRadioModule, NzSkeletonModule, NzCardModule, NzRateModule, NzStatisticModule, NzPaginationModule, NzCollapseModule, ReactiveFormsModule, NzFormModule],
  declarations: [CoursesComponent, CourseTableComponent, SingleCourseComponent],
  exports: [CoursesComponent]
})
export class CoursesModule {



}

import {NgModule} from '@angular/core';
import {CoursesRoutingModule} from './courses-routing.module';
import {CoursesComponent} from './page/courses/courses.component';


@NgModule({
  imports: [CoursesRoutingModule],
  declarations: [CoursesComponent],
  exports: [CoursesComponent]
})
export class CoursesModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditcourseComponent} from "./page/editcourse/editcourse.component";

const routes: Routes = [
  {
    path: '',
    component: EditcourseComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditcourseRoutingModule {
}

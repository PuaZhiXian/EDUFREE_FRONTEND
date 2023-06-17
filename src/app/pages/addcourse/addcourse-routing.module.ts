import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddcourseComponent} from "./page/addcourse/addcourse/addcourse.component";

const routes: Routes = [
  {
    path: '',
    component: AddcourseComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddcourseRoutingModule {
}

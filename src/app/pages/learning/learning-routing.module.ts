import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LearningComponent} from "./page/learning/learning.component";

const routes: Routes = [
  {
    path: ':courseId',
    component: LearningComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningRoutingModule {
}

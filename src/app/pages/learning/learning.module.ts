import {NgModule} from '@angular/core';

import {LearningRoutingModule} from './learning-routing.module';

import { LearningComponent } from './page/learning/learning.component';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzProgressModule} from "ng-zorro-antd/progress";
import {CommonModule} from "@angular/common";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzSkeletonModule} from "ng-zorro-antd/skeleton";
import {NzPipesModule} from "ng-zorro-antd/pipes";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";


@NgModule({
    imports: [LearningRoutingModule, NzLayoutModule, NzBreadCrumbModule, NzMenuModule, NzProgressModule, CommonModule, NzButtonModule, NzSkeletonModule, NzPipesModule, NzDropDownModule],
  declarations: [LearningComponent],
  exports: [LearningComponent]
})
export class LearningModule {
}

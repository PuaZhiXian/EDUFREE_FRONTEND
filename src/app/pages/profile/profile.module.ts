import {NgModule} from '@angular/core';

import {ProfileRoutingModule} from './profile-routing.module';

import { ProfileComponent } from './page/profile/profile.component';
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzCardModule} from "ng-zorro-antd/card";
import {CanvasJSAngularChartsModule} from "@canvasjs/angular-charts";
import {NzProgressModule} from "ng-zorro-antd/progress";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import { MyLearningTableComponent } from './component/my-learning-table/my-learning-table.component';
import {NzRateModule} from "ng-zorro-antd/rate";
import {CommonModule} from "@angular/common";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzImageModule} from "ng-zorro-antd/image";
import {NzButtonModule} from "ng-zorro-antd/button";
import { MyTeachingTableComponent } from './component/my-teaching-table/my-teaching-table/my-teaching-table.component';
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";


@NgModule({
  imports: [ProfileRoutingModule, NzDropDownModule, NzCardModule, CanvasJSAngularChartsModule, NzProgressModule, FormsModule, NzInputModule, NzRateModule, CommonModule, NzPaginationModule, NzTableModule, NzImageModule, NzButtonModule, ReactiveFormsModule, NzPopconfirmModule],
  declarations: [ProfileComponent, MyLearningTableComponent, MyTeachingTableComponent],
  exports: [ProfileComponent]
})
export class ProfileModule {
}

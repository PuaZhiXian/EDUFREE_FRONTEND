import {NgModule} from '@angular/core';

import {DashboardRoutingModule} from './dashboard-routing.module';

import {DashboardComponent} from './page/dashboard/dashboard.component';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzCarouselModule} from "ng-zorro-antd/carousel";
import {CommonModule} from "@angular/common";
import {NzRateModule} from "ng-zorro-antd/rate";
import {FormsModule} from "@angular/forms";
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {NzSkeletonModule} from "ng-zorro-antd/skeleton";
import {NzStatisticModule} from "ng-zorro-antd/statistic";


@NgModule({
    imports: [DashboardRoutingModule, NzButtonModule, NzCardModule, NzCarouselModule, CommonModule, NzRateModule, FormsModule, NzCollapseModule, NzSkeletonModule, NzStatisticModule],
  declarations: [DashboardComponent],
  exports: [DashboardComponent]
})
export class DashboardModule {
}

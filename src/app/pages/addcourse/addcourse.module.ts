import {NgModule} from '@angular/core';
import {AddcourseRoutingModule} from "./addcourse-routing.module";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {AddcourseComponent} from "./page/addcourse/addcourse/addcourse.component";
import {NgForOf, NgIf} from "@angular/common";
import {NzImageModule} from "ng-zorro-antd/experimental/image";
import {NzUploadModule} from "ng-zorro-antd/upload";


@NgModule({
  imports: [AddcourseRoutingModule, NzButtonModule, NzDropDownModule, NgForOf, NgIf, NzImageModule, NzUploadModule],
  declarations: [
    AddcourseComponent
  ],
  exports: [AddcourseComponent]
})
export class AddcourseModule {
}

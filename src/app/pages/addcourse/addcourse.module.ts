import {NgModule} from '@angular/core';
import {AddcourseRoutingModule} from "./addcourse-routing.module";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {AddcourseComponent} from "./page/addcourse/addcourse/addcourse.component";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {NzImageModule} from "ng-zorro-antd/experimental/image";
import {NzUploadModule} from "ng-zorro-antd/upload";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";


@NgModule({
  imports: [AddcourseRoutingModule, NzButtonModule, NzDropDownModule, NgForOf, NgIf, NzImageModule, NzUploadModule, FormsModule, NzFormModule, NzGridModule, NzInputModule, ReactiveFormsModule, NzSelectModule],
  declarations: [
    AddcourseComponent
  ],
  exports: [AddcourseComponent]
})
export class AddcourseModule {
}

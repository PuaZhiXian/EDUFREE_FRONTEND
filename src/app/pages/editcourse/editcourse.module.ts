import {NgModule} from '@angular/core';
import {EditcourseRoutingModule} from "./editcourse-routing.module";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {EditcourseComponent} from "./page/editcourse/editcourse.component";
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {NzImageModule} from "ng-zorro-antd/experimental/image";
import {NzUploadModule} from "ng-zorro-antd/upload";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzSkeletonModule} from "ng-zorro-antd/skeleton";


@NgModule({
  imports: [EditcourseRoutingModule, NzButtonModule, NzDropDownModule, NgForOf, NgIf, NzImageModule, NzUploadModule, FormsModule, NzFormModule, NzGridModule, NzInputModule, ReactiveFormsModule, NzSelectModule, NzSkeletonModule, CommonModule],
  declarations: [
    EditcourseComponent
  ],
  exports: [EditcourseComponent]
})
export class EditcourseModule {
}

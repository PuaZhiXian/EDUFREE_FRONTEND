import {NgModule} from '@angular/core';

import {LoginRoutingModule} from './login-routing.module';

import {LoginComponent} from './page/login/login.component';
import {NzCardModule} from "ng-zorro-antd/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {CommonModule} from "@angular/common";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzButtonModule} from "ng-zorro-antd/button";


@NgModule({
  imports: [LoginRoutingModule, NzCardModule, ReactiveFormsModule, NzFormModule, NzInputModule, NzSwitchModule, FormsModule, CommonModule, NzCheckboxModule, NzButtonModule],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule {
}

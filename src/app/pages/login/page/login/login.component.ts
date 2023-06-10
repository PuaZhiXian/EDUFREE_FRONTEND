import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validateForm!: UntypedFormGroup;
  isRegister: boolean = false;
  passwordVisible: boolean = false;
  isRememberMe: boolean = false;

  loadingForm: boolean = true;

  constructor(private fb: UntypedFormBuilder,
              private router: Router) {

  }

  ngOnInit(): void {
    this.initForm();
    this.loadingForm = false;
  }

  initForm() {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  submitForm() {
    if (this.validateForm.valid) {
      this.isRegister ? console.log('register') : console.log('login');
      console.log('value : ', this.validateForm.value);
      this.router.navigate(['/profile']);

    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

  resetForm() {
    this.validateForm.reset();
  }

  toggleIsLogin(isLogin: boolean) {
    this.isRegister = !isLogin;

    if(this.isRegister){
      this.validateForm = this.fb.group({
        username: [null, [Validators.required]],
        password: [null, [Validators.required]],
        email:[null, [Validators.required, Validators.email]]
      });
    }else{
      this.validateForm = this.fb.group({
        username: [null, [Validators.required]],
        password: [null, [Validators.required]]
      });
    }
  }
}

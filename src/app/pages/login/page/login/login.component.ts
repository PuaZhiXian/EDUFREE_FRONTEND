import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {GetAPIService} from "../../../../get-api.service";
import {finalize} from 'rxjs';
import {ILogin} from "../../../../interface/login/i-login";
import {ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {AppComponent} from "../../../../app.component";

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
  login: ILogin[] = [];

  loadingForm: boolean = true;

  constructor(private fb: UntypedFormBuilder,
              private router: Router,
              public activatedRoute: ActivatedRoute,
              private api: GetAPIService,
              private ref: ChangeDetectorRef,) {

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
      var username = this.validateForm.value['username'];
      var password = this.validateForm.value['password'];

      var data = {
        'username': username,
        'password': password
      };

      //TODO: create api to login session
      this.api.login(data).pipe(
        finalize(() => {
          this.ref.detectChanges();
          this.ref.markForCheck();
        })
      ).subscribe((resp) => {
        console.log(resp.isLogin);
        if(resp['isLogin'] == true){
          AppComponent.hiddenLogin = true;
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('password', password);
          sessionStorage.setItem('userId', resp['userId']);
          this.router.navigate(['/profile']);
        }else{
          Object.values(this.validateForm.controls).forEach(control => {
            if (control.invalid) {
              control.markAsDirty();
              control.updateValueAndValidity({onlySelf: true});
            }
          });
        }
      })

      // this.isRegister ? console.log('register') : console.log('login');
      // console.log('value : ', this.validateForm.value);
      // this.router.navigate(['/profile']);

    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }


  // submitForm() {
  //   if (this.validateForm.valid) {
  //     this.isRegister ? console.log('register') : console.log('login');
  //     console.log('value : ', this.validateForm.value);
  //     this.router.navigate(['/profile']);

  //   } else {
  //     Object.values(this.validateForm.controls).forEach(control => {
  //       if (control.invalid) {
  //         control.markAsDirty();
  //         control.updateValueAndValidity({onlySelf: true});
  //       }
  //     });
  //   }
  // }

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

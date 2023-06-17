import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize} from "rxjs";
import {GetAPIService} from "./get-api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  currentUrl: string = '';
  hiddenHeader: boolean = false;
  hiddenFooter: boolean = false;
  static hiddenLogin: boolean = false;
  hl: boolean = AppComponent.hiddenLogin;

  constructor(private router: Router,
              private api: GetAPIService,
              private ref: ChangeDetectorRef,
              public activatedRoute: ActivatedRoute) {
    this.router.events.subscribe((val) => {
      if (this.router.url.endsWith("/login")) {
        this.hiddenHeader = true;
        this.hiddenFooter = true;
      } else {
        this.hiddenHeader = false;
        this.hiddenFooter = false;
      }
      this.hl = AppComponent.hiddenLogin;
    });
  }

  ngOnInit(): void {

  }

  redirect(link: string) {
    switch (link) {
      case 'login':
        this.hiddenHeader = true;
        this.hiddenFooter = true;
        this.router.navigate(['/', link]);
        break;
      case 'courses':
        this.router.navigate(['/', 'courses', 'default'])
        break;
      case 'faq':
        this.router.navigate(['/', 'dashboard'], {queryParams: {section: 'faq'}});
        break;
      default:
        this.router.navigate(['/', link])
        break;
    }
    console.log(link);
    console.log(this.hl)
  }

  logOut() {
    var username = sessionStorage.getItem('username');
    var password = sessionStorage.getItem('password');
    var data = {
      'username': username,
      'password': password
    }
    //TODO: create api for log out
    this.api.logout(data).pipe(
      finalize(() => {
        this.ref.detectChanges();
        this.ref.markForCheck();
        AppComponent.hiddenLogin = false;
        this.hl = false;
      })
    ).subscribe((resp) => {

    })
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
    this.router.navigate(['/', 'dashboard']);

  }

}

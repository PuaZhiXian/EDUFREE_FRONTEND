import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

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
              public activatedRoute: ActivatedRoute) {
    this.router.events.subscribe((val) => {
      if (this.router.url.endsWith("/login")) {
        this.hiddenHeader = true;
        this.hiddenFooter = true;
      } else {
        this.hiddenHeader = false;
        this.hiddenFooter = false;
      }

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
  }

}

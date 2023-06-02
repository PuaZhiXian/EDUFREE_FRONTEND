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
    if (link == 'login') {
      this.router.navigate(['/', link]);
      this.hiddenFooter = true;
      this.hiddenHeader = true;
    }
    console.log(link);
  }

}

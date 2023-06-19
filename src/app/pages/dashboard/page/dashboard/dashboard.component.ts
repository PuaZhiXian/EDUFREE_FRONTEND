import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {NzCarouselComponent} from "ng-zorro-antd/carousel";
import {ICourseDetail} from "../../../../interface/courses/i-course-detail";
import {IFaq} from "../../../../interface/FAQ/i-faq";
import {ActivatedRoute, Router} from "@angular/router";
import {GetAPIService} from "../../../../get-api.service";
import {finalize} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, AfterViewInit {
  array: number[] = [];
  effect = 'scrollx';
  @ViewChild('recommendCarousel') recommendCarousel!: NzCarouselComponent;
  @ViewChild('faq') container!: ElementRef<HTMLElement>;

  panels: IFaq[] = [];
  recommendArray!: ICourseDetail[];

  loadingRecommend: boolean = true;
  loadingFAQ: boolean = true;

  topCategory = [
    {
      category: 'Python',
      link: 'python',
      img:'https://logos-world.net/wp-content/uploads/2021/10/Python-Logo-700x394.png'
    },
    {
      category: 'Excel',
      link: 'excel',
      img:'https://cdn.educba.com/academy/wp-content/uploads/2017/11/microsoft-excel-skills.jpg'
    },
    {
      category: 'Web Development',
      link: 'webDevelopment',
      img:'https://www.robertsonbuildings.com/wp-content/uploads/2020/10/Tech-Image.jpg'
    },
    {
      category: 'JavaScript',
      link: 'javaScript',
      img:'https://blog.logrocket.com/wp-content/uploads/2021/02/machine-learning-libraries-javascript.png'
    },
    {
      category: 'Data Science',
      link: 'dataScience',
      img:'https://bernardmarr.com/wp-content/uploads/2022/11/The-Top-5-Data-Science-And-Analytics-Trends-In-2023.jpg'
    },
    {
      category: 'Amazon AWS',
      link: 'aws',
      img:'https://i.ytimg.com/vi/JIbIYCM48to/maxresdefault.jpg'
    }
  ]

  constructor(private router: Router,
              private api: GetAPIService,
              private ref: ChangeDetectorRef,
              private activeRoute: ActivatedRoute,) {
  }

  ngOnInit() {
    this.initFAQ();

    this.initRecommendCourse();
    // this.initAPICalling();
  }

  initFAQ() {
    this.api.getFaq().pipe(
      finalize(() => {
        this.loadingFAQ = false;
        this.ref.detectChanges();
        this.ref.markForCheck();
        this.activeRoute.queryParamMap.subscribe((query) => {
          if (query.get('section') === 'faq') {
            this.container.nativeElement.scrollIntoView({behavior: "smooth", block: "start"});
          }
        })
      })
    ).subscribe((resp) => {
      this.panels = resp;
    })

  }

  initRecommendCourse() {
    //create api for gain recommend course
    this.api.getRecommendedCourseList().pipe(
      finalize(() => {
        this.loadingRecommend = false;
        this.ref.detectChanges();
        this.ref.markForCheck();
      })
    ).subscribe((resp) => {
      this.recommendArray = resp;
      this.array = Array.from({length: Math.ceil(this.recommendArray.length / 3)}, (_, index) => index);
    })

  }

  onCarousel(direction: string) {
    direction === 'right' ? this.recommendCarousel.next() : this.recommendCarousel.pre();
  }

  redirectToCourse(link: string) {
    this.router.navigate(['/', 'courses', link])
  }

  openSingleCourse(id: string) {
    this.router.navigate(['/', 'courses', 'recommend', id])
  }

  submit() {
    console.log(this.loadingFAQ);
  }

  ngAfterViewInit(): void {
    this.activeRoute.queryParamMap.subscribe((query) => {
      if (query.get('section') === 'faq') {
        if (!this.loadingFAQ) {
          this.container.nativeElement.scrollIntoView({behavior: "smooth", block: "start"});
        }
      }
    })
  }
}

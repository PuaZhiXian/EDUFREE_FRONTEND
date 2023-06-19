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
      category: 'Data Science',
      link: 'dataScience',
      img:'https://bernardmarr.com/wp-content/uploads/2022/11/The-Top-5-Data-Science-And-Analytics-Trends-In-2023.jpg'
    },
    {
      category: 'IT and Software',
      link: 'itSoftware',
      img:'https://www.robertsonbuildings.com/wp-content/uploads/2020/10/Tech-Image.jpg'
    },
    {
      category: 'Social sciences',
      link: 'socialScience',
      img:'https://www.worldatlas.com/r/w960-q80/upload/38/4f/7a/shutterstock-87113380.jpg'
    },
    {
      category: 'Art and Humanities',
      link: 'artHumanities',
      img:'https://barcelona-amc.iafor.org/wp-content/uploads/sites/54/2020/07/The-Relevance-of-the-Humanities-and-Arts-in-Uncertain-Times.jpg'
    },
    {
      category: 'Engineering',
      link: 'engineering',
      img:'https://cdn.mos.cms.futurecdn.net/HFUAjfbamNhbM8dsNSQW3D.jpg'
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

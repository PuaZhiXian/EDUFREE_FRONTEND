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
      category: 'Business',
      link: 'business'
    },
    {
      category: 'Data Science',
      link: 'dataScience'
    },
    {
      category: 'IT and Software',
      link: 'itSoftware'
    },
    {
      category: 'Social sciences',
      link: 'socialScience'
    },
    {
      category: 'Art and Humanities',
      link: 'artHumanities'
    },
    {
      category: 'Engineering',
      link: 'engineering'
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
    this.api.getSomeData().pipe(
      finalize(() => {
        this.loadingFAQ = false;
        this.ref.detectChanges();
        this.ref.markForCheck();
      })
    ).subscribe((resp) => {
      this.panels = resp;
    })

  }

  initRecommendCourse() {
    //TODO: create api for gain recommend course
    this.recommendArray = [
      {
        id: '1',
        image: 'https://img-b.udemycdn.com/course/240x135/1565838_e54e_16.jpg',
        author: 'Dr. Angela Yu',
        rate: 4.5,
        title: 'The Complete 2023 Web Development Bootcamp',
        price: 34.90,
        rateCount: 815
      },
      {
        id: '2',
        image: 'https://img-c.udemycdn.com/course/240x135/2993624_0967_2.jpg',
        author: 'Jose Portilla',
        rate: 4.7,
        title: 'The Complete Python Bootcamp',
        price: 69.90,
        rateCount: 529
      },
      {
        id: '3',
        image: 'https://img-b.udemycdn.com/course/240x135/950390_270f_3.jpg',
        author: 'SuperDataScience Team',
        rate: 4.9,
        title: 'Machine Learning A-Z™: AI, Python & R',
        price: 69.90,
        rateCount: 716
      },
      {
        id: '4',
        image: 'https://img-b.udemycdn.com/course/240x135/1565838_e54e_16.jpg',
        author: 'Dr. Angela Yu',
        rate: 4.5,
        title: 'The Complete 2023 Web Development Bootcamp',
        price: 34.90,
        rateCount: 815
      },
      {
        id: '5',
        image: 'https://img-c.udemycdn.com/course/240x135/2993624_0967_2.jpg',
        author: 'Jose Portilla',
        rate: 4.7,
        title: 'The Complete Python Bootcamp',
        price: 69.90,
        rateCount: 529
      },
      {
        id: '6',
        image: 'https://img-b.udemycdn.com/course/240x135/950390_270f_3.jpg',
        author: 'SuperDataScience Team',
        rate: 4.9,
        title: 'Machine Learning A-Z™: AI, Python & R',
        price: 69.90,
        rateCount: 716
      },
      {
        id: '7',
        image: 'https://img-b.udemycdn.com/course/240x135/1565838_e54e_16.jpg',
        author: 'Dr. Angela Yu',
        rate: 4.5,
        title: 'The Complete 2023 Web Development Bootcamp',
        price: 34.90,
        rateCount: 815
      },
      {
        id: '8',
        image: 'https://img-c.udemycdn.com/course/240x135/2993624_0967_2.jpg',
        author: 'Jose Portilla',
        rate: 4.7,
        title: 'The Complete Python Bootcamp',
        price: 69.90,
        rateCount: 529
      },
      {
        id: '9',
        image: 'https://img-b.udemycdn.com/course/240x135/950390_270f_3.jpg',
        author: 'SuperDataScience Team',
        rate: 4.9,
        title: 'Machine Learning A-Z™: AI, Python & R',
        price: 69.90,
        rateCount: 716
      },
      {
        id: '10',
        image: 'https://img-b.udemycdn.com/course/240x135/1565838_e54e_16.jpg',
        author: 'Dr. Angela Yu',
        rate: 4.5,
        title: 'The Complete 2023 Web Development Bootcamp',
        price: 34.90,
        rateCount: 815
      },
      {
        id: '11',
        image: 'https://img-c.udemycdn.com/course/240x135/2993624_0967_2.jpg',
        author: 'Jose Portilla',
        rate: 4.7,
        title: 'The Complete Python Bootcamp',
        price: 69.90,
        rateCount: 529
      }
    ];
    this.array = Array.from({length: Math.ceil(this.recommendArray.length / 3)}, (_, index) => index);
    this.loadingRecommend = false;
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
      if(query.get('section') === 'faq'){
        this.container.nativeElement.scrollIntoView({behavior: "smooth", block: "start"});
      }
    })
  }
}

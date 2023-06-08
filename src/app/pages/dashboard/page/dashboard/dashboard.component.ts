import {Component, OnInit, ViewChild} from '@angular/core';
import {NzCarouselComponent} from "ng-zorro-antd/carousel";
import {ICourseDetail} from "../../../../interface/courses/i-course-detail";
import {IFaq} from "../../../../interface/FAQ/i-faq";
import {Router} from "@angular/router";
import {GetAPIService} from "../../../../get-api.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  array: number[] = [];
  effect = 'scrollx';
  @ViewChild('recommendCarousel') recommendCarousel!: NzCarouselComponent;

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

  constructor(private router: Router, private api: GetAPIService) {
  }

  async ngOnInit() {
    var faq = await this.initFAQ(); 
    this.panels = faq;
    console.log(this.panels);
    this.loadingFAQ = false;  
    this.initRecommendCourse();
    // this.initAPICalling();
  }

  async initFAQ(): Promise<any> {
    try {
      const data = await this.api.getSomeData().toPromise();
      return data;
    } catch (error) {
      console.error(error);
      throw error; // Throw the error to be handled by the caller
    }
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

  // initFAQ() {
  //   //TODO: create api for gain FAQ
  //   this.panels = [
  //     {
  //       id: '01',
  //       active: true,
  //       FAQ_name: 'This is panel header 1',
  //       FAQ_answer: 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'
  //     },
  //     {
  //       id: '02',
  //       active: false,
  //       FAQ_name: 'This is panel header 2',
  //       FAQ_answer: 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'
  //     },
  //     {
  //       id: '03',
  //       active: false,
  //       FAQ_name: 'This is panel header 3',
  //       FAQ_answer: 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'
  //     }
  //   ];
  //   this.loadingFAQ = false;
  // }

  onCarousel(direction: string) {
    direction === 'right' ? this.recommendCarousel.next() : this.recommendCarousel.pre();
  }

  redirectToCourse(link:string){
    this.router.navigate(['/','courses', link])
  }

  openSingleCourse(id:string){
    this.router.navigate(['/','courses', 'recommend',id])
  }
}

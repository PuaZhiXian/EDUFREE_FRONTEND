import {Component, OnInit, ViewChild} from '@angular/core';
import {NzCarouselComponent} from "ng-zorro-antd/carousel";
import {ICourseDetail} from "../../../../interface/courses/i-course-detail";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  array: number[] = [];
  effect = 'scrollx';
  @ViewChild('recommendCarousel') recommendCarousel!: NzCarouselComponent;

  panels = [
    {
      id: '01',
      active: true,
      name: 'This is panel header 1',
      answer: 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'
    },
    {
      id: '02',
      active: false,
      name: 'This is panel header 2',
      answer: 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'
    },
    {
      id: '03',
      active: false,
      name: 'This is panel header 3',
      answer: 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'
    }
  ];
  recommendArray!: ICourseDetail[];

  loadingRecommend: boolean = true;
  loadingFQA: boolean = true;
  i = 0;
  index = 0;

  ngOnInit(): void {
    this.loadingFQA = false;
    this.initRecommendCourse();

  }

  initRecommendCourse() {
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

    console.log(this.recommendArray[this.i +this.index * 3].image)
  }

  onCarousel(direction: string) {
    direction === 'right' ? this.recommendCarousel.next() : this.recommendCarousel.pre();
  }

}

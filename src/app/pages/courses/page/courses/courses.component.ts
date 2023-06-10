import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ICourseCategory} from "../../../../interface/courses/i-course-category";
import {ICourseDetail} from "../../../../interface/courses/i-course-detail";
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courseCategory: string | null = '';
  loadingCourses: boolean = false;
  coursesCategoryList: ICourseCategory[] = [];

  selectedTab: string = '';
  selectedCourse: ICourseDetail[] = [];

  validateForm!: UntypedFormGroup;
  displayingSelectedCourse: ICourseDetail[] = [];

  constructor(private router: Router,
              public activatedRoute: ActivatedRoute,
              private fb: UntypedFormBuilder,) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.courseCategory = params.get('category');
    });
    this.initForm();
    this.changeHandler();
    this.initCourses();
  }

  initForm() {
    this.validateForm = this.fb.group({
      searchKey: [null, []]
    });
  }

  changeHandler() {
    this.validateForm.valueChanges.subscribe((value => {
      this.searching();
    }));
  }

  initCourses() {
    //TODO: create api for gain course
    this.coursesCategoryList = [
      {
        category: 'Python',
        courses: [
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
        ]
      },
      {
        category: 'Excel',
        courses: [
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
            id: '5',
            image: 'https://img-c.udemycdn.com/course/240x135/2993624_0967_2.jpg',
            author: 'Jose Portilla',
            rate: 4.7,
            title: 'The Complete Python Bootcamp',
            price: 69.90,
            rateCount: 529
          }
        ]
      },
      {
        category: 'Web Developer',
        courses: [
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
        ]
      },
      {
        category: 'JavaScript',
        courses: [
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
        ]
      },
      {
        category: 'Data Science',
        courses: [
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
        ]
      },
      {
        category: 'Amazon AWS',
        courses: [
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
        ]
      }
    ]
    this.selectTab(this.coursesCategoryList[0].category);
    this.loadingCourses = false;
  }

  selectTab(category: string) {
    this.selectedTab = category;
    this.selectedCourse = this.coursesCategoryList.filter(value => {
      return value.category === category;
    })[0].courses;
    this.displayingSelectedCourse = this.selectedCourse;
    this.validateForm.reset();
  }

  searching() {
    if (!this.validateForm.value.searchKey || this.validateForm.value.searchKey.length == 0 ) {
      this.displayingSelectedCourse = this.selectedCourse;
    } else {
      this.displayingSelectedCourse = this.selectedCourse.filter((items) => {
        return this.isMatch(items.title) || this.isMatch(items.author);
      })
    }

  }

  isMatch(str: string): boolean {
    return str.toLocaleLowerCase().includes(this.validateForm.value.searchKey.toLowerCase());
  }

}

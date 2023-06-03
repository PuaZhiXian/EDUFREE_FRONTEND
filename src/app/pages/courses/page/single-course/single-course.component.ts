import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ISingleCourseDetail} from "../../../../interface/courses/i-single-course-detail";

@Component({
  selector: 'app-single-course',
  templateUrl: './single-course.component.html',
  styleUrls: ['./single-course.component.scss']
})
export class SingleCourseComponent implements OnInit {

  courseId!: string | null;
  singleCourseDetail !: ISingleCourseDetail;
  loadingSingleCourse: boolean = true;

  constructor(private router: Router,
              public activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.courseId = params.get('courseId');
    });
    this.initSingleCourse();
  }

  initSingleCourse() {
    this.singleCourseDetail = {
      author: "Dr. Angela Yu",
      courseIncludes: [
        '23 hours on-demand video',
        '6 coding exercises',
        'Full lifetime access',
        'Certificate of completion'
      ],
      description: "Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, MongoDB, Web3 and DApps",
      id: "1",
      image: "https://img-b.udemycdn.com/course/240x135/1565838_e54e_16.jpg",
      price: 89.90,
      rate: 4.5,
      rateCount: 813,
      title: "The Complete 2023 Web Development Bootcamp"
    }
    this.loadingSingleCourse = false;
  }

}

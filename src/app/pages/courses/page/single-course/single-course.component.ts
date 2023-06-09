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
    //TODO: create api for gain single course detail
    this.singleCourseDetail = {
      enrolled: false,
      author: "Dr. Angela Yu",
      courseIncludes: [
        '23 hours on-demand video',
        '6 coding exercises',
        'Full lifetime access',
        'Certificate of completion'
      ],
      overview: "Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, MongoDB, Web3 and DApps",
      description: 'Join the Complete Web Development Bootcamp: the highest-rated, comprehensive course to become a full-stack web developer. Learn the latest tools and technologies used by top companies like Apple, Google, and Netflix. With animated explanations, real-world projects, and 65+ hours of video tutorials, even beginners can become masters. Save $12,000 compared to in-person bootcamps. Start coding and change your life today!',
      id: "1",
      image: "https://img-b.udemycdn.com/course/240x135/1565838_e54e_16.jpg",
      price: 89.90,
      rate: 4.5,
      rateCount: 813,
      title: "The Complete 2023 Web Development Bootcamp",
      whatWillLearn: [
        "Build 16 web development projects for your portfolio, ready to apply for junior developer jobs.",
        "Learn the latest technologies, including Javascript, React, Node and even Web3 development.",
        "After the course you will be able to build ANY website you want.",
        "Build fully-fledged websites and web apps for your startup or business.",
        "Work as a freelance web developer."
      ],
      courseContent: [
        {
          title: 'Front end Web Development',
          content: 'ask sim'
        },
        {
          title: 'HTML',
          content: 'ask sim'
        },
        {
          title: 'CSS',
          content: 'ask sim'
        },
        {
          title: 'Bootstrap',
          content: 'ask sim'
        },
        {
          title: 'JavaScript',
          content: 'ask sim'
        },
        {
          title: 'Back end Web Development',
          content: 'ask sim'
        },
        {
          title: 'Node.js',
          content: 'ask sim'
        },
        {
          title: 'SQL',
          content: 'ask sim'
        },
        {
          title: 'Database',
          content: 'ask sim'
        },
        {
          title: 'SQL',
          content: 'ask sim'
        },
        {
          title: 'Deployment',
          content: 'ask sim'
        }
      ],
      instructor: {
        name: "Dr. Angela Yu",
        image: "https://img-b.udemycdn.com/user/200_H/31334738_a13c_3.jpg",
        rating: 4.7,
        reviews: 1203,
        student: 6873,
        courses: 8,
        introduction: 'Angela is an experienced developer and the lead instructor at the London App Brewery. She is passionate about teaching and has helped numerous students learn to code and become developers. She has been invited by top companies like Twitter, Facebook, and Google to teach their employees. Angela\'s programming journey began at the age of 12 when she wanted to create her own Space Invader game. Since then, she has developed numerous websites, apps, and games. However, her true passion lies in teaching. Angela dedicates her time to researching and implementing fun and easily understandable methods of learning to code. Her bootcamp courses include geeky humor, detailed explanations, and animations to ensure a comprehensive learning experience. Throughout the course, Angela is committed to supporting and guiding students every step of the way.'
      }
    }
    this.loadingSingleCourse = false;
  }


  enrollCourse(){
    this.singleCourseDetail.enrolled = true;

    //TODO: create api for toggle it
  }

  learningCourse(){
    this.router.navigate(['/','learning',this.singleCourseDetail.id])
  }

}

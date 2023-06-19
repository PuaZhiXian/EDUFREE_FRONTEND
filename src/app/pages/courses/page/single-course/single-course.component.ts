import {Component, OnInit, ChangeDetectorRef,} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {finalize} from 'rxjs';
import {GetAPIService} from "../../../../get-api.service";
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
              public activatedRoute: ActivatedRoute,
              private api: GetAPIService,
              private ref: ChangeDetectorRef,
              ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.courseId = params.get('courseId');
    });
    this.initSingleCourse();
  }

  initSingleCourse() {
    //TODO: create api for gain single course detail
    this.api.getSingleCourseDetail(this.courseId).pipe(
      finalize(() => {
        this.checkEnroll();
        this.ref.detectChanges();
        this.ref.markForCheck();
      })
    ).subscribe((resp) => {
      this.singleCourseDetail = resp;
      this.loadingSingleCourse = false;
    })

  }


  enrollCourse() {
    this.singleCourseDetail.enrolled = true;
    var data = {
      'courseId': this.courseId,
      'userId': sessionStorage.getItem('userId')
    }
    this.api.enrollClass(data).pipe(
      finalize(() => {
        this.ref.detectChanges();
        this.ref.markForCheck();
      })
    ).subscribe((resp) => {
      console.log('added course to this user');
    })
  }

  checkEnroll(){
    var data = {
      'courseId': this.courseId,
      'userId': sessionStorage.getItem('userId')
    }
    this.api.checkEnroll(data).pipe(
      finalize(() => {
        this.ref.detectChanges();
        this.ref.markForCheck();
      })
    ).subscribe((resp) => {
      if(resp == "false"){
        this.singleCourseDetail.enrolled = true;
      }else{
        this.singleCourseDetail.enrolled = false;
      }
    })
  }

  learningCourse() {
    this.router.navigate(['/', 'learning', this.singleCourseDetail.id])
  }

}

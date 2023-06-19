import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ICourseCategory} from "../../../../interface/courses/i-course-category";
import {ICourseDetail} from "../../../../interface/courses/i-course-detail";
import {GetAPIService} from "../../../../get-api.service";
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {finalize} from 'rxjs';


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
              private fb: UntypedFormBuilder,
              private ref: ChangeDetectorRef,
              private api: GetAPIService,) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.courseCategory = params.get('category');
    });
    console.log(this.courseCategory);
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
    this.api.getCourseList().pipe(
      finalize(() => {
        this.loadingCourses = false;
        this.ref.detectChanges();
        this.ref.markForCheck();
      })
    ).subscribe((resp) => {
      this.coursesCategoryList = resp;
      if (this.courseCategory !== null) {
        if (this.courseCategory == 'default') {
          this.selectTab(this.coursesCategoryList[0].displayName);
        } else {
          this.selectTab(this.courseCategory);
        }
      } else {
        this.selectTab(this.coursesCategoryList[0].displayName);
      }
    })
  }

  selectTab(category: string) {
    this.selectedTab = category;
    this.selectedCourse = this.coursesCategoryList.filter(value => {
      return value.displayName === category;
    })[0].courses;
    this.displayingSelectedCourse = this.selectedCourse;
    this.validateForm.reset();
  }

  searching() {
    if (!this.validateForm.value.searchKey || this.validateForm.value.searchKey.length == 0) {
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

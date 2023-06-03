import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ICourseDetail} from "../../../../interface/courses/i-course-detail";
import {Router} from "@angular/router";

@Component({
  selector: 'course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.scss']
})
export class CourseTableComponent implements OnInit, OnChanges {

  @Input() selectedCourse!: ICourseDetail[];
  @Input() categoryType!:string | null;
  pages: ICourseDetail[][] = [];
  selectedPage: ICourseDetail[] = [];
  courseSize!: number;
  pageIndex!: number;


  constructor(private router: Router,) {
  }
  ngOnInit(): void {
    this.splitCourseToPage();
  }

  splitCourseToPage() {
    this.courseSize = this.selectedCourse.length;
    this.pages = [];

    let temp = [];
    temp.push(...this.selectedCourse)
    while (temp.length) {
      this.pages.push(temp.splice(0, 6));
    }

    this.pageIndex = 1;
    this.onPageIndexChange(1);
  }

  onPageIndexChange($event: number) {
    this.selectedPage = this.pages[$event - 1];
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.splitCourseToPage();
  }

  openSingleCourse(id:string){
    this.router.navigate(['/','courses', this.categoryType,id])
  }
}

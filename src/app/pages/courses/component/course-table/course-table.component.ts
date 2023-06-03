import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ICourseDetail} from "../../../../interface/courses/i-course-detail";

@Component({
  selector: 'course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.scss']
})
export class CourseTableComponent implements OnInit, OnChanges {

  @Input() selectedCourse!: ICourseDetail[];
  pages: ICourseDetail[][] = [];
  selectedPage: ICourseDetail[] = [];
  courseSize!: number;
  pageIndex!: number;

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
}

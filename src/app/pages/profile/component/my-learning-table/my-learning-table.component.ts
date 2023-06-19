import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {IMyLearning} from "../../../../interface/learning/i-my-learning";

@Component({
  selector: 'my-learning-table',
  templateUrl: './my-learning-table.component.html',
  styleUrls: ['./my-learning-table.component.scss']
})
export class MyLearningTableComponent implements OnInit {

  @Input() tableData!: IMyLearning[];
  @Output() triggerRefreshData = new EventEmitter<any>();

  constructor(private router: Router,) {
  }

  ngOnInit(): void {
  }

  continueLearning(id: string) {
    this.router.navigate(['/', 'learning', id]);
  }

  getCertificate() {
    const url = new URL("https://drive.google.com/file/d/1qhkzNyOJyzK94Zrr4czjpS-cLGIyJ_wC/view?usp=sharing");
    window.open(url, "_blank");
  }

  unenrollCourse() {

  }
}

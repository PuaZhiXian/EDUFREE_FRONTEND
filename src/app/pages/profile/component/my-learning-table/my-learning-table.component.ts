import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {IMyLearning} from "../../../../interface/learning/i-my-learning";

@Component({
  selector: 'my-learning-table',
  templateUrl: './my-learning-table.component.html',
  styleUrls: ['./my-learning-table.component.scss']
})
export class MyLearningTableComponent implements OnInit {

  @Input() tableData!: IMyLearning[];

  constructor(private router: Router,) {
  }

  ngOnInit(): void {
  }

  continueLearning(id: string) {
    this.router.navigate(['/', 'learning', id]);
  }

  getCertificate(id: string) {

  }
}

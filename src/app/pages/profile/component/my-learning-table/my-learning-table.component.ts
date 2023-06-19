import {Component, EventEmitter, Input, OnInit, ChangeDetectorRef, Output} from '@angular/core';
import {Router} from "@angular/router";
import {IMyLearning} from "../../../../interface/learning/i-my-learning";
import {NzMessageService} from "ng-zorro-antd/message";
import {finalize} from 'rxjs';
import {GetAPIService} from "../../../../get-api.service";

@Component({
  selector: 'my-learning-table',
  templateUrl: './my-learning-table.component.html',
  styleUrls: ['./my-learning-table.component.scss']
})
export class MyLearningTableComponent implements OnInit {

  @Input() tableData!: IMyLearning[];
  @Output() triggerRefreshData = new EventEmitter<any>();

  constructor(private router: Router,
    private api: GetAPIService,
    private message: NzMessageService,
    private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  continueLearning(id: string) {
    this.router.navigate(['/', 'learning', id]);
  }

  createSuccessMessage(): void {
    this.message.create('success','The course is deleted successfully!');
  }

  getCertificate() {
    const url = new URL("https://drive.google.com/file/d/1qhkzNyOJyzK94Zrr4czjpS-cLGIyJ_wC/view?usp=sharing");
    window.open(url, "_blank");
  }

  unenrollCourse(id: string) {
    var data = {
      'courseId': id,
      'userId': sessionStorage.getItem('userId')
    }
    this.api.unenroll(data).pipe(
      finalize(() => {
        
        this.createSuccessMessage();
        this.ref.detectChanges();
        this.ref.markForCheck();
      })
    ).subscribe((resp) => {
      if(resp == "true"){
        
      }
    })
  }
}

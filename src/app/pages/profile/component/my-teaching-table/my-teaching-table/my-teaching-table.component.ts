import {Component, Input, OnInit} from '@angular/core';
import { IMyTeaching} from "../../../../../interface/learning/i-my-teaching";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'my-teaching-table',
  templateUrl: './my-teaching-table.component.html',
  styleUrls: ['./my-teaching-table.component.scss']
})
export class MyTeachingTableComponent implements OnInit{
  @Input() teachingData!: IMyTeaching[];

  constructor(private router: Router, private message: NzMessageService) {
  }

  ngOnInit(): void {
  }

  editCourse(id: number): void{
    this.router.navigate(['/', 'editcourse',id]);
  }

  createSuccessMessage(): void {
    this.message.create('success','The course is deleted successfully!');
  }

  deleteCourse(id: number): void{
    var data : IMyTeaching[] = [];
    for(let i = 0 ; i < this.teachingData.length; i++){
      if(this.teachingData[i].id != id){
        data.push(this.teachingData[i]);
      }
    }
    this.teachingData = data;
    this.createSuccessMessage()
  }




}

import {Component, Input, OnInit} from '@angular/core';
import { IMyTeaching} from "../../../../../interface/learning/i-my-teaching";

@Component({
  selector: 'my-teaching-table',
  templateUrl: './my-teaching-table.component.html',
  styleUrls: ['./my-teaching-table.component.scss']
})
export class MyTeachingTableComponent implements OnInit{
  @Input() teachingData!: IMyTeaching[];

  constructor() {
  }

  ngOnInit(): void {
  }

  editCourse(id: number): void{

  }

  deleteCourse(id: number): void{
    var data = this.teachingData;
    for(let i = 0 ; i < data.length, i++;){
      if(data[i].id == id){
        data.splice(i, 1);
      }
    }
    this.teachingData = data;
    console.log(data)
  }


}

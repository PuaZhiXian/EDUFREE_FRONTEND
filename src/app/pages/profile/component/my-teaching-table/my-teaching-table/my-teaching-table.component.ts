import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import { IMyTeaching} from "../../../../../interface/learning/i-my-teaching";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {finalize} from "rxjs";
import {GetAPIService} from "../../../../../get-api.service";

@Component({
  selector: 'my-teaching-table',
  templateUrl: './my-teaching-table.component.html',
  styleUrls: ['./my-teaching-table.component.scss']
})
export class MyTeachingTableComponent implements OnInit{

  teachingData!: IMyTeaching[];
  loadingTable:boolean = true;

  constructor(
    private router: Router,
    private message: NzMessageService,
    private api: GetAPIService,
    private ref: ChangeDetectorRef,) {
  }

  ngOnInit(): void {
    this.initMyTeachingData();
  }

  initMyTeachingData() {
    //TODO: api to get all user's courses
    var userId = sessionStorage.getItem('userId');
    this.api.getTeachingCourse(userId).pipe(
      finalize(() => {
        this.loadingTable = false;
        this.ref.detectChanges();
        this.ref.markForCheck();

      })
    ).subscribe((resp) => {
      this.teachingData = resp;
    })

  }

  editCourse(id: number): void{
    this.router.navigate(['/', 'editcourse',id]);
  }

  createSuccessMessage(): void {
    this.message.create('success','The course is deleted successfully!');
  }

  deleteCourse(id: number): void{
    var data : IMyTeaching[] = [];
    var deletedData: IMyTeaching[] = [];
    for(let i = 0 ; i < this.teachingData.length; i++){
      if(this.teachingData[i].id != id){
        data.push(this.teachingData[i]);
      }else{
        deletedData.push(this.teachingData[i]);
      }
    }
    this.api.deleteCourse(deletedData).pipe(
      finalize(() => {
        this.createSuccessMessage();
        this.initMyTeachingData();
        this.ref.detectChanges();
        this.ref.markForCheck();

      })
    ).subscribe((resp) => {
      console.log(resp);
    })
    //this.teachingData = data;
  }




}

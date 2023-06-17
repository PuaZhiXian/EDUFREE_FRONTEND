import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.scss']
})
export class AddcourseComponent implements OnInit{
  subCategory : string[] = [];
  isNextForm! : boolean;

  constructor() {

  }

  ngOnInit() {
    this.initSubCategory();
    this.isNextForm = false;
  }

  initSubCategory(){
    this.subCategory = ["Python", "Excel", "Web Developer","Data Science"];
  }

  onToggleForm(){
    this.isNextForm = true;
  }

}



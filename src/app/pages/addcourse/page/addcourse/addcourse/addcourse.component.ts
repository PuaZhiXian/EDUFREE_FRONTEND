import {Component, OnInit} from '@angular/core';
import {NzUploadChangeParam} from "ng-zorro-antd/upload";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {finalize} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";
@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.scss']
})
export class AddcourseComponent implements OnInit{
  addcourseForm! : UntypedFormGroup;
  subCategory : string[] = [];
  isNextForm! : boolean;
  isCompleted! : boolean;
  urlInput!: string;
  category!: string;

  constructor(private fb: UntypedFormBuilder,private router: Router,private message: NzMessageService) {

  }

  ngOnInit() {
    this.initSubCategory();
    this.initAddCourseForm();
    this.isNextForm = false;
    this.isCompleted = false;
  }

  initSubCategory(){
    this.subCategory = ["Python", "Excel", "Web Developer","Data Science"];
  }

  initAddCourseForm() {
    this.addcourseForm = this.fb.group({
      title: [null, [Validators.required]],
      author: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.min(0.00)]],
      description: [null, [Validators.required]],
    });
    this.category = "";
  }


  onToggleForm(){
    if(!this.isNextForm){
      if(this.addcourseForm.valid && this.category != ""){
        this.isNextForm = !this.isNextForm;
      }
      else if(this.category == ""){
        this.createErrorMessage("Please select a category for the course!");
      }
      else{
        Object.values(this.addcourseForm.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({onlySelf: true});
          }
        })
      }
    }
    else{
      this.isNextForm = !this.isNextForm;
    }
  }

  onSubmitForm() {
    if(this.isCompleted){
      var title = this.addcourseForm.value['title'];
      var author = this.addcourseForm.value['author'];
      var description = this.addcourseForm.value['description'];
      var price = this.addcourseForm.value['price'];
      var data = {
        'title' : title,
        'author' : author,
        'price': price,
        'description' : description,
        'category': this.category,
        'urlInput': this.urlInput
      }
      //TODO
      this.createSuccessMessage();
      this.backProfile();
    }
    else{
      this.createErrorMessage('Please upload a material or input the material URL!');
    }
  }

  handleChange({ file, fileList }: NzUploadChangeParam):void {
    this.isCompleted = file.status ==='done';
  }


  checkURL(value: string) : void {
    this.isCompleted = value!="";
    if(value != ""){
      this.urlInput = value;
    }
  }

  createSuccessMessage(): void {
    this.message.create('success','The course is added successfully!');
  }

  createErrorMessage(msg: string): void {
    this.message.create('error',msg);
  }

  backProfile() : void{
    this.router.navigate(['/', 'profile']);
  }

  onSelectCategory(value: string) {
    this.category = value;
  }
}



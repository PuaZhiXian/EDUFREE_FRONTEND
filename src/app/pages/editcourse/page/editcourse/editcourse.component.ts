import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {NzUploadChangeParam} from "ng-zorro-antd/upload";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-editcourse',
  templateUrl: './editcourse.component.html',
  styleUrls: ['./editcourse.component.scss']
})
export class EditcourseComponent implements OnInit{
  editcourseForm! : UntypedFormGroup;
  subCategory : string[] = [];
  isNextForm! : boolean;
  isCompleted! : boolean;
  urlInput!: string;
  category!: string;

  constructor(private fb: UntypedFormBuilder,private router: Router,private message: NzMessageService) {
  }
  ngOnInit() {
    this.initSubCategory();
    this.initEditCourseForm();
    this.isNextForm = false;
    this.isCompleted = false;
  }

  initSubCategory(){
    this.subCategory = ["Python", "Excel", "Web Developer","Data Science"];
  }

  initEditCourseForm() {
    this.editcourseForm = this.fb.group({
      title: [null, [Validators.required]],
      author: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.min(0.00)]],
      description: [null, [Validators.required]],
    });
    this.category = "";
  }


  onToggleForm(){
    if(!this.isNextForm){
      if(this.editcourseForm.valid && this.category != ""){
        this.isNextForm = !this.isNextForm;
      }
      else if(this.category == ""){
        this.createErrorMessage("Please select a category for the course!");
      }
      else{
        Object.values(this.editcourseForm.controls).forEach(control => {
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

  submitForm() {
    if (this.editcourseForm.valid) {
      var title = this.editcourseForm.value['title'];
      var author = this.editcourseForm.value['author'];
      var description = this.editcourseForm.value['description'];
      var price = this.editcourseForm.value['price'];
      var data = {
        'title' : title,
        'author' : author,
        'price': price,
        'description' : description,
        'category': this.category,
        'urlInput': this.urlInput
      }
      // TODO: API



    } else {
      Object.values(this.editcourseForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }

  onSubmitForm() {
    if(this.isCompleted){
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
    this.message.create('success','The course is edited successfully!');
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

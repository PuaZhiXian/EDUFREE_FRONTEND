import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NzUploadChangeParam} from "ng-zorro-antd/upload";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {finalize} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {GetAPIService} from "../../../../../get-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.scss']
})
export class AddcourseComponent implements OnInit{
  addcourseForm! : UntypedFormGroup;
  subCategory: any;
  isNextForm! : boolean;
  isCompleted! : boolean;
  urlInput!: string;
  category!: string;

  constructor(private fb: UntypedFormBuilder,
    private router: Router,
    private message: NzMessageService,
    private api: GetAPIService,
    private ref: ChangeDetectorRef,) {

  }

  ngOnInit() {
    this.initSubCategory();
    this.initAddCourseForm();
    this.isNextForm = false;
    this.isCompleted = false;
  }

  initSubCategory() {
    //TODO: api to get all user's courses
    this.api.getSubCategoryName().pipe(
      finalize(() => {
        this.ref.detectChanges();
        this.ref.markForCheck();
      })
    ).subscribe((resp) => {
      console.log(resp);
      this.subCategory = resp;
    })

  }

  initAddCourseForm() {
    this.addcourseForm = this.fb.group({
      title: [null, [Validators.required]],
      author: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.min(0.00)]],
      description: [null, [Validators.required]],
    });
    this.category = "";
    var userID = sessionStorage.getItem('userId');
    console.log(userID);
    this.api.getAuthorName(userID).pipe(
      finalize(() => {
        this.ref.detectChanges();
        this.ref.markForCheck();
      })
    ).subscribe((resp) => {
      console.log(resp)
      this.addcourseForm.get('author')?.setValue(resp.length == 0 ? '' : resp);
      if(resp.length > 0){
        this.addcourseForm.get('author')?.disable();
      }
    })

    console.log(this.addcourseForm)
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
    if (this.addcourseForm.valid) {
      this.addcourseForm.get('author')?.enable();
      var title = this.addcourseForm.value['title'];
      var author = this.addcourseForm.value['author'];
      var description = this.addcourseForm.value['description'];
      var price = this.addcourseForm.value['price'];
      var userID = sessionStorage.getItem('userId');
      var data = {
        'id' : userID,
        'title' : title,
        'author' : author,
        'price': price,
        'description' : description,
        'category': this.category,
        'urlInput': this.urlInput
      };
      console.log(data);
      this.api.addCourse(data).pipe(
        finalize(() => {
          this.createSuccessMessage();
          this.backProfile();
          this.ref.detectChanges();
          this.ref.markForCheck();
        })
      ).subscribe((resp) => {
        console.log(resp);
      })

    } else {
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



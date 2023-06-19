import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {NzUploadChangeParam} from "ng-zorro-antd/upload";
import {ActivatedRoute, Router} from "@angular/router";
import {GetAPIService} from "../../../../get-api.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {IMyTeaching} from "../../../../interface/learning/i-my-teaching";
import {finalize} from "rxjs";
import { CoursesRoutingModule } from 'src/app/pages/courses/courses-routing.module';

@Component({
  selector: 'app-editcourse',
  templateUrl: './editcourse.component.html',
  styleUrls: ['./editcourse.component.scss']
})
export class EditcourseComponent implements OnInit{
  editcourseForm! : UntypedFormGroup;
  subCategory : any;
  isNextForm! : boolean;
  isCompleted! : boolean;
  urlInput!: string;
  category!: string;

  id! : string | null;
  myTeachingData!: IMyTeaching[];
  courseToEdit!: IMyTeaching;

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private message: NzMessageService,
    private api: GetAPIService,
    private ref: ChangeDetectorRef,) {
  }

   ngOnInit() {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    this.initSubCategory();
    this.initTeachingData();
    this.isNextForm = false;
    this.isCompleted = true;
      //console.log(this.id); get course id
      // if (this.id != null) {
      //   var test = this.id;
      //   this.myTeachingData.forEach((course)=>{
      //     if(course.id == +test){
      //       console.log(course);
      //       this.courseToEdit = course;
      //     }
      //   });
      //   console.log('asdasd',this.courseToEdit)
      //   console.log(this.myTeachingData);
      // }

      this.initEditCourseForm()

  }

  // initSubCategory(){
  //   this.subCategory = ["Python", "Excel", "Web Developer","Data Science"];
  // }

  initSubCategory() {
    this.api.getSubCategoryName().pipe(
      finalize(() => {
        this.ref.detectChanges();
        this.ref.markForCheck();
      })
    ).subscribe((resp) => {
      // console.log(resp);
      this.subCategory = resp;
    })

  }

  initEditCourseForm() {
    this.editcourseForm = this.fb.group({
      title: [null, [Validators.required]],
      author: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.min(0.00)]],
      description: [null, [Validators.required]],
    });

    this.editcourseForm.get('title')?.setValue(this.courseToEdit == undefined ? ' ': this.courseToEdit.courseName );
    this.editcourseForm.get('author')?.setValue(this.courseToEdit == undefined ? ' ': this.courseToEdit.author);
    this.editcourseForm.get('price')?.setValue(this.courseToEdit == undefined ? ' ': this.courseToEdit.price);
    this.editcourseForm.get('description')?.setValue(this.courseToEdit == undefined ? ' ': this.courseToEdit.description);
    this.category = this.courseToEdit == undefined ? ' ': this.courseToEdit.category;
    this.urlInput = this.courseToEdit == undefined ? ' ': this.courseToEdit.url;
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
  onSubmitForm() {
    if(this.isCompleted){
      var title = this.editcourseForm.value['title'];
      var author = this.editcourseForm.value['author'];
      var description = this.editcourseForm.value['description'];
      var price = this.editcourseForm.value['price'];
      var data = {
        'id': this.id,
        "title" : title,
        "author" : author,
        "price": price,
        "description" : description,
        "category": this.category,
        "urlInput": this.urlInput
      }
      //TODO
      this.api.updateCourse(data).pipe(
        finalize(() => {
          this.ref.detectChanges();
          this.ref.markForCheck();
        })
      ).subscribe((resp) => {
        // console.log(resp);
        this.myTeachingData = resp;
      })
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

  // initTeachingData(){
  //   this.myTeachingData = [{
  //     id: 1,
  //     courseName: 'Python crashcourse',
  //     category: 'Python',
  //     author: 'Tester',
  //     description: 'This is a testing teaching course',
  //     price: 15.99,
  //     url: 'https://youtu.be/kqtD5dpn9C8'
  //   }]
  // }


  initTeachingData() {
    //TODO: api to get all user's courses
    // console.log(this.id);
    this.api.getEditCourse(this.id).pipe(
      finalize(() => {
        this.ref.detectChanges();
        this.ref.markForCheck();
      })
    ).subscribe((resp) => {
      // console.log(resp);
      this.myTeachingData = resp;
      this.courseToEdit = resp[0];
      this.initEditCourseForm();
    })

  }
}

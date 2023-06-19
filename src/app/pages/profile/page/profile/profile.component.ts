import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IMyLearning, IMyLearningCategory} from "../../../../interface/learning/i-my-learning";
import {IColumnDataPoints} from "../../../../interface/chart/i-column-data-points";
import {ILogout} from "../../../../interface/login/i-logout";
import {GetAPIService} from "../../../../get-api.service";
import {finalize} from 'rxjs';
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {AppComponent} from "../../../../app.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  chartOptions: any;
  columnCategoryType!: string;
  dayColumnDataPoints: IColumnDataPoints[] = [];
  monthColumnDataPoints: IColumnDataPoints[] = [];
  username!: string | null;

  myLearningCategoryType!: string;
  dayMyLearningData!: IMyLearning[];
  monthMyLearningData!: IMyLearning[];


  selectingMyLearningData!: IMyLearning[];
  MyLearningData!: IMyLearning[];
  logout: ILogout[] = [];

  validateForm!: UntypedFormGroup;

  listOfCategory: IMyLearningCategory[] = [];


  watchedVideoPercentage!: number;

  loadingChart: boolean = true;

  constructor(private fb: UntypedFormBuilder,
              private router: Router,
              public activatedRoute: ActivatedRoute,
              private api: GetAPIService,
              private ref: ChangeDetectorRef,) {
  }

  logOut() {
    var username = sessionStorage.getItem('username');
    var password = sessionStorage.getItem('password');
    var data = {
      'username': username,
      'password': password
    }
    this.api.logout(data).pipe(
      finalize(() => {
        this.ref.detectChanges();
        this.ref.markForCheck();
      })
    ).subscribe((resp) => {

    })
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
    sessionStorage.removeItem('userId');
    AppComponent.hiddenLogin = false;
    this.router.navigate(['/', 'dashboard']);

  }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
    this.initForm();
    this.changeHandler();
    this.initCategory();
    this.initColumnData();
    this.initProgress();
  }

  initCategory() {
    console.log('init category')
    var username = sessionStorage.getItem('username');
    this.api.getUserCategory(username).pipe(
      finalize(() => {
        this.ref.detectChanges();
        this.ref.markForCheck();
      })
    ).subscribe((resp) => {
      this.listOfCategory = resp;
      this.getMyLearningCategory(this.listOfCategory[0]);
    })

  }

  initProgress() {
    var username = sessionStorage.getItem('username');
    var data = {
      'username': username
    }
    this.api.getUserProgress(data).pipe(
      finalize(() => {
        this.ref.detectChanges();
        this.ref.markForCheck();
      })
    ).subscribe((resp) => {
      var totalProgress = Number(resp.totalProgress);
      var currentProgress = Number(resp.currentProgress);
      this.watchedVideoPercentage = Math.ceil((currentProgress / totalProgress) * 100);
    })
  }

  initForm() {
    this.validateForm = this.fb.group({
      searchKey: [null, []]
    });
  }

  changeHandler() {
    this.validateForm.valueChanges.subscribe((value => {
      this.searching();
    }));
  }

  initColumnData() {
    var newArr: IColumnDataPoints[] = [];
    this.api.getChartDay()
      .pipe(finalize(() => {
          this.getColumnChartData('Day');
          this.ref.detectChanges();
          this.ref.markForCheck();
        })
      ).subscribe((resp) => {
      for (let i = 0; i < resp.length; i++) {
        var data = {
          label: resp[i].label,
          y: Number(resp[i].y)
        }
        newArr.push(data);
      }
      this.dayColumnDataPoints = newArr;
    })
    var newArr2: IColumnDataPoints[] = [];
    this.api.getChartMonth()
      .pipe(finalize(() => {
          this.ref.detectChanges();
          this.ref.markForCheck();
        })
      ).subscribe((respond) => {
      for (let i = 0; i < respond.length; i++) {
        var data = {
          label: respond[i].label,
          y: Number(respond[i].y)
        }
        newArr2.push(data);
      }
      this.monthColumnDataPoints = newArr2;
    })

  }

  getColumnChartData(type: string) {
    this.loadingChart = true;
    this.columnCategoryType = type;

    //TODO: create api to get statictis
    this.chartOptions = {
      height: 260,
      data: [{
        color: "#B0D0B0",
        legendMarkerType: "none",
        type: "column",
        dataPoints: this.columnCategoryType === 'Day' ? this.dayColumnDataPoints : this.monthColumnDataPoints
      }]
    };

    this.ref.detectChanges();
    this.ref.markForCheck();
    this.loadingChart = false;
  }

  getMyLearningCategory(type: any) {
    this.validateForm.get('searchKey')?.setValue('');
    this.myLearningCategoryType = type;
    // TODO : pass category to backend then gain my learning data
    var username = sessionStorage.getItem('username');
    var data = {
      'username': username,
      'category': type == null ? ' ' : type
    }
    this.api.getUserCourse(data).pipe(
      finalize(() => {
        this.ref.detectChanges();
        this.ref.markForCheck();
      })
    ).subscribe((resp) => {
      this.MyLearningData = resp;
      this.selectingMyLearningData = this.MyLearningData;
    })

    // this.selectingMyLearningData = [
    //   {
    //     id: "1",
    //     courseName: 'Introduction to Data Science',
    //     description: 'N/A',
    //     progress: 50,
    //     img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRxNhdWds9jljKiw7UEWef9tCslalAucMkUu9z4GkC8-Bfucvpr'
    //   },
    //   {
    //     id: "1",
    //     courseName: 'UI/UX Design',
    //     description: 'N/A',
    //     progress: 90,
    //     img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSyZEbbB9vP9PtVmYKk3N2d_YZzk3nBjS0hrMZrlRSLEtyKCPZ_'
    //   },
    //   {
    //     id: "1",
    //     courseName: 'Fundamental of Web Programming',
    //     description: 'Creating a website...',
    //     progress: 20,
    //     img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTg5j5w2xybUndnmFDBn19mJCk0Vd6BT3wmSuxGnXXwG0exeP9G'
    //   },
    //   {
    //     id: "1",
    //     courseName: 'Digital Marketing 101',
    //     description: 'Marketing strategies and concepts for beginners',
    //     progress: 100,
    //     img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT2jlelmdJPCLa6V9cCTnUk81iEfS8N6uVAmLtT8FYdrHqK4mf2'
    //   }
    // ]
  }


  searching() {
    // let temp = this.myLearningCategoryType === 'Day' ? this.dayMyLearningData : this.monthMyLearningData
    if (this.validateForm.value.searchKey.length == 0) {
      this.selectingMyLearningData = this.MyLearningData;
    } else {
      this.selectingMyLearningData = this.MyLearningData.filter((items) => {
        return this.isMatch(items.courseName) || this.isMatch(items.description)
      })
    }

  }

  isMatch(str: string): boolean {
    return str.toLocaleLowerCase().includes(this.validateForm.value.searchKey.toLowerCase());
  }

  addCourse(): void {
    this.router.navigate(['/', 'addcourse']);
  }

}

import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IColumnDataPoints} from "../../../../interface/chart/i-column-data-points";
import {IMyLearning} from "../../../../interface/learning/i-my-learning";
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  chartOptions: any;
  columnCategoryType!: string;
  dayColumnDataPoints!: IColumnDataPoints[];
  monthColumnDataPoints!: IColumnDataPoints[];

  myLearningCategoryType!: string;
  dayMyLearningData!: IMyLearning[];
  monthMyLearningData!: IMyLearning[];

  selectingMyLearningData!: IMyLearning[];

  validateForm!: UntypedFormGroup;

  constructor(private router: Router,
              public activatedRoute: ActivatedRoute,
              private fb: UntypedFormBuilder,
              private ref: ChangeDetectorRef,) {
  }

  logOut() {
    //TODO: create api for log out
    this.router.navigate(['/', 'dashboard']);
  }

  ngOnInit(): void {
    this.initColumnData();
    this.initMyLearningData();
    this.getColumnChartData('Day');
    this.getMyLearningCategory('Day');
    this.myLearningCategoryType = 'Day';
    this.initForm();
    this.changeHandler();
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
    this.dayColumnDataPoints = [
      {label: "1 Jan", y: 10},
      {label: "2 Jan", y: 15},
      {label: "3 Jan", y: 25},
      {label: "4 Jan", y: 30},
      {label: "5 Jan", y: 28},
      {label: "6 Jan", y: 10},
      {label: "7 Jan", y: 15},
      {label: "8 Jan", y: 25},
      {label: "9 Jan", y: 30},
      {label: "10 Jan", y: 28},
      {label: "11 Jan", y: 10},
      {label: "12 Jan", y: 15},
      {label: "13 Jan", y: 25},
      {label: "14 Jan", y: 30},
      {label: "15 Jan", y: 28},
      {label: "16 Jan", y: 10},
      {label: "17 Jan", y: 15},
      {label: "18 Jan", y: 25},
      {label: "19 Jan", y: 30},
      {label: "20 Jan", y: 28},
      {label: "21 Jan", y: 10},
      {label: "22 Jan", y: 15},
      {label: "23 Jan", y: 25},
      {label: "24 Jan", y: 30},
      {label: "25 Jan", y: 28},
      {label: "26 Jan", y: 10},
      {label: "27 Jan", y: 15},
      {label: "28 Jan", y: 25},
      {label: "29 Jan", y: 30},
      {label: "30 Jan", y: 28},
      {label: "31 Jan", y: 28}
    ];
    this.monthColumnDataPoints = [
      {label: "Jan", y: 10},
      {label: "Feb", y: 15},
      {label: "Mar", y: 25},
      {label: "Apr", y: 30},
      {label: "May", y: 28},
      {label: "Jun", y: 10},
      {label: "Jul", y: 15},
      {label: "Aug", y: 25},
      {label: "Sep", y: 30},
      {label: "Oct", y: 28},
      {label: "Nov", y: 10},
      {label: "Sep", y: 15}
    ];
  }

  initMyLearningData() {
    this.dayMyLearningData = [
      {
        id: "1",
        courseName: 'Fundamental of Web Programming',
        description: 'Creating a website...',
        progress: 20,
        img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTg5j5w2xybUndnmFDBn19mJCk0Vd6BT3wmSuxGnXXwG0exeP9G'
      },
      {
        id: "1",
        courseName: 'Digital Marketing 101',
        description: 'Marketing strategies and concepts for beginners',
        progress: 100,
        img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT2jlelmdJPCLa6V9cCTnUk81iEfS8N6uVAmLtT8FYdrHqK4mf2'
      },
      {
        id: "1",
        courseName: 'Introduction to Data Science',
        description: 'N/A',
        progress: 50,
        img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRxNhdWds9jljKiw7UEWef9tCslalAucMkUu9z4GkC8-Bfucvpr'
      },
      {
        id: "1",
        courseName: 'UI/UX Design',
        description: 'N/A',
        progress: 90,
        img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSyZEbbB9vP9PtVmYKk3N2d_YZzk3nBjS0hrMZrlRSLEtyKCPZ_'
      }
    ];

    this.monthMyLearningData = [
      {
        id: "1",
        courseName: 'Introduction to Data Science',
        description: 'N/A',
        progress: 50,
        img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRxNhdWds9jljKiw7UEWef9tCslalAucMkUu9z4GkC8-Bfucvpr'
      },
      {
        id: "1",
        courseName: 'UI/UX Design',
        description: 'N/A',
        progress: 90,
        img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSyZEbbB9vP9PtVmYKk3N2d_YZzk3nBjS0hrMZrlRSLEtyKCPZ_'
      },
      {
        id: "1",
        courseName: 'Fundamental of Web Programming',
        description: 'Creating a website...',
        progress: 20,
        img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTg5j5w2xybUndnmFDBn19mJCk0Vd6BT3wmSuxGnXXwG0exeP9G'
      },
      {
        id: "1",
        courseName: 'Digital Marketing 101',
        description: 'Marketing strategies and concepts for beginners',
        progress: 100,
        img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT2jlelmdJPCLa6V9cCTnUk81iEfS8N6uVAmLtT8FYdrHqK4mf2'
      }
    ]

  }

  getColumnChartData(type: string) {
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
  }

  getMyLearningCategory(type: string) {
    this.myLearningCategoryType = type;
    this.selectingMyLearningData = this.myLearningCategoryType === 'Day' ? this.dayMyLearningData : this.monthMyLearningData
  }


  searching() {
    let temp = this.myLearningCategoryType === 'Day' ? this.dayMyLearningData : this.monthMyLearningData
    if (this.validateForm.value.searchKey.length == 0) {
      this.selectingMyLearningData = temp;
    } else {
      this.selectingMyLearningData = temp.filter((items) => {
        return this.isMatch(items.courseName) || this.isMatch(items.description)
      })
    }

  }

  isMatch(str: string): boolean {
    return str.toLocaleLowerCase().includes(this.validateForm.value.searchKey.toLowerCase());
  }

}
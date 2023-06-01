import {Component, OnInit, ViewChild} from '@angular/core';
import {NzCarouselComponent} from "ng-zorro-antd/carousel";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  array = [1, 2, 3, 4];
  effect = 'scrollx';
  @ViewChild('recommendCarousel') recommendCarousel!: NzCarouselComponent;

  panels = [
    {
      id: '01',
      active: true,
      name: 'This is panel header 1',
      answer: 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'
    },
    {
      id: '02',
      active: false,
      name: 'This is panel header 2',
      answer: 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'
    },
    {
      id: '03',
      active: false,
      name: 'This is panel header 3',
      answer: 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'
    }
  ];

  loadingRecommend: boolean = true;
  loadingFQA: boolean = true;

  ngOnInit(): void {
    this.loadingRecommend = false;
    this.loadingFQA = false;
  }

  onCarousel(direction: string) {
    direction === 'right' ? this.recommendCarousel.next() : this.recommendCarousel.pre();
  }

}

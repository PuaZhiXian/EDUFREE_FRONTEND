import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ILearning} from "../../../../interface/learning/i-learning";
import {IVideo} from "../../../../interface/learning/i-video";
import {GetAPIService} from "../../../../get-api.service";
import {finalize} from 'rxjs';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LearningComponent implements OnInit {

  courseId!: string | null;
  loadingCourse: boolean = true;
  iLearning!: ILearning;
  isCollapsed = false;
  selectedVideo!: IVideo;

  previousVideo?: IVideo;
  nextVideo?: IVideo;
  previousCategory?: string;
  nextCategory?: string;

  constructor(private router: Router,
              public activatedRoute: ActivatedRoute,
              private api: GetAPIService,
              private ref: ChangeDetectorRef,) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.courseId = params.get('courseId');
    });
    this.initCourse();
  }

  initCourse() {
    //TODO: create api to gain learning course detail
    this.api.getLearningDetails(this.courseId).pipe(
      finalize(() => {
        this.ref.detectChanges();
        this.ref.markForCheck();
      })
    ).subscribe((resp) => {
      this.iLearning = resp;
      this.selectVideo(this.iLearning.listVideos[0].videos[0], this.iLearning.listVideos[0].category);
      this.loadingCourse = false;
    })

    this.iLearning = {
      listVideos: [
        {
          category: 'HTML',
          videos: [
            {
              title: 'What is HTML',
              link: "https://www.youtube.com/embed/3eUx5phZZMA"
            },
            {
              title: 'HTML Heading Elements',
              link: "https://www.youtube.com/embed/BEULybZnLO8"
            },
            {
              title: 'HTML Paragraph Elements',
              link: "https://www.youtube.com/embed/3eUx5phZZMA"
            },
            {
              title: 'The List Element',
              link: "https://www.youtube.com/embed/BEULybZnLO8"
            },
            {
              title: 'Anchor Elements',
              link: "https://www.youtube.com/embed/3eUx5phZZMA"
            },
            {
              title: 'Image Elements',
              link: "https://www.youtube.com/embed/3eUx5phZZMA"
            },
            {
              title: '[Project] Birthday Invite',
              link: "https://www.youtube.com/embed/3eUx5phZZMA"
            }
          ]
        },
        {
          category: 'CSS',
          videos: [
            {
              title: 'Why do we need CSS?',
              link: "https://www.youtube.com/embed/3eUx5phZZMA"
            },
            {
              title: 'How to add CSS',
              link: "https://www.youtube.com/embed/3eUx5phZZMA"
            },
            {
              title: 'CSS selectors',
              link: "https://www.youtube.com/embed/3eUx5phZZMA"
            },
            {
              title: 'CSS colours',
              link: "https://www.youtube.com/embed/3eUx5phZZMA"
            },
            {
              title: 'Font properties',
              link: "https://www.youtube.com/embed/3eUx5phZZMA"
            },
            {
              title: 'The CSS Box Model',
              link: "https://www.youtube.com/embed/3eUx5phZZMA"
            },
            {
              title: '[Project] Motivational Poster\n',
              link: "https://www.youtube.com/embed/3eUx5phZZMA"
            }
          ]
        }
      ],
      viewed: 4,
      total: 20
    }
    this.selectVideo(this.iLearning.listVideos[0].videos[0], this.iLearning.listVideos[0].category);
    this.loadingCourse = false;
  }

  selectVideo(video: IVideo, category: string) {
    this.selectedVideo = video;

    let categoryIndex = 1; // Index of the selected category
    let videoIndex = 2; // Index of the selected video within the category

    this.iLearning.listVideos.filter((item, i) => {
      if (item.category === category) {
        categoryIndex = i;
        item.videos.filter((v, j) => {
          if (v.title === video.title) {
            videoIndex = j;
          }
        })
      }
    })

    this.getPreNextVideo(categoryIndex, videoIndex);
    this.ref.detectChanges();
    this.ref.markForCheck();
  }

  findVideoIndex(categoryIndex: number, videoIndex: number): [number, number] {
    let nextVideoIndex = videoIndex + 1;
    let nextCategoryIndex = categoryIndex;

    if (nextVideoIndex >= this.iLearning.listVideos[categoryIndex].videos.length) {
      nextVideoIndex = 0;
      nextCategoryIndex = categoryIndex + 1;
    }

    if (nextCategoryIndex >= this.iLearning.listVideos.length) {
      nextCategoryIndex = -1; // Undefined category
    }

    return [nextCategoryIndex, nextVideoIndex];
  }

  getPreNextVideo(categoryIndex: number, videoIndex: number): void {
    const [preCategoryIndex, preVideoIndex] = videoIndex === 0
      ? [categoryIndex - 1, this.iLearning.listVideos[categoryIndex - 1]?.videos.length - 1]
      : [categoryIndex, videoIndex - 1];

    const [nextCategoryIndex, nextVideoIndex] = this.findVideoIndex(categoryIndex, videoIndex);

    const preVideo = preCategoryIndex >= 0
      ? this.iLearning.listVideos[preCategoryIndex].videos[preVideoIndex]
      : undefined;

    const nextVideo = nextCategoryIndex >= 0
      ? this.iLearning.listVideos[nextCategoryIndex].videos[nextVideoIndex]
      : undefined;

    this.previousCategory = preCategoryIndex >= 0
      ? this.iLearning.listVideos[preCategoryIndex].category
      : undefined;

    this.nextCategory = nextCategoryIndex >= 0
      ? this.iLearning.listVideos[nextCategoryIndex].category
      : undefined;

    this.previousVideo = preVideo;
    this.nextVideo = nextVideo;
  }


  logOut() {
    //TODO: create api for log out
    this.router.navigate(['/', 'dashboard']);
  }
}

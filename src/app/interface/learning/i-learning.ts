import {IVideo} from "./i-video";

export interface ILearning {
  total: number,
  viewed: number,
  listVideos: IVideoCategory[]
}

interface IVideoCategory {
  category: string,
  videos: IVideo[];
}



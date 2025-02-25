import { ClassNameValue } from "tailwind-merge";

export interface IPollUI {
  pollOption: string;
  percentage: number;
  totalVotes: number;
}


export interface IImage {
  url: string;
  alt?: string;
}

export interface IAvtrBlock {
  name: string;
  role: string;
  avatarUrl: string;
  fallBack?: string;
}


export interface IPost {
  avtrDets: IAvtrBlock;
  text: string;
  poll?: IPollUI[];
  image?: IImage;
}

export interface IAnnouncementCard {
  title: string;
  time: string;
}


export interface IAvtrDets {
  name: string;
  role: string;
  avatarUrl: string;
  fallBack: string;
}

export interface IAvtrComponent {
  className?: ClassNameValue;
  index?: number;
  avtr: IAvtrDets;
}
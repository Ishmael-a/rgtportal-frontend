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
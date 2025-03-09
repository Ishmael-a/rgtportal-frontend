interface CreatePostDto {
  media?: string[];
  content: string;
  author?: {
    id: number;
    firstName: string;
    lastName: string;
    profileImage?: string;
  };
}

interface IPost {
  id:number;
  media?: string[];
  content: string;
  author?: {
    id: number;
    firstName: string;
    lastName: string;
    profileImage?: string;
  };
  publishDate: Date;
}

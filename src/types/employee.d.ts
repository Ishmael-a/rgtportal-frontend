import { ClassNameValue } from "tailwind-merge";
interface IProjectCard {
  id: string | number;
  members: IProjectMembers[];
  projectName: string;
  leadName: string;
}

interface IProjectMembers {
  id: number;
  name: string;
  avtr: { url: string; fallBack: string };
  department: string;
  role: string;
}

interface IPollUI {
  pollOption: string;
  percentage: number;
  totalVotes: number;
}

interface IImage {
  url: string;
  alt?: string;
}

interface IAvtrBlock {
  name: string;
  role: string;
  avatarUrl: string;
  fallBack?: string;
}

interface IPost {
  avtrDets: IAvtrBlock;
  text: string;
  poll?: IPollUI[];
  image?: IImage;
}

interface IAnnouncementCard {
  title: string;
  time: string;
}

// interface IAvtrDets {
//   name: string;
//   role: string;
//   avatarUrl: string;
//   fallBack: string;
// }

interface IAvtrComponent {
  className?: ClassNameValue;
  index?: number;
  url: string;
  name: string;
}

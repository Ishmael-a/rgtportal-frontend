export interface IEventList {
  event: "holiday" | "birthday" | "meeting";
  date: string;
  title: string;
}

const EventList: React.FC<IEventList> = ({ event, date, title }) => {
  
  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div className="flex items-center space-x-2">
        <img
          src={
            event === "birthday"
              ? "/Gift.svg"
              : event === "holiday"
              ? "/Moon.svg"
              : "/UsersFour.svg"
          }
          alt="calendar"
          className="bg-[#EEF2FF] p-2 rounded-full"
        />
        <div>
          <p className="text-rgtgray text-sm font-medium">{title}</p>
          <p className="text-rgtgray text-xs font-medium">{date}</p>
        </div>
      </div>
      <img src="/Notification 3.svg" alt="notification" className="cursor-pointer" />
    </div>
  );
};

export default EventList;

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const EventsCalendar = () => {
  return (
    <main className="p-4 space-y-4">
      <header>
        <p className="text-[#706D8A] text-2xl font-semibold">Event Calendar</p>
        <p className="text-[#706D8A] text-xs">
          These are all your upcoming events for the week
        </p>
      </header>

      <section className="overflow-x-scroll bg-white rounded-md p-2 flex flex-col space-y-4">
        <div className="grid grid-cols-7 w-full">
          {days.map((item, index) => (
            <p
              key={index}
              className="text-[#A5A5A5] text-sm bg-red-200 text-center"
            >
              {item}
            </p>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-4 w-full">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
            <div
              className="border-[2px] p-3 border-[#F6EEFF] bg-[#F5F5F5] rounded-sm min-h-32 "
              key={index}
            >
              <p className="font-bold text-2xl">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default EventsCalendar;

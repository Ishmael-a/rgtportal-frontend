const RightSidebar = () => {
  return (
    <aside className="w-80 bg-white p-4 shadow-md">
      <h2 className="text-lg font-bold">Upcoming Events</h2>
      <div className="mt-4">
        {["Frank’s Birthday - Jun 25, 2028", "Holiday - Jun 28, 2028", "End of year Party - Aug 19, 2028"].map((event, index) => (
          <p key={index} className="text-sm text-gray-600">{event}</p>
        ))}
      </div>
      <h2 className="text-lg font-bold mt-6">Announcements</h2>
      <div className="mt-4">
        {["Happy Hour - Fri 14 @ 1:00pm"].map((announcement, index) => (
          <p key={index} className="text-sm text-gray-600">{announcement}</p>
        ))}
      </div>
    </aside>
  );
};


export default RightSidebar;
const StatsCard = ({ title, count, color }: {
    title: string;
    count: string;
    color: string;
}) => {
  return (
    <div className={`p-4 rounded-lg shadow-md ${color}`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl font-bold">{count}</p>
      <p className="text-sm">+15% than last Month</p>
    </div>
  );
};

const StatsGrid = () => {
  const stats = [
    { title: "Total Employees", count: "2,048", color: "bg-purple-100" },
    { title: "Regular Employees", count: "2,048", color: "bg-pink-100" },
    { title: "NSS Employees", count: "2,048", color: "bg-blue-100" },
    { title: "PTO Requests", count: "2,048", color: "bg-yellow-100" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatsGrid;
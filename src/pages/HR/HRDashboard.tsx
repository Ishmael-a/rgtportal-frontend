import {MetricCard, IMetricCard} from "../../components/Hr/MetricCard";

export const HRDashboard = () => {

    const metrics:IMetricCard[] = [
        { title: "Total Employees", value: "2,048", growth: "15", color: "purple" },
        { title: "Regular Employees", value: "2,048", growth: "15", color: "pink" },
        { title: "NSS Employees", value: "2,048", growth: "15", color: "blue" },
        { title: "PTO Requests", value: "2,048", growth: "15", color: "yellow" }
    ];

    return (
        <div className="flex flex-col">

            {/* <div className="p-6 bg-gray-50"> */}
                <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4">
                    {metrics.map((metric, index) => (
                    <MetricCard 
                        key={index}
                        title={metric.title}
                        value={metric.value}
                        growth={metric.growth}
                        color={metric.color}
                    />
                    ))}
                </div>
            {/* </div> */}
            <div>
                Employee Table
            </div>

        </div>
    )
}
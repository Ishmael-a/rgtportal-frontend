import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

const quickActions = [
  {
    title: "Recognition",
    description: "Create the new list for the applause corner",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Special Events",
    description: "App upcoming events for the week for the employees",
    color: "bg-pink-100 text-pink-600",
  },
  {
    title: "Announcements",
    description: "Add new announcements for the employees",
    color: "bg-blue-100 text-blue-600",
  },
];

export default function QuickActions() {
  return (
    <Card className="p-6 rounded-2xl bg-gray-50 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h2>
      <CardContent className="space-y-4">
        {quickActions.map((action, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition duration-300"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-lg ${action.color}`}
              >
                <img src={"./Award.svg"} className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-md font-semibold text-gray-700">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-500">{action.description}</p>
              </div>
            </div>
            <Plus className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600 transition duration-300" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

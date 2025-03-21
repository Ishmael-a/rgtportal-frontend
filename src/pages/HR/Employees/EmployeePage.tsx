import React, { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Edit, User } from "lucide-react";
import {
ReactFlow,
MiniMap,
Controls,
Background,
useNodesState,
useEdgesState,
addEdge,
BackgroundVariant,
Position,
MarkerType,
Node,
Edge,
NodeProps,
EdgeProps,
Connection,
NodeChange,
EdgeChange,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

// Node data interface
interface NodeData extends Record<string, unknown> {
label: string;
value?: string;
}

// Edge data interface
interface EdgeData extends Record<string, unknown> {
  label?: string;
}

// Custom node styles
const nodeStyles = {
common: {
  padding: "10px",
  borderRadius: "16px",
  width: 180,
  fontSize: "14px",
  color: "white",
  fontWeight: "medium",
},
header: {
  backgroundColor: "#C4A9F8",
  padding: "12px 16px",
  color: "#6E3CBC",
  fontWeight: "bold",
  fontSize: "16px",
},
detail: {
  backgroundColor: "#DCC6FF",
  padding: "8px 12px",
},
};

// Custom edge style
const customEdgeStyle: React.CSSProperties = {
stroke: "#FFC233",
strokeWidth: 2,
};

// Define the main section nodes (fixed position)
const personalDetailsNode: Node<NodeData> = {
id: "personal-details",
position: { x: 150, y: 30 },
data: { label: "Personal Details" },
type: "header",
draggable: false,
style: { ...nodeStyles.common, ...nodeStyles.header },
sourcePosition: Position.Right,
};

const workDetailsNode: Node<NodeData> = {
id: "work-details",
position: { x: 150, y: 350 },
data: { label: "Work Details" },
type: "header",
draggable: false,
style: { ...nodeStyles.common, ...nodeStyles.header },
sourcePosition: Position.Right,
};

// Define personal detail nodes (movable)
const personalDetailNodes: Node<NodeData>[] = [
{
  id: "phone",
  position: { x: 50, y: 100 },
  data: { label: "Phone", value: "+123 456 7890" },
  style: { ...nodeStyles.common, ...nodeStyles.detail },
  parentId: "personal-details",
  targetPosition: Position.Left,
},
{
  id: "personal-email",
  position: { x: 350, y: 100 },
  data: { label: "Personal Email", value: "giveittoparry@gmail.com" },
  style: { ...nodeStyles.common, ...nodeStyles.detail },
  targetPosition: Position.Left,
},
{
  id: "work-email",
  position: { x: 550, y: 200 },
  data: { label: "Work Email", value: "bparry@reallygreatech.com" },
  style: { ...nodeStyles.common, ...nodeStyles.detail },
  targetPosition: Position.Left,
},
{
  id: "location",
  position: { x: 750, y: 100 },
  data: { label: "Location", value: "Accra, Great Accra, Ghana" },
  style: { ...nodeStyles.common, ...nodeStyles.detail },
  targetPosition: Position.Left,
},
{
  id: "phone2",
  position: { x: 350, y: 300 },
  data: { label: "Phone", value: "+123 456 7890" },
  style: { ...nodeStyles.common, ...nodeStyles.detail },
  targetPosition: Position.Left,
},
{
  id: "skills",
  position: { x: 650, y: 350 },
  data: { label: "Skills", value: "UI/UX, Front-End" },
  style: { ...nodeStyles.common, ...nodeStyles.detail },
  targetPosition: Position.Left,
},
];

// Define work detail nodes (movable)
const workDetailNodes: Node<NodeData>[] = [
{
  id: "start-date",
  position: { x: 50, y: 450 },
  data: { label: "Start Date", value: "07-12-2013" },
  style: { ...nodeStyles.common, ...nodeStyles.detail },
  parentId: "work-details",
  targetPosition: Position.Left,
},
{
  id: "department",
  position: { x: 350, y: 450 },
  data: { label: "Department", value: "Design" },
  style: { ...nodeStyles.common, ...nodeStyles.detail },
  targetPosition: Position.Left,
},
{
  id: "seniority",
  position: { x: 650, y: 450 },
  data: { label: "Seniority", value: "27 years in service" },
  style: { ...nodeStyles.common, ...nodeStyles.detail },
  targetPosition: Position.Left,
},
];

// Combine all nodes
const initialNodes: Node<NodeData>[] = [
personalDetailsNode,
workDetailsNode,
...personalDetailNodes,
...workDetailNodes,
];

// Define the edges with markers to create the dot connections
const initialEdges: Edge<EdgeData>[] = [
// Personal details connections
{
  id: "e-personal-phone",
  source: "personal-details",
  target: "phone",
  style: customEdgeStyle,
  type: "custom",
},
{
  id: "e-personal-pEmail",
  source: "personal-details",
  target: "personal-email",
  style: customEdgeStyle,
  type: "custom",
},
{
  id: "e-pEmail-wEmail",
  source: "personal-email",
  target: "work-email",
  style: customEdgeStyle,
  type: "custom",
},
{
  id: "e-personal-location",
  source: "personal-details",
  target: "location",
  style: customEdgeStyle,
  type: "custom",
},
{
  id: "e-personal-phone2",
  source: "personal-details",
  target: "phone2",
  style: customEdgeStyle,
  type: "custom",
},
{
  id: "e-personal-skills",
  source: "personal-email",
  target: "skills",
  style: customEdgeStyle,
  type: "custom",
},

// Work details connections
{
  id: "e-work-startDate",
  source: "work-details",
  target: "start-date",
  style: customEdgeStyle,
  type: "custom",
},
{
  id: "e-work-department",
  source: "work-details",
  target: "department",
  style: customEdgeStyle,
  type: "custom",
},
{
  id: "e-work-seniority",
  source: "work-details",
  target: "seniority",
  style: customEdgeStyle,
  type: "custom",
},
{
  id: "e-department-seniority",
  source: "department",
  target: "seniority",
  style: customEdgeStyle,
  type: "custom",
},
];

// Custom Node Component for better display of employee data
const DetailNode: React.FC<
  NodeProps<Node<NodeData, string>>
> = ({ data }) => {
  return (
    <div>
      <div className="font-medium">{data.label}</div>
      {data.value && <div className="text-sm opacity-80">{data.value}</div>}
    </div>
  );
};

// Map of node types to custom components
const nodeTypes = {
header: DetailNode,
detail: DetailNode,
};

// Custom edge component with correct typing
const CustomEdge: React.FC<EdgeProps & { 
sourceX: number; 
sourceY: number; 
targetX: number; 
targetY: number; 
}> = ({
id,
sourceX,
sourceY,
targetX,
targetY,
style = {},
}) => {
const edgePathString = `M${sourceX},${sourceY} C${sourceX + 50},${sourceY} ${
  targetX - 50
},${targetY} ${targetX},${targetY}`;

return (
  <>
    <path
      id={id}
      className="react-flow__edge-path"
      d={edgePathString}
      style={style}
    />
    <circle cx={targetX} cy={targetY} r={4} fill="#FFC233" />
  </>
);
};

// Map of edge types
const edgeTypes = {
custom: CustomEdge,
};

// Interface for employee data
interface EmployeeData {
name: string;
title: string;
status: string;
personalDetails: {
  phone: string;
  personalEmail: string;
  workEmail: string;
  location: string;
  skills: string;
};
workDetails: {
  startDate: string;
  department: string;
  seniority: string;
};
}

const EmployeeProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"details" | "activity">("details");
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            type: "custom",
            style: customEdgeStyle,
          },
          eds
        )
      ),
    [setEdges]
  );

  const employee: EmployeeData = {
    name: "Bernard Parry Koranteng",
    title: "Senior UI/UX",
    status: "Active",
    personalDetails: {
      phone: "+123 456 7890",
      personalEmail: "giveittoparry@gmail.com",
      workEmail: "bparry@reallygreatech.com",
      location: "Accra, Great Accra, Ghana",
      skills: "UI/UX, Front-End",
    },
    workDetails: {
      startDate: "07-12-2013",
      department: "Design",
      seniority: "27 years in service",
    },
  };

  // This will ensure edges follow nodes when moved
  const onNodeDragStop = (event: React.MouseEvent, node: Node) => {
    // Only allow specific nodes to be moved
    if (node.id === "personal-details" || node.id === "work-details") {
      return;
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen w-full p-4">
      {/* Header with Breadcrumbs */}
      <div className="mb-4">
        <h1 className="text-2xl font-medium text-slate-600">
          Employee Profile
        </h1>
        <div className="flex items-center text-sm text-slate-500">
          <span>Employee Cards</span>
          <span className="mx-2">&gt;</span>
          <span>Employee Profile</span>
        </div>
      </div>

      {/* Profile Card */}
      <Card className="w-full bg-white shadow-sm rounded-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-purple-50 py-6 px-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-purple-200 flex items-center justify-center">
                <User size={32} className="text-purple-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-medium text-slate-700">
                    {employee.name}
                  </h2>
                  <span className="px-2 py-0.5 text-xs bg-green-100 text-green-600 rounded-full">
                    {employee.status}
                  </span>
                </div>
                <p className="text-slate-500">{employee.title}</p>
              </div>
            </div>

            {/* Custom Fluid Tabs */}
            <div className="relative">
              {/* Tabs Background */}
              <div className="absolute inset-0 bg-purple-50 h-12"></div>

              {/* Tabs Container */}
              <div className="relative flex px-6 z-10">
                {/* Details Tab with Fluid Connection */}
                <div
                  className={`relative cursor-pointer ${
                    activeTab === "details"
                      ? "text-purple-700"
                      : "text-slate-500"
                  }`}
                  onClick={() => setActiveTab("details")}
                >
                  {activeTab === "details" && (
                    <div
                      className="absolute -bottom-6 left-0 right-0 h-12 bg-white"
                      style={{
                        borderTopLeftRadius: "60px",
                        borderTopRightRadius: "60px",
                        width: "100%",
                        left: "0%",
                        bottom: "-70px",
                        height: "100px",
                        zIndex: -1,
                      }}
                    ></div>
                  )}
                  <span className="relative z-10 pt-10 px-8 text-sm block">
                    Details
                  </span>
                </div>

                {/* Activity Tab */}
                <div
                  className={`relative cursor-pointer ${
                    activeTab === "activity"
                      ? "text-purple-700"
                      : "text-slate-500"
                  }`}
                  onClick={() => setActiveTab("activity")}
                >
                  {activeTab === "activity" && (
                    <div
                      className="absolute -bottom-6 left-0 right-0 h-12 bg-white"
                      style={{
                        borderTopLeftRadius: "60px",
                        borderTopRightRadius: "60px",
                        width: "120%",
                        left: "0%",
                        bottom: "-70px",
                        height: "100px",
                        zIndex: -1,
                      }}
                    ></div>
                  )}
                  <span className="relative z-10 pt-10 px-8 text-sm block">
                    Activity
                  </span>
                </div>
              </div>
            </div>

            <button className="text-purple-500 hover:text-purple-700 p-4">
              <Edit size={18} />
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white p-6">
          {activeTab === "details" && (
            <div style={{ height: "600px" }}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeDragStop={onNodeDragStop}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                defaultEdgeOptions={{
                  type: "custom",
                  style: customEdgeStyle,
                }}
                fitView
                attributionPosition="bottom-left"
              >
                <Background
                  variant={BackgroundVariant.Dots}
                  gap={20}
                  size={1}
                  color="#F3F4F6"
                />
                <Controls />
                <MiniMap />
              </ReactFlow>
            </div>
          )}

          {activeTab === "activity" && (
            <div className="text-center p-8 text-slate-500">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Activity Timeline */}
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 text-slate-700">
                    Recent Activities
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mt-1.5 mr-3"></div>
                      <div>
                        <p className="text-sm text-slate-600">
                          Updated Profile Information
                        </p>
                        <span className="text-xs text-slate-500">
                          2 hours ago
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-3 h-3 bg-green-500 rounded-full mt-1.5 mr-3"></div>
                      <div>
                        <p className="text-sm text-slate-600">
                          Completed Training Module
                        </p>
                        <span className="text-xs text-slate-500">
                          Yesterday
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mt-1.5 mr-3"></div>
                      <div>
                        <p className="text-sm text-slate-600">
                          Performance Review Submitted
                        </p>
                        <span className="text-xs text-slate-500">
                          Last Week
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 text-slate-700">
                    Performance Metrics
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Project Completion</span>
                        <span className="text-green-600">85%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2.5">
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{ width: "85%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Client Satisfaction</span>
                        <span className="text-purple-600">92%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2.5">
                        <div
                          className="bg-purple-500 h-2.5 rounded-full"
                          style={{ width: "92%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Team Collaboration</span>
                        <span className="text-blue-600">78%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-500 h-2.5 rounded-full"
                          style={{ width: "78%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upcoming Events */}
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 text-slate-700">
                    Upcoming Events
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="mr-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 font-bold">14</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">
                          Quarterly Team Meeting
                        </p>
                        <span className="text-xs text-slate-500">
                          April 14, 2025 - 10:00 AM
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-bold">22</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">
                          Performance Review
                        </p>
                        <span className="text-xs text-slate-500">
                          April 22, 2025 - 2:00 PM
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default EmployeeProfile;
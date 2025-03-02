/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Column {
  key: string;
  header: string;
  cellClassName?: (row: Record<string, any>) => string | string;
  render?: (row: Record<string, any>) => React.ReactNode;
}


export interface DataTableProps {
  columns: Column[];
  data: Record<string, any>[];
  dividers?: boolean;
  actionBool?: boolean;
  actionObj: { name: string; action: () => void }[];
}


export interface ActionObject {
  name: "view" | "edit" | "delete" | "approve" | "reject";  // Allowed action types
  action: (id?: number) => void;  // Handler function that receives optional id
  icon?: React.ReactNode;  // Optional custom icon
  tooltip?: string;  // Optional tooltip text
  disabled?: boolean | ((row: any) => boolean);  // Whether action is disabled (static or per-row)
  className?: string;  // Optional CSS class
  confirmRequired?: boolean;  // Whether action requires confirmation
  confirmMessage?: string;  // Optional confirmation message
}

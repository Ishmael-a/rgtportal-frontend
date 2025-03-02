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
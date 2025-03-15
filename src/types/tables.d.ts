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
  actionObj: { name: string; action: (id?: number, row?: T) => void  }[];
}


export interface ActionObject {
  name: "view" | "edit" | "delete" | "approve" | "reject";  
  action: (id?: number, row?: T) => void ;  
  icon?: React.ReactNode; 
  tooltip?: string;  
  disabled?: boolean | ((row: any) => boolean); 
  className?: string;  
  confirmRequired?: boolean; 
  confirmMessage?: string; 
}

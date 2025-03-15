/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Column {
  key: string;
  header: string;
  cellClassName?: (row: Record<string, any>) => string | string;
  render?: (row: Record<string, any>) => React.ReactNode;
}

export interface DataTableProps {
  columns: Column[];
  data: PtoLeave[] | undefined;
  dividers?: boolean;
  actionBool?: boolean;
  actionObj: { name: string; action: (id?: number) => void }[];
  showDelete?: boolean;
  onDelete?: (id: number) => Promise<void>;
  setShowDelete?: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleteLoading?:boolean
}

export interface ActionObject {
  name: "view" | "edit" | "delete" | "approve" | "reject";
  action: (id?: number) => void;
  icon?: React.ReactNode;
  tooltip?: string;
  disabled?: boolean | ((row: any) => boolean);
  className?: string;
  confirmRequired?: boolean;
  confirmMessage?: string;
}

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Search, Eye, Check } from "lucide-react";
import { useState } from "react";
import EmployeeManagementTable from "@/components/Hr/Employees/EmployeeManagementTable";


export const ManageEmployees = () => {
  const [visibleColumns, setVisibleColumns] = useState([
    'name', 'email', 'phoneNumber', 'birthday', 'startDate', 'department', 'onLeave', 'actions'
  ]);
  
  const [columnSearchTerm, setColumnSearchTerm] = useState("");
  const [searchByField, setSearchByField] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const allColumns = [
    { key: 'name', header: 'Employee Name' },
    { key: 'email', header: 'Email' },
    { key: 'phoneNumber', header: 'Phone Number' },
    { key: 'birthday', header: 'Birth Date' },
    { key: 'age', header: 'Age' },
    { key: 'city', header: 'City' },
    { key: 'homeAddress', header: 'Home Address' },
    { key: 'region', header: 'Region' },
    { key: 'country', header: 'Country' },
    { key: 'startDate', header: 'Start Date' },
    { key: 'endDate', header: 'End Date' },
    { key: 'seniority', header: 'Seniority' },
    { key: 'skills', header: 'Skills' },
    { key: 'ftpt', header: 'FT/PT' },
    { key: 'department', header: 'Department' },
    { key: 'agency', header: 'Agency' },
    { key: 'onLeave', header: 'On Leave' },
    { key: 'actions', header: 'Action' }
  ];
  
  const hideAllColumns = () => {
    setVisibleColumns(['name']);
  };
  
  const showAllColumns = () => {
    setVisibleColumns(allColumns.map(col => col.key));
  };
  
  // Function to toggle column visibility
  const toggleColumnVisibility = (columnKey: string) => {
    setVisibleColumns(prev => {
      if (prev.includes(columnKey)) {
        return prev.filter(key => key !== columnKey);
      } else {
        return [...prev, columnKey];
      }
    });
  };
  
  const toggleSearchByField = (fieldKey: string) => {
    setSearchByField(prev => {
      if (prev.includes(fieldKey)) {
        return prev.filter(key => key !== fieldKey);
      } else {
        return [...prev, fieldKey];
      }
    });
  };
  
  const resetSearchByField = () => {
    setSearchByField(allColumns.map(col => col.key));
  };
  
  const resetColumns = () => {
    const defaultColumns = ['name', 'email', 'phoneNumber', 'birthday', 'startDate', 'department', 'onLeave', 'actions'];
    setVisibleColumns(defaultColumns);
  };
  
  // Filter columns based on search term
  const filteredColumnOptions = allColumns
    .filter(col => col.header.toLowerCase().includes(columnSearchTerm.toLowerCase()));
  
  // Filter search by field options based on search term
  const filteredSearchByFieldOptions = allColumns
    .filter(col => col.header.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex flex-col gap-[15px] pt-[10px] h-full">
      <section className="h-[62px] flex justify-between w-full items-center py-1">
        <div className="flex flex-col h-full">
          <h1 className="text-xl font-medium text-gray-600">RGT Team</h1>
          <p className="text-sm text-gray-500">This is the data of all employees</p>
        </div>

        <div className="md:flex md:flex-row gap-4 items-center h-full flex-col">
          <div className="relative justify-between items-center sm:w-[100px] md:w-[301px] md:max-w-[301px] flex-grow">
            <Input
              type="text"
              placeholder="Search Employee"
              className="pl-5 py-5 rounded-xl bg-gray-50 border-none outline-none shadow-none h-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-4 top-4 h-6 w-6 text-gray-400" />
          </div>

          <div className="flex justify-end gap-4">

                        {/* Search Fields Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="bg-white text-sm text-gray-400 hover:bg-gray-100 rounded-xl py-4 h-full">
                  <Search className="w-12 h-12" size={14} />
                  Search Fields
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-0 rounded-xl bg-gradient-to-tr from-[#FFFBEB] via-[#F2FBFF] to-[#F7FEFF]" align="end">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <button 
                      className="text-sm font-medium text-gray-700 flex items-center"
                      onClick={resetSearchByField}
                    >
                      Reset
                    </button>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-4 top-[15px] h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search"
                      className="pl-10 bg-white shadow-none rounded-[16px] py-[15px] w-full h-[48px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="max-h-[300px] overflow-y-auto py-1">
                  {filteredSearchByFieldOptions.map((column) => (
                    <div key={column.key} className="flex items-center px-4 py-4 hover:bg-gray-100">
                      <button
                        className={`flex items-center justify-center w-5 h-5 mr-3 rounded ${
                          searchByField.includes(column.key) 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-200'
                        }`}
                        onClick={() => toggleSearchByField(column.key)}
                      >
                        {searchByField.includes(column.key) && <Check className="h-3 w-3" />}
                      </button>
                      <span className="text-sm">{column.header}</span>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>


            {/* Columns Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="bg-white text-sm text-gray-400 hover:bg-gray-100 rounded-xl py-4 h-full">
                  <Eye className="w-12 h-12" size={14} />
                  Columns
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-0 rounded-xl bg-gradient-to-tr from-[#FFFBEB] via-[#F2FBFF] to-[#F7FEFF]" align="end">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <button 
                      className="text-sm font-medium text-gray-700 flex items-center"
                      onClick={() => visibleColumns.length === allColumns.length ? hideAllColumns() : showAllColumns()}
                    >
                      {visibleColumns.length === allColumns.length ? "Hide All" : "Show All"}
                    </button>
                    <button 
                      className="text-sm text-gray-500"
                      onClick={resetColumns}
                    >
                      Reset
                    </button>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-4 top-[15px] h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search"
                      className="pl-10 bg-white shadow-none rounded-[16px] py-[15px] w-full h-[48px]"
                      value={columnSearchTerm}
                      onChange={(e) => setColumnSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="max-h-[300px] overflow-y-auto py-1">
                  {filteredColumnOptions.map((column) => (
                    <div key={column.key} className="flex items-center px-4 py-4 hover:bg-gray-100">
                      <button
                        className={`flex items-center justify-center w-5 h-5 mr-3 rounded ${
                          visibleColumns.includes(column.key) 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-200'
                        }`}
                        onClick={() => toggleColumnVisibility(column.key)}
                      >
                        {visibleColumns.includes(column.key) && <Check className="h-3 w-3" />}
                      </button>
                      <span className="text-sm">{column.header}</span>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

          </div>
        </div>
      </section>

      <div className="flex flex-col h-full">
        <EmployeeManagementTable 
          columnsToShow={visibleColumns} 
          searchByField={searchByField} 
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
};
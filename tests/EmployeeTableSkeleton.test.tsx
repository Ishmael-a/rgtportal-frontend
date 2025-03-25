
import { render, screen } from '@testing-library/react';
import EmployeeTableSkeleton from '../src/components/Hr/Dashboard/EmployeeTableSkeleton';
import React from 'react';
import '@testing-library/jest-dom';

describe('EmployeeTableSkeleton', () => {
  beforeEach(() => {
    render(<EmployeeTableSkeleton />);
  });

  it('renders the header section with search bar', () => {
    const headerSkeleton = screen.getByTestId('header-skeleton') as HTMLElement;
    const searchSkeleton = screen.getByTestId('search-skeleton') as HTMLElement;
    
    expect(headerSkeleton).toBeInTheDocument();
    expect(searchSkeleton).toBeInTheDocument();
  });

  it('renders filter section with all filter skeletons', () => {
    const filterSkeletons = screen.getAllByTestId('filter-skeleton') as HTMLElement[];
    expect(filterSkeletons).toHaveLength(4);
  });

  it('renders table header with correct number of columns', () => {
    const headerColumns = screen.getAllByTestId('header-column-skeleton') as HTMLElement[];
    expect(headerColumns).toHaveLength(6);
  });

  it('renders correct number of table rows', () => {
    const tableRows = screen.getAllByTestId('table-row-skeleton') as HTMLElement[];
    expect(tableRows).toHaveLength(5);
  });

  it('renders pagination skeleton', () => {
    const paginationSkeleton = screen.getByTestId('pagination-skeleton') as HTMLElement;
    expect(paginationSkeleton).toBeInTheDocument();
  });
});
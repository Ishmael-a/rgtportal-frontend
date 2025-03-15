import { useQuery } from '@tanstack/react-query';
import { projectService } from "../services/project.service";
import { useMemo } from 'react';
import { UseQueryOptions, QueryKey } from '@tanstack/react-query';
import { Project } from '@/types/project';

export const useAllProjects = (
  params?: { 
      includeAssignment?: boolean;
  },
  options?: {
      enabled?: boolean;
  }
) => {
  const stableParams = useMemo(() => params ?? {}, [params]); 

  return useQuery({
      queryKey: ['projects', stableParams],
      queryFn: () => projectService.getAllProjects(stableParams),
      ...options
  });
};

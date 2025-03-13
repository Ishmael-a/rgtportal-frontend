import { eventService } from "../services/event.service"
import { useMutation, useQuery, useQueryClient, UseQueryOptions, QueryKey} from '@tanstack/react-query';
import { CreateEventDto } from "@/types/events";
import { toast } from '@/hooks/use-toast';


export const useGetAllEvents = () => {

  return useQuery({
   queryKey: ['events'],
   queryFn: () => eventService.getAllEvents(),
  });
};




export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({  data }: { data: CreateEventDto }) =>
      eventService.createEvent(data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
        toast({
        title: "Success",
        description:  data.message || "Event created successfully",
        });
        },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    },
  });
};
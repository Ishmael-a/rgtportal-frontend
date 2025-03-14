import React, { useState } from 'react';
import BtnNext from "@/assets/icons/BtnNext"
import { Employee } from "@/types/employee";
import { Event } from "@/types/events";
import {EventType} from "@/constants";


interface ICalendarProps {
events: Event[];
}

const EventsCalendar = ({ events }: ICalendarProps) => {
const [currentDate, setCurrentDate] = useState(new Date());
const [view, setView] = useState<'date' | 'week' | 'month' | 'year'>('month');

// Color mapping for event types
const getEventColor = (type: EventType) => {
  const colors = {
    [EventType.OTHER]: '#48AABF',
    [EventType.TRAINING]: '#BF48A8',
    [EventType.HOLIDAY]: '#48BF84',
    [EventType.BIRTHDAY]: '#BF7B48',
    [EventType.ANNOUNCEMENT]: '#A0A0A0'
  };
  return colors[type] || '#7848BF';
};

// Separate events into categories
const categorizeEvents = () => {
  const specialEvents = events.filter(event => 
    [EventType.BIRTHDAY, EventType.HOLIDAY].includes(event.type)
  );
  
  const regularEvents = events.filter(event => 
    [ EventType.TRAINING, EventType.OTHER ].includes(event.type)
  );
  
  const announcements = events.filter(event => 
    event.type === EventType.ANNOUNCEMENT
  );
  
  return { specialEvents, regularEvents, announcements };
};

// Helper function to format time
const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Render event card
const renderEventCard = (event: Event, compact = false) => {
  const color = getEventColor(event.type);
  
  if (compact) {
    return (
      <div 
        key={event.id}
        className="px-1 py-0.5 text-xs flex-wrap"
        style={{ borderLeft: `4px solid ${color}` }}
      >
        <span className="font-medium">{event.title}</span>
        <span className="ml-1 text-gray-500 text-xs">
          {formatTime(event.startTime)}
        </span>
      </div>
    );
  }
  
  return (
    <div 
      key={event.id}
      className="p-2 flex flex-col text-xs bg-white rounded shadow-sm border-l-4 mb-1"
      style={{ borderLeftColor: color }}
    >
      <div className="font-medium">{event.title}</div>
      <div className="text-gray-500">
        {formatTime(event.startTime)} - {formatTime(event.endTime)}
      </div>
      {event.description && (
        <div className="text-gray-600 mt-1 text-xs">{event.description}</div>
      )}
      {event.location && (
        <div className="text-gray-500 text-xs mt-1">
          📍 {event.location}
        </div>
      )}
    </div>
  );
};

// Existing helper methods like getDaysInMonth, isCurrentMonth, etc. would remain similar

// Render methods would be updated to use the new Event type
const renderDayView = () => {
  const { regularEvents, specialEvents, announcements } = categorizeEvents();
  const hours = Array.from({length: 24}, (_, i) => i);
  
  return (
    <div className="h-full overflow-y-auto">
      {hours.map(hour => {
        const hourEvents = regularEvents.filter(event => 
          event.startTime.getHours() === hour
        );
        
        return (
          <div key={hour} className="flex border-b">
            <div className="w-16 p-2 text-xs text-right text-gray-500 border-r">
              {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
            </div>
            <div className="flex-1 min-h-12 p-1">
              {hourEvents.map(event => renderEventCard(event))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Similar updates would be made to other render methods

return (
  <div className="w-full border rounded-lg bg-white shadow p-4">
    {/* Similar structure to previous implementation */}
    {view === 'date' && renderDayView()}
    {/* Other view renderers would be similarly updated */}
  </div>
);
};

export default EventsCalendar;
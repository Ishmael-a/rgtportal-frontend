import { useState } from 'react';
import {IEvent, IAnnouncementItem} from "@/constants"
import BtnNext from "@/assets/icons/BtnNext"


interface ICalendarProps {
  events: IEvent[];
  announcements: IAnnouncementItem[];
}



const EventsCalendar = ({ events = [], announcements = [] }: ICalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'date' | 'week' | 'month' | 'year'>('month');
  
  // Format date to show appropriate header for each view
  const formatHeader = (date: Date) => {
    if (view === 'date') {
      return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    } else if (view === 'week') {
      const weekStart = new Date(date);
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
      weekStart.setDate(diff);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      
      if (weekStart.getMonth() === weekEnd.getMonth()) {
        return `${weekStart.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} (${weekStart.getDate()}-${weekEnd.getDate()})`;
      } else if (weekStart.getFullYear() === weekEnd.getFullYear()) {
        return `${weekStart.toLocaleDateString('en-US', { month: 'short' })} ${weekStart.getDate()} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
      } else {
        return `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
      }
    } else if (view === 'month') {
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    } else if (view === 'year') {
      return date.getFullYear().toString();
    }
    return '';
  };
  
  // Navigation functions for different views
  const navigatePrevious = () => {
    const newDate = new Date(currentDate);
    if (view === 'date') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else if (view === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (view === 'year') {
      newDate.setFullYear(newDate.getFullYear() - 1);
    }
    setCurrentDate(newDate);
  };
  
  const navigateNext = () => {
    const newDate = new Date(currentDate);
    if (view === 'date') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (view === 'year') {
      newDate.setFullYear(newDate.getFullYear() + 1);
    }
    setCurrentDate(newDate);
  };
  
  // Helper function to get all days in month for month view
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Last day of previous month
    const firstDay = new Date(year, month, 1);
    const startingDayOfWeek = firstDay.getDay() || 7; // Adjust for Sunday (0) to be 7
    
    // Days from previous month
    const prevMonthDays = [];
    for (let i = 0; i < startingDayOfWeek - 1; i++) {
      const day = new Date(year, month, 0 - i);
      prevMonthDays.unshift(day);
    }
    
    // Days of the current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const currentMonthDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      currentMonthDays.push(new Date(year, month, i));
    }
    
    // Days from next month to fill the last row
    const totalDaysShown = Math.ceil((prevMonthDays.length + daysInMonth) / 7) * 7;
    const nextMonthDays = [];
    let remainingDays = totalDaysShown - (prevMonthDays.length + daysInMonth);
    
    for (let i = 1; i <= remainingDays; i++) {
      nextMonthDays.push(new Date(year, month + 1, i));
    }
    
    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };
  
  // Helper function to get days in current week for week view
  const getDaysInWeek = () => {
    const week = [];
    const day = currentDate.getDay();
    const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(diff + i);
      week.push(date);
    }
    
    return week;
  };
  
  // Helper function to get hours for day view
  const getHoursInDay = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push(i);
    }
    return hours;
  };
  
  // Helper function to get months for year view
  const getMonthsInYear = () => {
    const months = [];
    for (let i = 0; i < 12; i++) {
      months.push(new Date(currentDate.getFullYear(), i, 1));
    }
    return months;
  };
  
  // Get events for a specific day
  const getItemsForDay = (day: Date, includeTime = false) => {
    const dayEvents = events.filter(event => {
      const sameDay = event.date.getDate() === day.getDate() &&
                      event.date.getMonth() === day.getMonth() &&
                      event.date.getFullYear() === day.getFullYear();
      
      return sameDay;
    });
    
    const dayAnnouncements = announcements.filter(announcement => {
      const sameDay = announcement.date.getDate() === day.getDate() &&
                      announcement.date.getMonth() === day.getMonth() &&
                      announcement.date.getFullYear() === day.getFullYear();
      
      return sameDay;
    });
    
    const allItems = [...dayEvents, ...dayAnnouncements]
      .sort((a, b) => {
        // Sort by start time if available
        const timeA = a.startTime || '00:00';
        const timeB = b.startTime || '00:00';
        return timeA.localeCompare(timeB);
      });
    
    return allItems;
  };
  
  // Get items for a specific hour
  const getItemsForHour = (day: Date, hour: number) => {
    const dayItems = getItemsForDay(day, true);
    return dayItems.filter(item => {
      if (!item.startTime) return false;
      
      const [hourStr] = item.startTime.split(':');
      const itemHour = parseInt(hourStr, 10);
      return itemHour === hour;
    });
  };
  
  // Function to get color for event type
  const getEventColor = (type: string) => {
    const colors = {
      'exam': '#7848BF',
      'meeting': '#48AABF',
      'evaluation': '#BF48A8',
      'holiday': '#48BF84',
      'birthday': '#BF7B48',
    };
    const typed = type as keyof typeof colors;
    return colors[typed] || '#7848BF';
  };
  
  // Check if a day is in the current month
  const isCurrentMonth = (day: Date) => {
    return day.getMonth() === currentDate.getMonth();
  };
  
  // Check if a day is today
  const isToday = (day: Date) => {
    const today = new Date();
    return day.getDate() === today.getDate() &&
           day.getMonth() === today.getMonth() &&
           day.getFullYear() === today.getFullYear();
  };
  
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const shortDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  // Function to format time (24h to 12h)
  const formatTime = (time: string) => {
    if (!time) return '';
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour, 10);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const hour12 = hourNum % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
  };
  
  // Function to display an event card
  const renderEventCard = (item: any, compact = false) => {
    const isEvent = 'type' in item;
    const color = isEvent ? (item.color || getEventColor(item.type)) : '#A0A0A0';
    const timeString = (item.startTime || item.endTime) ? 
      `${item.startTime ? formatTime(item.startTime) : ''}${(item.startTime && item.endTime) ? ' - ' : ''}${item.endTime ? formatTime(item.endTime) : ''}` : 
      '';
    
    if (compact) {
      return (
        <div 
          key={isEvent ? item.id : `announcement-${item.title}`}
          className="px-1 py-0.5 text-xs flex-wrap "
          style={{ borderLeft: `4px solid ${color}` }}
        >
          <span className="font-medium">{item.title}</span>
          {timeString && <span className="ml-1 text-gray-500 text-xs">{item.startTime?.split(':')[0]}:00</span>}
        </div>
      );
    }
    
    return (
      <div 
        key={isEvent ? item.id : `announcement-${item.title}`}
        className="p-2 flex flex-wrap text-xs bg-white rounded shadow-sm border-l-4 mb-1"
        style={{ borderLeftColor: color }}
      >
        <div className="font-medium">{item.title}</div>
        {timeString && (
          <div className="text-gray-500">{timeString}</div>
        )}
        {item.description && (
          <div className="text-gray-600 mt-1 text-xs">{item.description}</div>
        )}
      </div>
    );
  };
  
  // Function to handle view change
  const handleViewChange = (newView: 'date' | 'week' | 'month' | 'year') => {
    setView(newView);
  };
  
  // Render Day View
  const renderDayView = () => {
    const hours = getHoursInDay();
    
    return (
      <div className="h-full overflow-y-auto">
        {hours.map(hour => {
          const items = getItemsForHour(currentDate, hour);
          return (
            <div key={hour} className="flex border-b">
              <div className="w-16 p-2 text-xs text-right text-gray-500 border-r">
                {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
              </div>
              <div className="flex-1 min-h-12 p-1">
                {items.map(item => renderEventCard(item))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  
  // Render Week View
  const renderWeekView = () => {
    const weekDays = getDaysInWeek();
    const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]; // Display working hours, can be adjusted
    
    return (
      <div className="h-full overflow-y-auto">
        <div className="grid grid-cols-8 bg-purple-50">
          <div className="p-2 border-r"></div>
          {weekDays.map((day, index) => (
            <div 
              key={index} 
              className={`p-2 text-center text-sm border-r ${isToday(day) ? 'bg-purple-100 font-bold' : ''}`}
            >
              <div>{shortDays[index]}</div>
              <div className={`text-lg ${isToday(day) ? 'text-purple-700' : ''}`}>{day.getDate()}</div>
            </div>
          ))}
        </div>
        
        {hours.map(hour => (
          <div key={hour} className="grid grid-cols-8 border-b">
            <div className="p-2 text-xs text-right text-gray-500 border-r">
              {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
            </div>
            
            {weekDays.map((day, index) => {
              const items = getItemsForHour(day, hour);
              return (
                <div 
                  key={index} 
                  className={`p-1 border-r ${isToday(day) ? 'bg-purple-50' : ''}`}
                >
                  {items.map(item => renderEventCard(item, true))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };
  
  // Render Month View
  const renderMonthView = () => {
    const days = getDaysInMonth();
    
    return (
      <>
        <div className="grid grid-cols-7 py-4 bg-purple-50 rounded-t-md">
          {shortDays.map(day => (
            <div key={day} className="p-3 text-left font-semibold text-purple-700">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {days.map((day, index) => {
            const isDateInCurrentMonth = isCurrentMonth(day);
            const isDateToday = isToday(day);
            const dayItems = getItemsForDay(day);
            
            return (
              <div 
                key={index} 
                className={`min-h-24  font-bold ${!isDateInCurrentMonth ? 'bg-gray-50' : 'bg-white'}`}
              >
                <div className={`text-left px-3 py-1 ${!isDateInCurrentMonth ? 'text-gray-400' : ''} ${isDateToday ? 'bg-purple-100 text-purple-700 font-bold' : ''}`}>
                  {day.getDate()}
                </div>
                
                <div className="space-y-1 px-1">
                  {dayItems.slice(0, 2).map((item, idx) => renderEventCard(item, true))}
                  
                  {dayItems.length > 2 && (
                    <div className="text-xs text-gray-500 text-center">
                      +{dayItems.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  };
  
  // Render Year View
  const renderYearView = () => {
    const yearMonths = getMonthsInYear();
    
    return (
      <div className="grid grid-cols-3 gap-4 md:grid-cols-4">
        {yearMonths.map((month, index) => {
          const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
          const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
          const monthName = months[month.getMonth()];
          
          // Calculate events for this month
          const monthEvents = [...events, ...announcements].filter(event => 
            event.date.getMonth() === month.getMonth() && 
            event.date.getFullYear() === month.getFullYear()
          );
          
          return (
            <div key={index} className="border rounded shadow-sm">
              <div className="bg-purple-50 p-2 text-center font-medium border-b">
                {monthName}
              </div>
              <div className="grid grid-cols-7 gap-px bg-white p-1 text-xs">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                  <div key={i} className="text-center text-gray-500">
                    {d}
                  </div>
                ))}
                
                {Array(firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1).fill(null).map((_, i) => (
                  <div key={`empty-start-${i}`} className="text-center py-1"></div>
                ))}
                
                {Array(daysInMonth).fill(null).map((_, i) => {
                  const day = i + 1;
                  const date = new Date(month.getFullYear(), month.getMonth(), day);
                  const isDateToday = isToday(date);
                  const hasEvents = monthEvents.some(event => event.date.getDate() === day);
                  
                  return (
                    <div 
                      key={`day-${day}`} 
                      className={`text-center py-1 ${isDateToday ? 'bg-purple-100 rounded-full text-purple-700 font-bold' : ''}`}
                    >
                      {day}
                      {hasEvents && <div className="mx-auto w-1 h-1 bg-purple-500 rounded-full mt-1"></div>}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  
  return (
    <div className="w-full  border rounded-lg bg-white shadow p-4">
      {/* Calendar header with navigation and view options */}
      <div className="flex  items-center mb-4">
        <div className="flex items-center w-[40%] justify-between">
          <h2 className="text-2xl font-bold">{formatHeader(currentDate)}</h2>
          <div className="ml-2 text-gray-400 flex gap-4">
            <button onClick={navigatePrevious} className="p-1 rotate-180 hover:bg-gray-200">
              <BtnNext />
            </button>
            <button onClick={navigateNext} className="p-1 hover:bg-gray-200">
              <BtnNext />
            </button>
          </div>
        </div>
        
        {/* View selection tabs */}
        <div className="flex text-gray-400 border-b border-gray-300 mx-auto   items-center justify-center overflow-hidden">
          <button 
            className={`px-4 py-1 ${view === 'date' ? 'bg-gray-100 border-b-4 border-gray-400' : ''}`}
            onClick={() => handleViewChange('date')}
          >
            Date
          </button>
          <button 
            className={`px-4 py-1 ${view === 'week' ? 'bg-gray-100 border-b-4 border-gray-400' : ''}`}
            onClick={() => handleViewChange('week')}
          >
            Week
          </button>
          <button 
            className={`px-4 py-1 ${view === 'month' ? 'bg-gray-100 border-b-4 border-gray-400' : ''}`}
            onClick={() => handleViewChange('month')}
          >
            Month
          </button>
          <button 
            className={`px-4 py-1 ${view === 'year' ? 'bg-gray-100 border-b-4 border-gray-400' : ''}`}
            onClick={() => handleViewChange('year')}
          >
            Year
          </button>
        </div>
      </div>
      
      {/* Render appropriate view */}
      {view === 'date' && renderDayView()}
      {view === 'week' && renderWeekView()}
      {view === 'month' && renderMonthView()}
      {view === 'year' && renderYearView()}
    </div>
  );
};

export default EventsCalendar;
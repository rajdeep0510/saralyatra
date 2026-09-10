"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, X, Check, Sparkles } from "lucide-react";

interface CustomLargeCalendarProps {
  selectedDate: string; // YYYY-MM-DD
  durationDays: number;
  onSelectDate: (dateStr: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

// Local date helpers to eliminate UTC timezone shift bugs
function formatLocalDate(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseLocalDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const parts = dateStr.split("-");
  if (parts.length !== 3) return null;
  const [year, month, day] = parts.map(Number);
  if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
  return new Date(year, month - 1, day, 0, 0, 0, 0);
}

export default function CustomLargeCalendar({
  selectedDate,
  durationDays,
  onSelectDate,
  isOpen,
  onClose
}: CustomLargeCalendarProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Initialize view month based on selectedDate or current date
  const [viewDate, setViewDate] = useState<Date>(() => {
    const parsed = parseLocalDate(selectedDate);
    return parsed || new Date();
  });

  // Sync view date if selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      const parsed = parseLocalDate(selectedDate);
      if (parsed) {
        setViewDate(parsed);
      }
    }
  }, [selectedDate]);

  // Click outside listener
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const selectedStartDate = useMemo(() => {
    return parseLocalDate(selectedDate);
  }, [selectedDate]);

  const selectedEndDate = useMemo(() => {
    if (!selectedStartDate) return null;
    const d = new Date(selectedStartDate);
    d.setDate(selectedStartDate.getDate() + (durationDays - 1));
    return d;
  }, [selectedStartDate, durationDays]);

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();

  const FULL_MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthName = `${FULL_MONTH_NAMES[currentMonth]} ${currentYear}`;

  const handlePrevMonth = () => {
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // Generate calendar grid days
  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday
    const daysInMonth = lastDayOfMonth.getDate();

    const days: {
      date: Date;
      dateStr: string;
      dayNumber: number;
      isCurrentMonth: boolean;
      isPast: boolean;
      isToday: boolean;
      isStart: boolean;
      isEnd: boolean;
      isInRange: boolean;
    }[] = [];

    // Previous month filler days
    const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const d = new Date(currentYear, currentMonth - 1, prevMonthLastDay - i, 0, 0, 0, 0);
      const dateStr = formatLocalDate(d);
      days.push({
        date: d,
        dateStr,
        dayNumber: d.getDate(),
        isCurrentMonth: false,
        isPast: d < today,
        isToday: d.getTime() === today.getTime(),
        isStart: selectedStartDate ? d.getTime() === selectedStartDate.getTime() : false,
        isEnd: selectedEndDate ? d.getTime() === selectedEndDate.getTime() : false,
        isInRange: selectedStartDate && selectedEndDate ? d >= selectedStartDate && d <= selectedEndDate : false
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(currentYear, currentMonth, day, 0, 0, 0, 0);
      const dateStr = formatLocalDate(d);
      days.push({
        date: d,
        dateStr,
        dayNumber: day,
        isCurrentMonth: true,
        isPast: d < today,
        isToday: d.getTime() === today.getTime(),
        isStart: selectedStartDate ? d.getTime() === selectedStartDate.getTime() : false,
        isEnd: selectedEndDate ? d.getTime() === selectedEndDate.getTime() : false,
        isInRange: selectedStartDate && selectedEndDate ? d >= selectedStartDate && d <= selectedEndDate : false
      });
    }

    // Next month filler days to complete 35 or 42 grid cells
    const remainingCells = (7 - (days.length % 7)) % 7;
    for (let day = 1; day <= remainingCells; day++) {
      const d = new Date(currentYear, currentMonth + 1, day, 0, 0, 0, 0);
      const dateStr = formatLocalDate(d);
      days.push({
        date: d,
        dateStr,
        dayNumber: day,
        isCurrentMonth: false,
        isPast: d < today,
        isToday: d.getTime() === today.getTime(),
        isStart: selectedStartDate ? d.getTime() === selectedStartDate.getTime() : false,
        isEnd: selectedEndDate ? d.getTime() === selectedEndDate.getTime() : false,
        isInRange: selectedStartDate && selectedEndDate ? d >= selectedStartDate && d <= selectedEndDate : false
      });
    }

    return days;
  }, [currentYear, currentMonth, today, selectedStartDate, selectedEndDate]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div
        ref={containerRef}
        className="w-full max-w-lg rounded-3xl bg-white border-2 border-stone-300 shadow-[0_25px_50px_rgba(0,0,0,0.25)] p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-200"
      >
        {/* Header with Close */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-terracotta-50 text-terracotta-700 border border-terracotta-200 flex items-center justify-center">
              <CalendarIcon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif font-black text-lg text-stone-900 leading-tight">
                Select Trip Start Date
              </h3>
              <p className="text-xs text-stone-500 font-medium">
                Highlighted span shows your {durationDays}-day schedule
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors cursor-pointer"
            title="Close Calendar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between px-1">
          <h4 className="font-serif font-bold text-base text-stone-900 tracking-wide">
            {monthName}
          </h4>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="h-9 w-9 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-200 flex items-center justify-center text-stone-800 transition-all cursor-pointer hover:scale-105 active:scale-95"
              title="Previous Month"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              className="h-9 w-9 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-200 flex items-center justify-center text-stone-800 transition-all cursor-pointer hover:scale-105 active:scale-95"
              title="Next Month"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-xs font-black text-stone-400 uppercase py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Large Interactive Calendar Days Grid */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {calendarDays.map((d, index) => {
            const isSelectable = !d.isPast && d.isCurrentMonth;
            
            let cellStyle = "bg-white text-stone-700 border-stone-200 hover:border-terracotta-400 hover:bg-stone-50";

            if (d.isPast) {
              cellStyle = "bg-stone-50/50 text-stone-300 border-transparent cursor-not-allowed";
            } else if (!d.isCurrentMonth) {
              cellStyle = "bg-transparent text-stone-300 border-transparent cursor-not-allowed opacity-40";
            } else if (d.isStart) {
              cellStyle = "bg-terracotta-600 text-white border-terracotta-700 shadow-md font-black ring-2 ring-terracotta-300 scale-105 z-10";
            } else if (d.isInRange) {
              cellStyle = "bg-terracotta-50 text-terracotta-900 border-terracotta-200 font-bold";
            }

            return (
              <button
                key={index}
                type="button"
                disabled={!isSelectable}
                onClick={() => {
                  onSelectDate(d.dateStr);
                  onClose();
                }}
                className={`h-11 sm:h-13 w-full rounded-2xl border flex flex-col items-center justify-center relative transition-all cursor-pointer text-sm sm:text-base font-bold ${cellStyle}`}
              >
                <span>{d.dayNumber}</span>
                {d.isToday && !d.isStart && (
                  <span className="absolute bottom-1.5 h-1.5 w-1.5 rounded-full bg-terracotta-600" />
                )}
                {d.isStart && (
                  <span className="text-[9px] font-black uppercase tracking-tighter opacity-90 leading-none">
                    Start
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer info & Selected Range badge */}
        <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-stone-600 font-semibold">
            <Sparkles className="h-4 w-4 text-terracotta-600" />
            <span>Trip: <strong>{selectedDate}</strong> ({durationDays} {durationDays === 1 ? "Day" : "Days"})</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold transition-all cursor-pointer text-xs"
          >
            Apply Date
          </button>
        </div>
      </div>
    </div>
  );
}

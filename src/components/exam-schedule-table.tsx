"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { EXAM_DATES, type ExamDate } from '@/lib/constants';
import { Calendar, Clock, CheckCircle, AlertCircle, Circle } from 'lucide-react';

interface ExamStatus {
  exam: ExamDate;
  status: 'completed' | 'today' | 'upcoming';
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    total: number;
  };
}

const ExamScheduleTable: React.FC = () => {
  const calculateExamStatuses = useCallback((): ExamStatus[] => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    return EXAM_DATES.map(exam => {
      const examDate = new Date(exam.date.getFullYear(), exam.date.getMonth(), exam.date.getDate());
      const difference = +exam.date - +now;
      
      let status: 'completed' | 'today' | 'upcoming';
      if (examDate < today) {
        status = 'completed';
      } else if (examDate.getTime() === today.getTime()) {
        status = 'today';
      } else {
        status = 'upcoming';
      }

      const timeLeft = difference > 0 ? {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        total: difference,
      } : { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };

      return { exam, status, timeLeft };
    });
  }, []);

  const [examStatuses, setExamStatuses] = useState<ExamStatus[]>(calculateExamStatuses());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setExamStatuses(calculateExamStatuses());

    const timer = setInterval(() => {
      setExamStatuses(calculateExamStatuses());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateExamStatuses]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'today':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'upcoming':
        return <Circle className="w-5 h-5 text-blue-500" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Đã hoàn thành';
      case 'today':
        return 'Hôm nay';
      case 'upcoming':
        return 'Sắp tới';
      default:
        return 'Không xác định';
    }
  };

  const getRowClassName = (status: string) => {
    const baseClasses = "transition-all duration-300 hover:scale-[1.02] hover:shadow-md";
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-green-50 border-green-200 hover:bg-green-100 hover:border-green-300`;
      case 'today':
        return `${baseClasses} bg-orange-50 border-orange-200 hover:bg-orange-100 hover:border-orange-300`;
      case 'upcoming':
        return `${baseClasses} bg-card border-border/50 hover:bg-card/90 hover:border-accent/30`;
      default:
        return `${baseClasses} bg-gray-50 border-gray-200 hover:bg-gray-100`;
    }
  };

  const formatCountdown = (timeLeft: ExamStatus['timeLeft']) => {
    if (timeLeft.total <= 0) return '';
    
    if (timeLeft.days > 0) {
      return `${timeLeft.days}d ${timeLeft.hours}h`;
    } else if (timeLeft.hours > 0) {
      return `${timeLeft.hours}h ${timeLeft.minutes}m`;
    } else {
      return `${timeLeft.minutes}m ${timeLeft.seconds}s`;
    }
  };

  if (!isClient) {
    return (
      <div className="w-full max-w-4xl mx-auto my-8 p-6 rounded-xl bg-card/50 shadow-xl backdrop-blur-md">
        <div className="flex items-center space-x-2 mb-6">
          <Calendar className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-primary">Lịch thi THPT Quốc Gia 2025</h2>
        </div>
        <div className="animate-pulse space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-16 bg-muted/50 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-6 rounded-xl bg-card/50 shadow-xl backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:bg-card/60">
      <div className="flex items-center space-x-2 mb-6">
        <Calendar className="w-6 h-6 text-primary transition-all duration-300 hover:text-accent hover:scale-110" />
        <h2 className="text-2xl font-bold text-primary transition-colors duration-300 hover:text-accent">
          Lịch thi THPT Quốc Gia 2025
        </h2>
      </div>
      
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left p-4 font-semibold text-foreground">Ngày</th>
              <th className="text-left p-4 font-semibold text-foreground">Thời gian</th>
              <th className="text-left p-4 font-semibold text-foreground">Môn thi</th>
              <th className="text-left p-4 font-semibold text-foreground">Trạng thái</th>
              <th className="text-left p-4 font-semibold text-foreground">Đếm ngược</th>
            </tr>
          </thead>
          <tbody>
            {examStatuses.map((examStatus, index) => (
              <tr 
                key={examStatus.exam.id} 
                className={`border rounded-lg ${getRowClassName(examStatus.status)}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <td className="p-4">
                  <div className="font-medium text-foreground">
                    {examStatus.exam.date.toLocaleDateString('vi-VN', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>
                      {examStatus.exam.date.toLocaleTimeString('vi-VN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <div className="font-semibold text-foreground">{examStatus.exam.title}</div>
                    <div className="text-sm text-muted-foreground">{examStatus.exam.description}</div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(examStatus.status)}
                    <span className="text-sm font-medium">{getStatusText(examStatus.status)}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-mono text-sm font-medium text-accent">
                    {formatCountdown(examStatus.timeLeft)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {examStatuses.map((examStatus, index) => (
          <div 
            key={examStatus.exam.id}
            className={`p-4 rounded-lg border ${getRowClassName(examStatus.status)}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold text-foreground">{examStatus.exam.title}</div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(examStatus.status)}
                <span className="text-sm font-medium">{getStatusText(examStatus.status)}</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground mb-2">{examStatus.exam.description}</div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>
                  {examStatus.exam.date.toLocaleDateString('vi-VN', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
                <Clock className="w-4 h-4 ml-2" />
                <span>
                  {examStatus.exam.date.toLocaleTimeString('vi-VN', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
              <div className="font-mono font-medium text-accent">
                {formatCountdown(examStatus.timeLeft)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamScheduleTable;

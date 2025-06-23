"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { EXAM_DATES, type ExamDate } from '@/lib/constants';
import CountdownDisplayItem from './countdown-display-item';
import { Clock, Calendar } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

interface CountdownState {
  timeLeft: TimeLeft;
  currentExam: ExamDate | null;
  allExamsCompleted: boolean;
}

const CountdownTimer: React.FC = () => {
  const getNextExam = useCallback((): ExamDate | null => {
    const now = new Date();
    const upcomingExams = EXAM_DATES.filter(exam => exam.date > now);
    return upcomingExams.length > 0 ? upcomingExams[0] : null;
  }, []);

  const calculateCountdown = useCallback((): CountdownState => {
    const currentExam = getNextExam();

    if (!currentExam) {
      return {
        timeLeft: { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 },
        currentExam: null,
        allExamsCompleted: true
      };
    }

    const difference = +currentExam.date - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        total: difference,
      };
    }

    return {
      timeLeft,
      currentExam,
      allExamsCompleted: false
    };
  }, [getNextExam]);

  const [countdownState, setCountdownState] = useState<CountdownState>(calculateCountdown());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setCountdownState(calculateCountdown());

    const timer = setInterval(() => {
      setCountdownState(calculateCountdown());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateCountdown]);

  if (!isClient) {
    return (
      <div className="flex flex-col items-center space-y-6 my-8 p-6 rounded-xl bg-card/50 shadow-xl backdrop-blur-md">
        <div className="flex items-center space-x-2 text-2xl font-semibold text-primary">
          <Clock className="w-8 h-8" />
          <span>Đếm ngược đến ngày thi THPT Quốc Gia</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <CountdownDisplayItem value={0} unit="Ngày" />
          <CountdownDisplayItem value={0} unit="Giờ" />
          <CountdownDisplayItem value={0} unit="Phút" />
          <CountdownDisplayItem value={0} unit="Giây" />
        </div>
      </div>
    );
  }

  if (countdownState.allExamsCompleted) {
    return (
      <div className="text-center my-8 p-6 rounded-xl bg-card/50 shadow-xl backdrop-blur-md">
        <h2 className="text-3xl font-bold text-primary">Tất cả kỳ thi đã hoàn thành!</h2>
        <p className="text-lg text-muted-foreground mt-2">Chúc mừng các sĩ tử đã hoàn thành kỳ thi THPT Quốc Gia 2025!</p>
      </div>
    );
  }

  const { timeLeft, currentExam } = countdownState;

  return (
    <div className="flex flex-col items-center space-y-6 my-8 p-6 rounded-xl bg-card/50 shadow-xl backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:bg-card/60" aria-live="polite" aria-atomic="true">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2 text-xl sm:text-2xl font-semibold text-primary">
          <Clock className="w-7 h-7 sm:w-8 sm:h-8" />
          <span>Đếm ngược đến</span>
        </div>
        {currentExam && (
          <>
            <h3 className="text-lg sm:text-xl font-bold text-accent">{currentExam.title}</h3>
            <p className="text-sm sm:text-base text-muted-foreground">{currentExam.description}</p>
            <div className="flex items-center justify-center space-x-1 text-xs sm:text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{currentExam.date.toLocaleDateString('vi-VN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
          </>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <CountdownDisplayItem value={timeLeft.days} unit="Ngày" />
        <CountdownDisplayItem value={timeLeft.hours} unit="Giờ" />
        <CountdownDisplayItem value={timeLeft.minutes} unit="Phút" />
        <CountdownDisplayItem value={timeLeft.seconds} unit="Giây" />
      </div>
    </div>
  );
};

export default CountdownTimer;

"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { TARGET_EXAM_DATE } from '@/lib/constants';
import CountdownDisplayItem from './countdown-display-item';
import { Clock } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

const CountdownTimer: React.FC = () => {
  const calculateTimeLeft = useCallback((): TimeLeft => {
    const difference = +TARGET_EXAM_DATE - +new Date();
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
    return timeLeft;
  }, []);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Initial calculation after mount
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  if (!isClient) {
    // Render placeholder or null on server to avoid hydration mismatch
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

  if (timeLeft.total <= 0) {
    return (
      <div className="text-center my-8 p-6 rounded-xl bg-card/50 shadow-xl backdrop-blur-md">
        <h2 className="text-3xl font-bold text-primary">Kỳ thi đã diễn ra!</h2>
        <p className="text-lg text-muted-foreground mt-2">Chúc các sĩ tử thi tốt và đạt kết quả cao!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-6 my-8 p-6 rounded-xl bg-card/50 shadow-xl backdrop-blur-md" aria-live="polite" aria-atomic="true">
       <div className="flex items-center space-x-2 text-xl sm:text-2xl font-semibold text-primary">
        <Clock className="w-7 h-7 sm:w-8 sm:h-8" />
        <span>Đếm ngược đến ngày thi THPT Quốc Gia 2025</span>
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

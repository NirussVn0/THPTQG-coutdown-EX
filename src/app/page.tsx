import CountdownTimer from '@/components/countdown-timer';
import MotivationalMessage from '@/components/motivational-message';
import UniversityPredictor from '@/components/university-predictor';
import AnimatedCursor from '@/components/animated-cursor';
import ExamScheduleTable from '@/components/exam-schedule-table';
import ThemeToggle from '@/components/theme-toggle';
import { GraduationCap } from 'lucide-react';

export default function Home() {
  return (
    <>
      <AnimatedCursor />
      <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 selection:bg-accent selection:text-accent-foreground">
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary rounded-full mb-4 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-110 hover:bg-accent hover:rotate-12">
            <GraduationCap className="w-10 h-10 sm:w-12 sm:h-12 text-primary-foreground transition-colors duration-300 hover:text-accent-foreground" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary tracking-tight transition-all duration-300 hover:text-accent hover:scale-105">
            Graduation Exam Countdown
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto transition-colors duration-300 hover:text-foreground/80">
            Góp thêm tinh thần cho các sĩ tử. <br />
            Đếm ngược không phải để lo sợ, mà để chuẩn bị bung lụa đúng lúc
          </p>
        </div>

        <CountdownTimer />
        <ExamScheduleTable />
        <MotivationalMessage />
        <UniversityPredictor />

        <footer className="mt-12 sm:mt-16 text-center text-sm text-muted-foreground transition-all duration-300 hover:text-foreground/70">
          <p className="transition-colors duration-300 hover:text-accent"> &copy; {new Date().getFullYear()} SabiCoder Studio - Author: Niruss, Tester: Beteng </p>
          <p className="mt-1 transition-colors duration-300 hover:text-foreground/80">
            Một sản phẩm được tạo ra với <span className="transition-transform duration-300 hover:scale-125 inline-block">❤️</span> và <span className="transition-transform duration-300 hover:scale-125 inline-block">☕</span>. <br />
            Chúc các sĩ tử ôn thi hiệu quả
          </p>
        </footer>
      </main>
    </>
  );
}

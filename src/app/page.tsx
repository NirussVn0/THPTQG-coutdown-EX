import CountdownTimer from '@/components/countdown-timer';
import MotivationalMessage from '@/components/motivational-message';
import UniversityPredictor from '@/components/university-predictor';
import AnimatedCursor from '@/components/animated-cursor'; // Will be client component
import { GraduationCap } from 'lucide-react';

export default function Home() {
  return (
    <>
      <AnimatedCursor />
      <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 selection:bg-accent selection:text-accent-foreground">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary rounded-full mb-4 shadow-lg">
             <GraduationCap className="w-10 h-10 sm:w-12 sm:h-12 text-primary-foreground" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary tracking-tight">
            Graduation Exam Countdown
          </h1>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            Góp thêm tinh thần cho các sĩ tử. <br />
            Đếm ngược không phải để lo sợ, mà để chuẩn bị bung lụa đúng lúc
          </p>
        </div>

        <CountdownTimer />
        <MotivationalMessage />
        <UniversityPredictor />

        <footer className="mt-12 sm:mt-16 text-center text-sm text-muted-foreground">
          <p> &copy; {new Date().getFullYear()} SabiCoder Studio - Author Niruss. </p>
          <p className="mt-1">
            Một sản phẩm được tạo ra với ❤️ và ☕. <br />
            Chúc các sĩ tử ôn thi hiệu quả
          </p>
        </footer>
      </main>
    </>
  );
}

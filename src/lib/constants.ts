export interface ExamDate {
  id: string;
  date: Date;
  title: string;
  description: string;
  type: 'preparation' | 'exam' | 'reserve';
}

export const EXAM_DATES: ExamDate[] = [
  {
    id: 'preparation',
    date: new Date('2025-06-25T08:00:00'),
    title: 'Ngày chuẩn bị và đăng ký',
    description: 'Chuẩn bị tâm lý và hoàn tất thủ tục',
    type: 'preparation'
  },
  {
    id: 'day1-morning',
    date: new Date('2025-06-26T07:30:00'),
    title: 'Ngữ văn (Buổi sáng)',
    description: 'Môn Ngữ văn - 120 phút',
    type: 'exam'
  },
  {
    id: 'day1-afternoon',
    date: new Date('2025-06-26T14:30:00'),
    title: 'Toán học (Buổi chiều)',
    description: 'Môn Toán học - 90 phút',
    type: 'exam'
  },
  {
    id: 'day2-morning',
    date: new Date('2025-06-27T07:30:00'),
    title: 'Khoa học Tự nhiên/Xã hội (Buổi sáng)',
    description: 'Tổ hợp môn chuyên ngành - 50 phút',
    type: 'exam'
  },
  {
    id: 'day2-afternoon',
    date: new Date('2025-06-27T14:30:00'),
    title: 'Ngoại ngữ (Buổi chiều)',
    description: 'Môn Ngoại ngữ - 60 phút',
    type: 'exam'
  },
  {
    id: 'reserve',
    date: new Date('2025-06-28T08:00:00'),
    title: 'Ngày dự phòng',
    description: 'Dành cho các trường hợp khẩn cấp',
    type: 'reserve'
  }
];

export const TARGET_EXAM_DATE = new Date('2025-06-26T00:00:00');

export interface QuoteCategory {
  id: string;
  name: string;
  weight: number;
}

export const QUOTE_CATEGORIES: QuoteCategory[] = [
  { id: 'vietnamese-proverbs', name: 'Tục ngữ Việt Nam', weight: 0.3 },
  { id: 'vietnamese-scholars', name: 'Danh nhân Việt Nam', weight: 0.25 },
  { id: 'international-figures', name: 'Danh nhân thế giới', weight: 0.25 },
  { id: 'exam-encouragement', name: 'Động viên thi cử', weight: 0.2 }
];

export interface MotivationalQuote {
  text: string;
  category: string;
  author?: string;
}

export const MOTIVATIONAL_QUOTES: MotivationalQuote[] = [
  {
    text: "Học, học nữa, học mãi - để trở thành con người xứng đáng với thời đại.",
    category: 'vietnamese-scholars',
    author: 'Hồ Chí Minh'
  },
  {
    text: "Muốn đi nhanh thì đi một mình, muốn đi xa thì đi cùng nhau.",
    category: 'vietnamese-proverbs'
  },
  {
    text: "Có chí thì nên, có gan thì làm.",
    category: 'vietnamese-proverbs'
  },
  {
    text: "Giáo dục là vũ khí mạnh nhất mà bạn có thể sử dụng để thay đổi thế giới.",
    category: 'international-figures',
    author: 'Nelson Mandela'
  },
  {
    text: "Trí tuệ không phải là sản phẩm của việc học, mà là nỗ lực suốt đời để có được nó.",
    category: 'international-figures',
    author: 'Albert Einstein'
  },
  {
    text: "Đường đi khó không phải vì núi cao mà vì lòng người ngại khó.",
    category: 'vietnamese-proverbs'
  },
  {
    text: "Thành công không phải là chìa khóa của hạnh phúc. Hạnh phúc là chìa khóa của thành công.",
    category: 'international-figures',
    author: 'Albert Schweitzer'
  },
  {
    text: "Hãy tin vào bản thân, ngay cả khi không ai khác làm vậy. Bạn có thể làm được!",
    category: 'exam-encouragement'
  },
  {
    text: "Mỗi ngày là một cơ hội mới để học hỏi và trưởng thành. Đừng bỏ lỡ!",
    category: 'exam-encouragement'
  },
  {
    text: "Khó khăn không tồn tại mãi mãi, chỉ có những người kiên trì mới tồn tại.",
    category: 'exam-encouragement'
  },
  {
    text: "Ước mơ không có ngày hết hạn. Hãy tiếp tục theo đuổi!",
    category: 'exam-encouragement'
  },
  {
    text: "Nước chảy đá mòn, có công mài sắt có ngày nên kim.",
    category: 'vietnamese-proverbs'
  },
  {
    text: "Học thầy không tày học bạn.",
    category: 'vietnamese-proverbs'
  },
  {
    text: "Cần cù bù thông minh.",
    category: 'vietnamese-proverbs'
  },
  {
    text: "Thất bại là mẹ của thành công.",
    category: 'vietnamese-proverbs'
  },
  {
    text: "Giọt nước nhỏ lâu ngày cũng làm thủng tảng đá.",
    category: 'vietnamese-proverbs'
  },
  {
    text: "Học một biết mười.",
    category: 'vietnamese-proverbs'
  },
  {
    text: "Đi một ngày đàng học một sàng khôn.",
    category: 'vietnamese-proverbs'
  },
  {
    text: "Tài năng mà không có ý chí thì chẳng khác gì cây không có rễ.",
    category: 'vietnamese-scholars',
    author: 'Phan Bội Châu'
  },
  {
    text: "Học để phụng sự Tổ quốc, phụng sự nhân dân.",
    category: 'vietnamese-scholars',
    author: 'Hồ Chí Minh'
  },
  {
    text: "Giáo dục là cách mạnh mẽ nhất để thay đổi thế giới.",
    category: 'vietnamese-scholars',
    author: 'Nguyễn Ái Quốc'
  },
  {
    text: "Tri thức là sức mạnh.",
    category: 'international-figures',
    author: 'Francis Bacon'
  },
  {
    text: "Tôi chưa bao giờ gặp một người thông minh mà không đọc sách.",
    category: 'international-figures',
    author: 'Malcolm X'
  },
  {
    text: "Học hỏi không bao giờ làm cạn kiệt tâm trí.",
    category: 'international-figures',
    author: 'Leonardo da Vinci'
  },
  {
    text: "Giáo dục là điều tốt nhất mà cha mẹ có thể để lại cho con cái.",
    category: 'international-figures',
    author: 'Khổng Tử'
  },
  {
    text: "Hãy sống như thể bạn sẽ chết ngày mai. Hãy học như thể bạn sẽ sống mãi mãi.",
    category: 'international-figures',
    author: 'Mahatma Gandhi'
  },
  {
    text: "Đầu tư vào tri thức luôn mang lại lợi nhuận tốt nhất.",
    category: 'international-figures',
    author: 'Benjamin Franklin'
  },
  {
    text: "Tương lai thuộc về những ai tin vào vẻ đẹp của ước mơ.",
    category: 'international-figures',
    author: 'Eleanor Roosevelt'
  },
  {
    text: "Đừng để áp lực thi cử làm bạn quên đi niềm vui học tập.",
    category: 'exam-encouragement'
  },
  {
    text: "Mỗi câu hỏi khó là một cơ hội để bạn chứng minh khả năng của mình.",
    category: 'exam-encouragement'
  },
  {
    text: "Hãy nhớ rằng: bạn đã chuẩn bị rất kỹ lưỡng cho kỳ thi này.",
    category: 'exam-encouragement'
  },
  {
    text: "Thở sâu, tự tin và làm hết sức mình. Đó là tất cả những gì bạn cần.",
    category: 'exam-encouragement'
  },
  {
    text: "Kỳ thi chỉ là một cột mốc, không phải đích cuối của cuộc đời.",
    category: 'exam-encouragement'
  },
  {
    text: "Bạn mạnh mẽ hơn những gì bạn nghĩ, thông minh hơn những gì bạn cảm nhận.",
    category: 'exam-encouragement'
  },
  {
    text: "Hãy tập trung vào những gì bạn biết, đừng lo lắng về những gì bạn không biết.",
    category: 'exam-encouragement'
  },
  {
    text: "Mỗi phút ôn tập đều có giá trị. Đừng đánh giá thấp nỗ lực của bản thân.",
    category: 'exam-encouragement'
  },
  {
    text: "Thành công không đến từ việc không bao giờ thất bại, mà từ việc không bao giờ bỏ cuộc.",
    category: 'exam-encouragement'
  },
  {
    text: "Hãy biến căng thẳng thành động lực, biến áp lực thành sức mạnh.",
    category: 'exam-encouragement'
  }
];

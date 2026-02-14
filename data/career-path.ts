export interface CareerStage {
  id: number;
  name: string;
  emoji: string;
  ageRange: string;
  description: string;
  details: string;
  tips: string[];
}

export const careerStages: CareerStage[] = [
  {
    id: 1,
    name: "Middle School Explorer",
    emoji: "🎒",
    ageRange: "11-14",
    description: "Start building your business mindset and curiosity!",
    details: "This is where your business journey begins! Middle school is the perfect time to start learning about how businesses work, trying small projects, and developing skills like communication, problem-solving, and teamwork. Many successful entrepreneurs say their curiosity started at this age.",
    tips: [
      "Start a small business like a lemonade stand, car wash, or online shop",
      "Read books about business and entrepreneurship for young people",
      "Join clubs like DECA, FBLA, or student government",
      "Learn basic money management — save, budget, and track your spending",
      "Watch shows like Shark Tank to learn about pitching business ideas",
    ],
  },
  {
    id: 2,
    name: "High School Builder",
    emoji: "🏫",
    ageRange: "14-18",
    description: "Develop real skills and gain your first business experiences.",
    details: "High school is the time to get serious about building skills. Take business, economics, and accounting classes. Get involved in business competitions and entrepreneurship programs. Many tech entrepreneurs started coding in high school, and some even launched companies before graduating!",
    tips: [
      "Take AP Economics, Business, and Accounting courses",
      "Participate in DECA, FBLA, or Junior Achievement competitions",
      "Start a real side business or freelance service",
      "Get a part-time job to understand how businesses operate from the inside",
      "Learn to code, design, or develop other marketable skills",
    ],
  },
  {
    id: 3,
    name: "College Learner",
    emoji: "🎓",
    ageRange: "18-22",
    description: "Deep dive into business knowledge with a degree program.",
    details: "College offers structured learning in business fundamentals — accounting, finance, marketing, management, and economics. Many universities have excellent business programs and entrepreneurship centers. This is also a great time for internships, which give you real-world experience and connections.",
    tips: [
      "Major in Business, Finance, Marketing, Economics, or Entrepreneurship",
      "Complete summer internships at companies you admire",
      "Join business fraternities, investment clubs, or startup incubators",
      "Network with professors, alumni, and industry professionals",
      "Consider studying abroad to understand global business",
    ],
  },
  {
    id: 4,
    name: "MBA / Graduate School",
    emoji: "📖",
    ageRange: "22-25",
    description: "Advanced business education and powerful professional networks.",
    details: "An MBA (Master of Business Administration) provides advanced knowledge in strategy, leadership, and specialized business areas. Top MBA programs (Harvard, Stanford, Wharton) offer incredible networking, recruiting opportunities, and credibility. Not everyone needs an MBA, but it can accelerate your career significantly.",
    tips: [
      "Work 2-3 years before applying to get real experience",
      "Target top programs for the best recruiting and networking opportunities",
      "Choose a specialization that matches your career goals",
      "Build relationships with classmates — they'll be future business leaders",
      "Use school resources like career services, alumni networks, and startup funding",
    ],
  },
  {
    id: 5,
    name: "Early Career Professional",
    emoji: "💼",
    ageRange: "25-30",
    description: "Build expertise, prove yourself, and climb the ladder.",
    details: "Your first professional years are about learning the ropes, proving your value, and building a reputation. Work hard, take on challenging projects, find mentors, and develop leadership skills. Many entrepreneurs use this time to learn from established companies before starting their own.",
    tips: [
      "Say yes to challenging assignments and stretch opportunities",
      "Find a mentor who can guide your career development",
      "Build your professional network through industry events and LinkedIn",
      "Develop both hard skills (technical) and soft skills (leadership, communication)",
      "Start saving and investing — financial literacy is a superpower!",
    ],
  },
  {
    id: 6,
    name: "Senior Leader",
    emoji: "🌟",
    ageRange: "30-45",
    description: "Lead teams, drive strategy, and make major business decisions.",
    details: "As a senior leader, you manage larger teams, make strategic decisions, and shape the direction of your company. Titles might include Director, VP (Vice President), or Partner. This is when your years of experience and relationships really pay off. Many people also start their own companies at this stage.",
    tips: [
      "Develop a strong leadership philosophy and management style",
      "Mentor younger employees and build a strong team",
      "Think strategically about industry trends and competitive positioning",
      "Build a personal brand through speaking, writing, or thought leadership",
      "Consider entrepreneurship if you have a business idea you're passionate about",
    ],
  },
  {
    id: 7,
    name: "Executive / CEO",
    emoji: "👑",
    ageRange: "40+",
    description: "Lead an entire organization and shape its future.",
    details: "At the executive level, you're responsible for the entire organization — its strategy, culture, performance, and future direction. CEOs, CFOs, and COOs work with boards of directors and make decisions that affect thousands of employees and millions of customers. It takes decades of experience and leadership to reach this level.",
    tips: [
      "Focus on vision and long-term strategy over day-to-day operations",
      "Build and maintain a strong company culture",
      "Stay connected to customers, employees, and market trends",
      "Give back through philanthropy, mentorship, and community involvement",
      "Never stop learning — the best leaders are lifelong students",
    ],
  },
];

export interface BusinessSpecialty {
  id: number;
  name: string;
  emoji: string;
  description: string;
  dayInLife: string;
  salary: string;
}

export const businessSpecialties: BusinessSpecialty[] = [
  {
    id: 1,
    name: "Marketing",
    emoji: "📢",
    description: "Create campaigns, build brands, and connect products with the people who need them. Marketing professionals use creativity and data to tell compelling stories.",
    dayInLife: "A marketing manager might start the day reviewing campaign analytics, brainstorm creative ideas with the team, write social media content, and present a new campaign strategy to leadership. It's a mix of creativity and data!",
    salary: "$50,000 - $180,000+",
  },
  {
    id: 2,
    name: "Finance / Investment Banking",
    emoji: "💹",
    description: "Manage money, analyze investments, and help companies raise capital. Finance professionals are the number-crunchers who keep businesses financially healthy.",
    dayInLife: "An investment banker might analyze a company's financial statements, build complex financial models, prepare pitch presentations for clients, and work on mergers and acquisitions. The hours are long but the pay is exceptional!",
    salary: "$70,000 - $300,000+",
  },
  {
    id: 3,
    name: "Entrepreneurship",
    emoji: "🚀",
    description: "Start and grow your own business from scratch. Entrepreneurs are risk-takers and innovators who turn ideas into reality.",
    dayInLife: "An entrepreneur's day is never the same! You might meet with investors in the morning, work on product development at noon, handle customer support in the afternoon, and plan marketing at night. You wear every hat in the business!",
    salary: "$0 - Unlimited (varies wildly!)",
  },
  {
    id: 4,
    name: "Management Consulting",
    emoji: "🧠",
    description: "Advise companies on how to solve their biggest problems. Consultants are strategic thinkers who work with different industries and challenges.",
    dayInLife: "A consultant might fly to a client's office Monday morning, conduct interviews with executives, analyze data to find patterns, and present recommendations on Friday. Every project brings a new industry and new challenges!",
    salary: "$80,000 - $250,000+",
  },
  {
    id: 5,
    name: "Human Resources",
    emoji: "👥",
    description: "Build great teams and create positive work environments. HR professionals are the people experts who help companies attract and retain top talent.",
    dayInLife: "An HR director might interview candidates, mediate a workplace conflict, design a new employee benefits program, and run a team-building workshop — all in one day. It's all about understanding people!",
    salary: "$50,000 - $200,000+",
  },
  {
    id: 6,
    name: "Tech Business / Product Management",
    emoji: "💻",
    description: "Bridge the gap between technology and business. Product managers decide what gets built and why, shaping the products millions of people use daily.",
    dayInLife: "A product manager might review user feedback data, meet with engineers to discuss feature priorities, run a customer research session, and update the product roadmap. You need to understand both technology and customer needs!",
    salary: "$90,000 - $250,000+",
  },
  {
    id: 7,
    name: "International Business",
    emoji: "🌍",
    description: "Work across borders and cultures to expand businesses globally. International business professionals navigate trade, regulations, and cultural differences.",
    dayInLife: "An international business manager might start the day on a video call with partners in Tokyo, review import/export regulations, negotiate a distribution deal with a European company, and analyze emerging market opportunities in Africa.",
    salary: "$60,000 - $200,000+",
  },
];

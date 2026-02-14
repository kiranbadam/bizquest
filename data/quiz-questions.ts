export type QuizCategory =
  | "Business Terms"
  | "Entrepreneurship"
  | "Finance Basics"
  | "Marketing"
  | "Famous Companies"
  | "Fun Business Facts";

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: QuizCategory;
}

export const quizCategories: { name: QuizCategory; emoji: string }[] = [
  { name: "Business Terms", emoji: "📚" },
  { name: "Entrepreneurship", emoji: "🚀" },
  { name: "Finance Basics", emoji: "💰" },
  { name: "Marketing", emoji: "📢" },
  { name: "Famous Companies", emoji: "🏢" },
  { name: "Fun Business Facts", emoji: "🎯" },
];

export const quizQuestions: QuizQuestion[] = [
  // Business Terms (6)
  {
    id: 1,
    question: "What does 'revenue' mean in business?",
    options: ["The profit after expenses", "The total money a business earns from sales", "The money owed to suppliers", "The tax a company pays"],
    correctAnswer: 1,
    explanation: "Revenue is the total amount of money a business brings in from selling its products or services, before any expenses are subtracted.",
    category: "Business Terms",
  },
  {
    id: 2,
    question: "What is an 'entrepreneur'?",
    options: ["A company manager", "Someone who invests in stocks", "A person who starts and runs their own business", "A government official"],
    correctAnswer: 2,
    explanation: "An entrepreneur is someone who creates, organizes, and operates a business, taking on financial risk in hopes of making a profit.",
    category: "Business Terms",
  },
  {
    id: 3,
    question: "What does ROI stand for?",
    options: ["Return On Investment", "Rate Of Inflation", "Revenue Over Income", "Ratio Of Interest"],
    correctAnswer: 0,
    explanation: "ROI stands for Return On Investment — it measures how much money you earn compared to how much you spent. A higher ROI means a better investment!",
    category: "Business Terms",
  },
  {
    id: 4,
    question: "What is a 'startup'?",
    options: ["Any large corporation", "A new business in its early stages of development", "A type of bank account", "A government program"],
    correctAnswer: 1,
    explanation: "A startup is a young company in its early stages, usually trying to develop a unique product or service and grow quickly.",
    category: "Business Terms",
  },
  {
    id: 5,
    question: "What does 'B2B' mean?",
    options: ["Back to Basics", "Business to Business", "Buy to Build", "Brand to Brand"],
    correctAnswer: 1,
    explanation: "B2B stands for Business to Business — it describes companies that sell products or services to other businesses, not directly to consumers.",
    category: "Business Terms",
  },
  {
    id: 6,
    question: "What is 'equity' in a company?",
    options: ["The total debt", "Ownership value in the company", "The company's bank balance", "The number of employees"],
    correctAnswer: 1,
    explanation: "Equity represents ownership in a company. If you own 50% equity in a business, you own half of it!",
    category: "Business Terms",
  },
  // Entrepreneurship (6)
  {
    id: 7,
    question: "What is a 'business plan'?",
    options: ["A building floor plan", "A document describing how a business will achieve its goals", "A list of employees", "A type of insurance"],
    correctAnswer: 1,
    explanation: "A business plan is a written document that outlines a business's goals, strategies, target market, financial projections, and how it plans to operate and grow.",
    category: "Entrepreneurship",
  },
  {
    id: 8,
    question: "What does 'pivot' mean in business?",
    options: ["Spinning around quickly", "Changing your business strategy or direction", "Firing all employees", "Moving to a new office"],
    correctAnswer: 1,
    explanation: "In business, a pivot means significantly changing your strategy, product, or target market when the original plan isn't working. Netflix pivoted from mailing DVDs to streaming!",
    category: "Entrepreneurship",
  },
  {
    id: 9,
    question: "What is 'venture capital'?",
    options: ["Money from a bank loan", "Money invested in startups by specialized firms", "Government funding for businesses", "A company's savings account"],
    correctAnswer: 1,
    explanation: "Venture capital (VC) is money invested in early-stage, high-potential startups by specialized investment firms. In exchange, they receive ownership (equity) in the company.",
    category: "Entrepreneurship",
  },
  {
    id: 10,
    question: "What is a 'minimum viable product' (MVP)?",
    options: ["The cheapest product you can make", "The simplest version of a product that can be sold to test the market", "A product with no features", "The most valuable product"],
    correctAnswer: 1,
    explanation: "An MVP is the simplest version of your product that still works and provides value. It lets you test your idea with real customers before investing too much time and money.",
    category: "Entrepreneurship",
  },
  {
    id: 11,
    question: "What is a 'pitch deck'?",
    options: ["A baseball field", "A short presentation used to convince investors to fund your business", "A type of sales report", "A company handbook"],
    correctAnswer: 1,
    explanation: "A pitch deck is a brief visual presentation (usually 10-15 slides) that gives investors an overview of your business plan, product, team, and why they should invest.",
    category: "Entrepreneurship",
  },
  {
    id: 12,
    question: "What does 'bootstrapping' mean in business?",
    options: ["Putting on boots", "Growing a business with your own money without outside investors", "Taking out a big bank loan", "Hiring many employees quickly"],
    correctAnswer: 1,
    explanation: "Bootstrapping means building a business using only personal savings and revenue — no outside investors or loans. Sara Blakely bootstrapped Spanx with just $5,000!",
    category: "Entrepreneurship",
  },
  // Finance Basics (6)
  {
    id: 13,
    question: "What is 'profit'?",
    options: ["Total sales revenue", "Revenue minus all expenses", "The money in a bank account", "The price of a product"],
    correctAnswer: 1,
    explanation: "Profit is what's left after you subtract all expenses (costs, wages, rent, etc.) from your total revenue. It's the actual money a business 'earns.'",
    category: "Finance Basics",
  },
  {
    id: 14,
    question: "What is a 'budget'?",
    options: ["A list of all products sold", "A plan for how to spend and save money", "A type of business loan", "A company's total revenue"],
    correctAnswer: 1,
    explanation: "A budget is a financial plan that estimates income and expenses over a period of time. It helps businesses (and people!) manage money wisely.",
    category: "Finance Basics",
  },
  {
    id: 15,
    question: "What does it mean when a company 'goes public'?",
    options: ["Opens a store", "Starts selling shares of stock to the public", "Makes its products free", "Becomes a government company"],
    correctAnswer: 1,
    explanation: "When a company 'goes public,' it sells shares of stock on a stock exchange for the first time (called an IPO). Anyone can then buy a tiny piece of the company!",
    category: "Finance Basics",
  },
  {
    id: 16,
    question: "What is 'compound interest'?",
    options: ["Interest paid only once", "Interest earned on both the original amount AND previously earned interest", "A type of bank fee", "Interest from multiple banks"],
    correctAnswer: 1,
    explanation: "Compound interest means you earn interest on your interest! If you invest $100 and earn 10%, you have $110. Next year you earn 10% on $110, not just $100. It snowballs over time!",
    category: "Finance Basics",
  },
  {
    id: 17,
    question: "What is an 'asset'?",
    options: ["Something a company owes", "Something valuable that a company owns", "A type of business expense", "A government regulation"],
    correctAnswer: 1,
    explanation: "An asset is anything valuable that a company owns — cash, buildings, equipment, patents, or even brand reputation. Assets help a company make money!",
    category: "Finance Basics",
  },
  {
    id: 18,
    question: "What is 'cash flow'?",
    options: ["The speed of transactions", "The movement of money in and out of a business", "A type of waterfall", "The total value of a company"],
    correctAnswer: 1,
    explanation: "Cash flow tracks money coming in (from sales) and going out (for expenses). Positive cash flow means more money coming in than going out — which is what every business wants!",
    category: "Finance Basics",
  },
  // Marketing (6)
  {
    id: 19,
    question: "What is a 'target market'?",
    options: ["A shooting range", "The specific group of people most likely to buy your product", "All people in the world", "Your competitors"],
    correctAnswer: 1,
    explanation: "A target market is the specific group of customers you want to reach. For example, a skateboard company's target market might be teens and young adults who love extreme sports.",
    category: "Marketing",
  },
  {
    id: 20,
    question: "What is a 'brand'?",
    options: ["Just a logo", "The overall identity, reputation, and perception of a company", "A type of product", "A store name"],
    correctAnswer: 1,
    explanation: "A brand is much more than a logo — it's the entire identity of a company, including its values, personality, reputation, and how customers feel about it.",
    category: "Marketing",
  },
  {
    id: 21,
    question: "What does 'SEO' stand for?",
    options: ["Sales Executive Officer", "Search Engine Optimization", "Social Engagement Online", "Stock Exchange Operations"],
    correctAnswer: 1,
    explanation: "SEO stands for Search Engine Optimization — it's the practice of making your website show up higher in Google search results so more people find your business.",
    category: "Marketing",
  },
  {
    id: 22,
    question: "What is 'viral marketing'?",
    options: ["Marketing that spreads like a virus", "Marketing that makes people sick", "A type of email spam", "Selling health products"],
    correctAnswer: 0,
    explanation: "Viral marketing is when content spreads rapidly from person to person through sharing, like a funny video or meme. It's free advertising powered by people sharing with friends!",
    category: "Marketing",
  },
  {
    id: 23,
    question: "What are the '4 Ps' of marketing?",
    options: ["People, Passion, Persistence, Profit", "Product, Price, Place, Promotion", "Plan, Produce, Package, Profit", "Prepare, Position, Pitch, Proceed"],
    correctAnswer: 1,
    explanation: "The 4 Ps of marketing are Product (what you sell), Price (how much it costs), Place (where you sell it), and Promotion (how you tell people about it).",
    category: "Marketing",
  },
  {
    id: 24,
    question: "What is a 'slogan'?",
    options: ["A company's financial report", "A catchy phrase that represents a brand", "A type of business contract", "A marketing budget"],
    correctAnswer: 1,
    explanation: "A slogan is a memorable catchphrase used in advertising. Think 'Just Do It' (Nike) or 'I'm Lovin' It' (McDonald's). Great slogans stick in your mind!",
    category: "Marketing",
  },
  // Famous Companies (6)
  {
    id: 25,
    question: "Who founded Amazon?",
    options: ["Bill Gates", "Elon Musk", "Jeff Bezos", "Mark Zuckerberg"],
    correctAnswer: 2,
    explanation: "Jeff Bezos founded Amazon in 1994 in his garage as an online bookstore. It grew into the world's largest online retailer and cloud computing company!",
    category: "Famous Companies",
  },
  {
    id: 26,
    question: "What was Apple's first product?",
    options: ["The iPhone", "The iPod", "The Apple I computer", "The Macintosh"],
    correctAnswer: 2,
    explanation: "The Apple I, released in 1976, was a hand-built circuit board computer. Steve Wozniak designed it and Steve Jobs helped sell it. It cost $666.66!",
    category: "Famous Companies",
  },
  {
    id: 27,
    question: "What company did Elon Musk NOT found or co-found?",
    options: ["SpaceX", "Tesla", "Amazon", "The Boring Company"],
    correctAnswer: 2,
    explanation: "Amazon was founded by Jeff Bezos. Elon Musk is associated with Tesla (as CEO, though he didn't originally found it), SpaceX, The Boring Company, and Neuralink.",
    category: "Famous Companies",
  },
  {
    id: 28,
    question: "What did Netflix originally do before streaming?",
    options: ["Sold TVs", "Rented DVDs by mail", "Made movies", "Sold popcorn"],
    correctAnswer: 1,
    explanation: "Netflix started in 1997 as a DVD-by-mail rental service. Customers picked movies online and DVDs were mailed to their homes. They pivoted to streaming in 2007!",
    category: "Famous Companies",
  },
  {
    id: 29,
    question: "Which company has the motto 'Don't be evil' (now 'Do the right thing')?",
    options: ["Facebook", "Apple", "Google/Alphabet", "Amazon"],
    correctAnswer: 2,
    explanation: "Google famously adopted 'Don't be evil' as its motto. When Google restructured under Alphabet, the parent company adopted 'Do the right thing.'",
    category: "Famous Companies",
  },
  {
    id: 30,
    question: "What was Microsoft's first major product?",
    options: ["Windows", "Xbox", "MS-DOS operating system", "Microsoft Office"],
    correctAnswer: 2,
    explanation: "MS-DOS (Microsoft Disk Operating System) was Microsoft's first major success, licensed to IBM in 1981. It became the standard operating system for personal computers!",
    category: "Famous Companies",
  },
  // Fun Business Facts (6)
  {
    id: 31,
    question: "What company started in a garage?",
    options: ["All of the below", "Apple", "Amazon", "Google"],
    correctAnswer: 0,
    explanation: "Apple (1976), Amazon (1994), and Google (1998) all famously started in garages! Many of the world's biggest companies had humble beginnings.",
    category: "Fun Business Facts",
  },
  {
    id: 32,
    question: "How much did the Nike swoosh logo cost when it was first designed?",
    options: ["$1 million", "$35", "$10,000", "$500"],
    correctAnswer: 1,
    explanation: "Portland State University student Carolyn Davidson designed the Nike swoosh in 1971 for just $35. Nike later gave her stock in the company as a bonus!",
    category: "Fun Business Facts",
  },
  {
    id: 33,
    question: "What was Starbucks named after?",
    options: ["A type of star", "A character from the novel Moby Dick", "The founder's dog", "A coffee-growing region"],
    correctAnswer: 1,
    explanation: "Starbucks is named after Starbuck, the first mate in Herman Melville's novel Moby Dick. The founders wanted a name that evoked the seafaring tradition of early coffee traders.",
    category: "Fun Business Facts",
  },
  {
    id: 34,
    question: "How old was Warren Buffett when he bought his first stock?",
    options: ["18", "15", "11", "21"],
    correctAnswer: 2,
    explanation: "Warren Buffett bought his first stock (Cities Service Preferred) at just 11 years old for $38 per share. He went on to become one of the richest people in history!",
    category: "Fun Business Facts",
  },
  {
    id: 35,
    question: "What product was originally marketed as a wallpaper cleaner before becoming a toy?",
    options: ["Silly Putty", "Play-Doh", "Slime", "Kinetic Sand"],
    correctAnswer: 1,
    explanation: "Play-Doh was originally a wallpaper cleaner! When it stopped selling well, the company rebranded it as a children's toy in 1956, and it became a massive success.",
    category: "Fun Business Facts",
  },
  {
    id: 36,
    question: "Which company sells the most products in the world?",
    options: ["Apple", "Amazon", "Walmart", "McDonald's"],
    correctAnswer: 2,
    explanation: "Walmart is the world's largest company by revenue, selling more products than any other retailer with over 10,500 stores in 19 countries!",
    category: "Fun Business Facts",
  },
];

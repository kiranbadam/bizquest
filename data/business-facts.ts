export interface BusinessFact {
  id: number;
  fact: string;
  category: string;
}

export const businessFacts: BusinessFact[] = [
  { id: 1, fact: "The average lemonade stand can teach you about supply, demand, pricing, and customer service — all real business skills!", category: "Entrepreneurship" },
  { id: 2, fact: "Apple started in a garage in 1976. Today it's worth over $3 trillion, making it one of the most valuable companies ever.", category: "Famous Companies" },
  { id: 3, fact: "The word 'entrepreneur' comes from the French word 'entreprendre,' meaning 'to undertake.'", category: "Business Terms" },
  { id: 4, fact: "Warren Buffett bought his first stock at age 11 and filed his first tax return at age 13.", category: "Business Legends" },
  { id: 5, fact: "The global economy produces over $100 trillion in goods and services every year.", category: "Economics" },
  { id: 6, fact: "Amazon started as an online bookstore in Jeff Bezos's garage in 1994.", category: "Famous Companies" },
  { id: 7, fact: "A 'unicorn' in business isn't a mythical creature — it's a startup valued at over $1 billion!", category: "Business Terms" },
  { id: 8, fact: "The first TV commercial aired in 1941 for Bulova watches and cost only $9.", category: "Marketing" },
  { id: 9, fact: "Madam C.J. Walker became America's first female self-made millionaire through her hair care business in the early 1900s.", category: "Business Legends" },
  { id: 10, fact: "About 50% of small businesses survive past the five-year mark, so persistence is key!", category: "Entrepreneurship" },
  { id: 11, fact: "The 'Fortune 500' list ranks the 500 largest U.S. companies by total revenue each year.", category: "Business Terms" },
  { id: 12, fact: "Nike's famous swoosh logo was designed by a college student for just $35 in 1971.", category: "Marketing" },
  { id: 13, fact: "The stock market has been around since the 1600s, when the Dutch East India Company became the first publicly traded company.", category: "Finance" },
  { id: 14, fact: "Google's original name was 'Backrub' before founders Larry Page and Sergey Brin changed it.", category: "Famous Companies" },
  { id: 15, fact: "An MBA (Master of Business Administration) is the most popular graduate degree in the world.", category: "Business Education" },
  { id: 16, fact: "The concept of 'branding' comes from cattle ranchers who burned marks onto their livestock to show ownership.", category: "Marketing" },
  { id: 17, fact: "Sara Blakely started Spanx with just $5,000 in savings and became the youngest self-made female billionaire.", category: "Entrepreneurship" },
  { id: 18, fact: "Revenue is the total money a business earns, while profit is what's left after paying all expenses.", category: "Finance" },
  { id: 19, fact: "The first vending machine was invented in ancient Egypt to dispense holy water!", category: "Business History" },
  { id: 20, fact: "Over 600 million people worldwide are entrepreneurs — that's nearly 1 in 12 people on Earth!", category: "Entrepreneurship" },
  { id: 21, fact: "The 'SWOT' in SWOT analysis stands for Strengths, Weaknesses, Opportunities, and Threats.", category: "Business Terms" },
  { id: 22, fact: "Disney was fired from a newspaper job for 'lacking imagination.' He went on to build a $200+ billion empire.", category: "Business Legends" },
  { id: 23, fact: "E-commerce sales worldwide are over $6 trillion per year and still growing rapidly.", category: "Economics" },
  { id: 24, fact: "The youngest billionaire ever was Mark Zuckerberg, who became one at age 23 after founding Facebook.", category: "Famous Companies" },
  { id: 25, fact: "Compound interest is called the 'eighth wonder of the world' — it's how money grows by earning interest on interest!", category: "Finance" },
];

export interface BusinessQuote {
  id: number;
  quote: string;
  author: string;
  role: string;
}

export const businessQuotes: BusinessQuote[] = [
  { id: 1, quote: "The way to get started is to quit talking and begin doing.", author: "Walt Disney", role: "Founder, The Walt Disney Company" },
  { id: 2, quote: "Your most unhappy customers are your greatest source of learning.", author: "Bill Gates", role: "Co-founder, Microsoft" },
  { id: 3, quote: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs", role: "Co-founder, Apple" },
  { id: 4, quote: "Risk more than others think is safe. Dream more than others think is practical.", author: "Howard Schultz", role: "Former CEO, Starbucks" },
  { id: 5, quote: "The biggest risk is not taking any risk. In a world that's changing quickly, the only strategy guaranteed to fail is not taking risks.", author: "Mark Zuckerberg", role: "Founder, Meta" },
  { id: 6, quote: "It's fine to celebrate success, but it is more important to heed the lessons of failure.", author: "Bill Gates", role: "Co-founder, Microsoft" },
  { id: 7, quote: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller", role: "Founder, Standard Oil" },
  { id: 8, quote: "If you really look closely, most overnight successes took a long time.", author: "Steve Jobs", role: "Co-founder, Apple" },
  { id: 9, quote: "The secret to successful hiring is this: look for people who want to change the world.", author: "Marc Benioff", role: "CEO, Salesforce" },
  { id: 10, quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", role: "Former British Prime Minister" },
];

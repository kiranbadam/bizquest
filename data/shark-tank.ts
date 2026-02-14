export interface BusinessMoment {
  id: number;
  title: string;
  emoji: string;
  year: string;
  category: string;
  shortDescription: string;
  fullStory: string;
  dramaticQuote: string;
  quoteAttribution: string;
  impact: string;
}

export const businessMoments: BusinessMoment[] = [
  {
    id: 1,
    title: "Apple's Garage Beginning",
    emoji: "🍎",
    year: "1976",
    category: "Tech",
    shortDescription: "Two college dropouts built the first Apple computer in a garage, launching the personal computing revolution.",
    fullStory: "In 1976, Steve Jobs and Steve Wozniak built the Apple I computer in the Jobs family garage in Los Altos, California. Wozniak designed the circuit board while Jobs handled the business side, selling 200 units at $666.66 each. This humble beginning launched what would become the world's most valuable company, worth over $3 trillion today. The garage is now a registered historic landmark.",
    dramaticQuote: "The people who are crazy enough to think they can change the world are the ones who do.",
    quoteAttribution: "Steve Jobs",
    impact: "Apple revolutionized personal computing, music (iPod), phones (iPhone), and tablets (iPad), and inspired an entire generation of tech entrepreneurs to start companies in their garages.",
  },
  {
    id: 2,
    title: "Amazon: From Books to Everything",
    emoji: "📦",
    year: "1994",
    category: "E-Commerce",
    shortDescription: "Jeff Bezos quit his Wall Street job to sell books online, building the world's largest online retailer.",
    fullStory: "In 1994, Jeff Bezos noticed the internet was growing at 2,300% per year. He made a list of 20 products he could sell online and chose books because of the huge number of titles. He quit his comfortable Wall Street job, drove to Seattle, and started Amazon in his garage. Early investors thought he was crazy. The company lost money for years, but Bezos kept reinvesting in growth. Today Amazon sells virtually everything and is worth over $1.5 trillion.",
    dramaticQuote: "I knew that if I failed I wouldn't regret that, but I knew the one thing I might regret is not trying.",
    quoteAttribution: "Jeff Bezos",
    impact: "Amazon transformed retail, created the cloud computing industry (AWS), changed consumer expectations forever, and proved that long-term thinking beats short-term profits.",
  },
  {
    id: 3,
    title: "Netflix Kills Blockbuster",
    emoji: "📺",
    year: "2007",
    category: "Entertainment",
    shortDescription: "Netflix pivoted from mailing DVDs to streaming, destroying the $6 billion video rental industry.",
    fullStory: "In 2000, Netflix co-founder Reed Hastings flew to Dallas to offer Blockbuster a partnership: Netflix would run Blockbuster's online business for $50 million. Blockbuster's CEO laughed them out of the room. Netflix then pivoted to streaming in 2007, forever changing how we watch entertainment. By 2010, Blockbuster was bankrupt with $1 billion in debt, while Netflix grew to serve over 200 million subscribers worldwide.",
    dramaticQuote: "Companies rarely die from moving too fast, and they frequently die from moving too slowly.",
    quoteAttribution: "Reed Hastings, Netflix CEO",
    impact: "Netflix created the streaming era, killed the video rental industry, pioneered binge-watching culture, and forced traditional media companies to launch their own streaming services.",
  },
  {
    id: 4,
    title: "The iPhone Revolution",
    emoji: "📱",
    year: "2007",
    category: "Tech",
    shortDescription: "Apple unveiled the iPhone, combining a phone, iPod, and internet device into one revolutionary product.",
    fullStory: "On January 9, 2007, Steve Jobs walked onto stage and said, 'Today, Apple is going to reinvent the phone.' He revealed the iPhone — a device with no physical keyboard, just a multi-touch screen. Competitors mocked it: BlackBerry's CEO said no one would want a phone without a keyboard. Microsoft's Steve Ballmer laughed and said it had 'no chance of getting any significant market share.' The iPhone went on to become the most profitable product in history, generating over $1 trillion in cumulative revenue.",
    dramaticQuote: "Every once in a while, a revolutionary product comes along that changes everything.",
    quoteAttribution: "Steve Jobs, Apple Keynote 2007",
    impact: "The iPhone created the smartphone era, launched the app economy (worth $500+ billion), and fundamentally changed how humans communicate, work, shop, and entertain themselves.",
  },
  {
    id: 5,
    title: "Spanx: $5,000 to Billions",
    emoji: "💪",
    year: "2000",
    category: "Entrepreneurship",
    shortDescription: "Sara Blakely turned $5,000 and a simple idea into a billion-dollar shapewear empire with zero outside investment.",
    fullStory: "Sara Blakely was a 27-year-old fax machine salesperson when she cut the feet off her pantyhose for a smoother look under white pants. She realized she'd stumbled onto a product idea. With just $5,000, she researched manufacturing, wrote her own patent (saving $3,000 in lawyer fees), and cold-called her way into a meeting with Neiman Marcus. The buyer tried the product in the bathroom during the meeting and immediately placed an order. Oprah named Spanx one of her 'Favorite Things,' and sales exploded.",
    dramaticQuote: "Don't be intimidated by what you don't know. That can be your greatest strength and ensure that you do things differently from everyone else.",
    quoteAttribution: "Sara Blakely",
    impact: "Spanx proved that a great idea, determination, and $5,000 can compete with established fashion giants. Blakely became the youngest self-made female billionaire and inspired millions of women entrepreneurs.",
  },
  {
    id: 6,
    title: "Google's Stanford Dorm Room",
    emoji: "🔍",
    year: "1998",
    category: "Tech",
    shortDescription: "Two PhD students created a search engine in their dorm room that would organize the world's information.",
    fullStory: "Larry Page and Sergey Brin met at Stanford in 1995 and began working on a search engine called 'BackRub' that ranked websites based on how many other sites linked to them (PageRank). They built their first server in a dorm room using Lego bricks to hold the hard drives. They tried to sell the technology for $1 million — nobody wanted it. So they started Google. Their first investor was Sun Microsystems co-founder Andy Bechtolsheim, who wrote a $100,000 check to 'Google Inc.' before the company even legally existed.",
    dramaticQuote: "If we were motivated by money, we would have sold the company a long time ago and ended up on a beach.",
    quoteAttribution: "Larry Page, Google Co-founder",
    impact: "Google organized the world's information, created the modern internet advertising industry, and became one of the most influential companies in history, worth over $1.5 trillion.",
  },
  {
    id: 7,
    title: "Tesla's Electric Dream",
    emoji: "🚗",
    year: "2008",
    category: "Innovation",
    shortDescription: "Tesla launched the Roadster, proving electric cars could be fast, cool, and desirable — not just golf carts.",
    fullStory: "In 2008, Tesla was on the verge of bankruptcy. Elon Musk had invested almost all his personal fortune. The financial crisis was devastating. On Christmas Eve 2008, Musk closed a last-minute funding round that saved the company with literally hours to spare. The Tesla Roadster proved electric cars could be exciting, not just eco-friendly. Fast forward to today: Tesla is the world's most valuable car company, and every major automaker is now racing to build electric vehicles.",
    dramaticQuote: "There have been many car companies that have started. They've all gone bankrupt. But we haven't. So that's pretty good.",
    quoteAttribution: "Elon Musk",
    impact: "Tesla single-handedly accelerated the world's transition to electric vehicles, forced every major automaker to develop EVs, and proved that sustainable technology can be commercially successful.",
  },
  {
    id: 8,
    title: "Disney's Impossible Dream",
    emoji: "🏰",
    year: "1955",
    category: "Entertainment",
    shortDescription: "Walt Disney bet everything on building a theme park that every expert said would fail — it became the happiest place on Earth.",
    fullStory: "When Walt Disney announced plans for Disneyland, everyone thought he was crazy. His brother Roy opposed it. The bank refused to fund it. Experts said an amusement park in orange groves would fail spectacularly. Disney mortgaged his house and used his life insurance to fund construction. Opening day (July 17, 1955) was a disaster — rides broke down, the pavement melted, and there wasn't enough food. But Disney's vision prevailed. Today, Disney's theme parks generate over $30 billion in revenue annually.",
    dramaticQuote: "All our dreams can come true, if we have the courage to pursue them.",
    quoteAttribution: "Walt Disney",
    impact: "Disneyland invented the modern theme park industry, proved that imagination and storytelling could create entire worlds, and built a $200+ billion entertainment empire.",
  },
  {
    id: 9,
    title: "The Birth of Social Media",
    emoji: "👤",
    year: "2004",
    category: "Tech",
    shortDescription: "Mark Zuckerberg launched Facebook from his Harvard dorm room, connecting billions of people worldwide.",
    fullStory: "In February 2004, 19-year-old Harvard sophomore Mark Zuckerberg launched 'TheFacebook.com' from his dorm room. Within 24 hours, over 1,000 Harvard students signed up. Within a month, half the campus was on it. Zuckerberg dropped out of Harvard and moved to Silicon Valley. Despite offers to buy the company (Yahoo offered $1 billion in 2006), Zuckerberg refused. Facebook grew to connect over 3 billion people worldwide, generating over $100 billion in annual advertising revenue.",
    dramaticQuote: "The biggest risk is not taking any risk. In a world that's changing really quickly, the only strategy that is guaranteed to fail is not taking risks.",
    quoteAttribution: "Mark Zuckerberg",
    impact: "Facebook (now Meta) changed how humans communicate, created the social media advertising industry, influenced elections and social movements, and redefined privacy in the digital age.",
  },
  {
    id: 10,
    title: "Airbnb: Air Mattresses to Empire",
    emoji: "🏠",
    year: "2008",
    category: "Entrepreneurship",
    shortDescription: "Three broke designers rented out air mattresses to pay rent, building a $100 billion hospitality platform.",
    fullStory: "In 2007, Brian Chesky and Joe Gebbia couldn't afford their San Francisco rent. They noticed a design conference was filling up all local hotels, so they bought three air mattresses and created 'AirBed & Breakfast,' renting floor space to conference attendees for $80/night. To fund the startup, they created special edition cereal boxes ('Obama O's') that raised $30,000. They were rejected by every investor they pitched to. Y Combinator finally accepted them, and Airbnb grew into a $100+ billion company with over 7 million listings worldwide.",
    dramaticQuote: "If we tried to think of a good idea, we wouldn't have been able to think of a good idea. You just have to find the solution for a problem in your own life.",
    quoteAttribution: "Brian Chesky, Airbnb Co-founder",
    impact: "Airbnb disrupted the entire hotel industry, created the 'sharing economy' movement, enabled millions of people to earn income from their homes, and changed how the world travels.",
  },
];

export interface PitchScenario {
  id: number;
  title: string;
  emoji: string;
  description: string;
  askAmount: string;
  strengths: string[];
  weaknesses: string[];
  verdict: "invest" | "pass";
  explanation: string;
}

export const pitchScenarios: PitchScenario[] = [
  {
    id: 1,
    title: "EcoBottle: Reusable Water Bottles for Schools",
    emoji: "🌿",
    description: "A 13-year-old inventor created a collapsible, reusable water bottle made from plant-based materials. The bottle folds flat to fit in any backpack and comes in customizable school colors. They've sold 500 bottles at their school and want to expand to other schools nationwide.",
    askAmount: "$25,000 for 15% equity",
    strengths: [
      "Solves a real problem — reducing plastic waste in schools",
      "Already has proven sales (500 bottles sold)",
      "Unique plant-based material differentiates from competitors",
      "Growing trend toward eco-friendly products",
    ],
    weaknesses: [
      "Manufacturing costs are high for small batches",
      "Competition from established water bottle brands",
      "Scaling from one school to nationwide is a big jump",
    ],
    verdict: "invest",
    explanation: "This is a solid investment! The founder has already proven demand with real sales, the product aligns with growing eco-conscious trends, and the school market is huge (130,000+ schools in the U.S.). With $25,000 for manufacturing at scale, costs would drop significantly.",
  },
  {
    id: 2,
    title: "HomeworkHelper: AI Tutoring App",
    emoji: "📚",
    description: "Two 14-year-old coders built an app that uses AI to help students understand their homework (not just give answers). The app explains concepts step-by-step and adapts to each student's learning style. They have 2,000 users but no revenue yet.",
    askAmount: "$50,000 for 20% equity",
    strengths: [
      "Strong user growth (2,000 users without marketing)",
      "Education tech is a booming market ($340 billion)",
      "AI tutoring is the future of personalized learning",
      "Founded by student users who understand the problem",
    ],
    weaknesses: [
      "No revenue yet — unclear how to monetize",
      "AI tutoring has many well-funded competitors (Khan Academy, Chegg)",
      "High valuation ($250K) for a pre-revenue company",
    ],
    verdict: "pass",
    explanation: "While the idea is great and the founders are impressive, asking $50,000 at a $250K valuation with zero revenue is too risky. The education AI space is extremely competitive with well-funded players. They should first prove a revenue model (subscriptions, school licenses) before seeking investment.",
  },
  {
    id: 3,
    title: "PetPal: Dog Walking & Pet Sitting Marketplace",
    emoji: "🐕",
    description: "A teen entrepreneur built an app connecting trusted neighborhood teens with pet owners who need dog walking and pet sitting services. All walkers are background-checked (through parents) and GPS-tracked. They've completed 1,000 walks in their city and charge a 15% service fee.",
    askAmount: "$30,000 for 10% equity",
    strengths: [
      "Clear revenue model (15% commission on each service)",
      "Already generating revenue with 1,000 completed walks",
      "Pet care is a $150 billion industry growing rapidly",
      "GPS tracking and background checks build trust with parents",
    ],
    weaknesses: [
      "Insurance and liability concerns for minors",
      "Wag and Rover are established competitors in this space",
      "Only operating in one city so far",
    ],
    verdict: "invest",
    explanation: "Strong investment! Real revenue, proven demand, and a clever angle (teen workers for the teen-friendly gig economy). The pet care market is massive and growing. With $30,000, they could expand to 5-10 nearby cities and build a strong regional presence before competitors catch on.",
  },
  {
    id: 4,
    title: "GameCoach: Video Game Tutoring Platform",
    emoji: "🎮",
    description: "A 15-year-old competitive gamer built a platform where skilled gamers can offer coaching sessions to younger or less experienced players. Sessions are conducted via video call with screen sharing. They've hosted 200 sessions at $15 each.",
    askAmount: "$20,000 for 25% equity",
    strengths: [
      "Unique concept in a massive gaming market ($200+ billion)",
      "Revenue-generating with 200 completed paid sessions",
      "Low overhead costs — platform is entirely online",
      "Growing esports and competitive gaming trend",
    ],
    weaknesses: [
      "Giving up 25% equity is a lot for a young company",
      "Gaming coaching market is still unproven at scale",
      "Parents may not see value in paying for game tutoring",
    ],
    verdict: "invest",
    explanation: "This is a smart investment with the right adjustments. The founder should negotiate down to 15% equity. The gaming industry is massive, esports is growing rapidly, and coaching is a proven model in sports — applying it to gaming makes sense. The 200 completed sessions prove real demand.",
  },
  {
    id: 5,
    title: "SnackBox: Healthy Vending Machines for Schools",
    emoji: "🥗",
    description: "A middle schooler wants to replace junk food vending machines in schools with healthy snack options. They've designed a custom vending machine concept with a touchscreen that shows nutritional info. They have no prototype yet but have a detailed business plan and letters of interest from 3 school principals.",
    askAmount: "$100,000 for 10% equity",
    strengths: [
      "Addresses a real health problem in schools",
      "Letters of interest from principals show market demand",
      "Healthy snacking is a growing $30 billion market",
      "Detailed business plan shows serious preparation",
    ],
    weaknesses: [
      "No prototype — it's just an idea on paper so far",
      "Custom vending machines are very expensive to build",
      "$100K ask with $1M valuation for a pre-product company is very high",
      "Schools have strict procurement processes that are slow",
    ],
    verdict: "pass",
    explanation: "The concept is exciting but way too early for this level of investment. No prototype, no revenue, and a $1 million valuation is unrealistic. The founder should first build one prototype, test it in a single school, prove the concept works, and then come back for funding with real data.",
  },
];

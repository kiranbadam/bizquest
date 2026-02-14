export interface BusinessPart {
  id: number;
  name: string;
  emoji: string;
  description: string;
  details: string;
  funFact: string;
  level: "type" | "department" | "concept";
}

export const businessParts: BusinessPart[] = [
  // Business Types
  {
    id: 1,
    name: "Sole Proprietorship",
    emoji: "👤",
    description: "A business owned and run by one person.",
    details: "A sole proprietorship is the simplest type of business. One person owns everything, makes all the decisions, and keeps all the profits — but also takes on all the risk. Most lemonade stands and freelance businesses are sole proprietorships. You don't need to file special paperwork to start one!",
    funFact: "About 73% of all businesses in the U.S. are sole proprietorships — making it the most common business type!",
    level: "type",
  },
  {
    id: 2,
    name: "Partnership",
    emoji: "🤝",
    description: "A business owned by two or more people who share profits and responsibilities.",
    details: "A partnership is when two or more people agree to run a business together. They share the work, the costs, and the profits. Partners often bring different skills — one might be great at making products while the other is great at selling them. Ben & Jerry's started as a partnership between two friends!",
    funFact: "The partnership between Larry Page and Sergey Brin started as a college project and became Google — now worth over $1.5 trillion!",
    level: "type",
  },
  {
    id: 3,
    name: "LLC (Limited Liability Company)",
    emoji: "🛡️",
    description: "A flexible business structure that protects owners' personal assets.",
    details: "An LLC combines the simplicity of a sole proprietorship with special legal protection. If the business gets into trouble or debt, the owners' personal belongings (like their house or car) are usually protected. Many small to medium businesses choose this structure because it's flexible and safe.",
    funFact: "Wyoming was the first state to allow LLCs in 1977, and now every state recognizes them!",
    level: "type",
  },
  {
    id: 4,
    name: "Corporation",
    emoji: "🏢",
    description: "A large business entity that can sell shares of ownership (stock) to the public.",
    details: "A corporation is a separate legal entity from its owners. It can sell stock (tiny pieces of ownership) to the public to raise money. Corporations have a board of directors who make big decisions. Companies like Apple, Disney, and Nike are all corporations. They're more complex to set up but can grow much larger.",
    funFact: "The Dutch East India Company, founded in 1602, was the first corporation to issue stock to the public — it was worth about $8.2 trillion in today's money!",
    level: "type",
  },
  // Departments
  {
    id: 5,
    name: "Marketing",
    emoji: "📢",
    description: "The team that promotes the business and attracts customers.",
    details: "Marketing is all about understanding what customers want and telling them why your product is the best choice. This includes advertising, social media, branding, and market research. Marketers create the catchy slogans, eye-catching ads, and viral campaigns that make you want to buy things!",
    funFact: "Companies spend over $600 billion per year on advertising worldwide — that's more than the GDP of most countries!",
    level: "department",
  },
  {
    id: 6,
    name: "Finance",
    emoji: "💰",
    description: "The team that manages the company's money.",
    details: "The finance department keeps track of all the money coming in and going out. They create budgets, manage investments, handle payroll, and make sure the company stays profitable. They're like the company's financial guardians, making sure every dollar is used wisely.",
    funFact: "The average Fortune 500 CFO (Chief Financial Officer) manages budgets of over $10 billion — that's enough to buy about 40 million pizzas!",
    level: "department",
  },
  {
    id: 7,
    name: "Human Resources (HR)",
    emoji: "👥",
    description: "The team that takes care of hiring, training, and employee wellbeing.",
    details: "HR is responsible for finding and hiring great employees, making sure everyone is treated fairly, organizing training programs, and creating a positive work environment. They also handle benefits like health insurance and vacation days. Think of HR as the people who take care of the people!",
    funFact: "Google's HR department is called 'People Operations' — they even use data science to figure out the best ways to keep employees happy!",
    level: "department",
  },
  {
    id: 8,
    name: "Operations",
    emoji: "⚙️",
    description: "The team that makes sure everything runs smoothly day-to-day.",
    details: "Operations is the backbone of any business. This team manages the actual production of goods or delivery of services, handles supply chains, quality control, and logistics. They make sure products get made correctly and delivered on time. Without operations, nothing would actually get done!",
    funFact: "Amazon's operations team manages over 175 fulfillment centers worldwide and can deliver packages in under 24 hours!",
    level: "department",
  },
  {
    id: 9,
    name: "Sales",
    emoji: "🤑",
    description: "The team that directly connects with customers to sell products or services.",
    details: "The sales team is on the front lines, talking to customers and convincing them to buy. They build relationships, negotiate deals, and close sales. Great salespeople listen carefully to what customers need and show them exactly how the product can help. They are the engine that drives revenue!",
    funFact: "The highest-paid salesperson ever reportedly earned over $100 million in a single year selling financial products!",
    level: "department",
  },
  {
    id: 10,
    name: "Research & Development (R&D)",
    emoji: "🔬",
    description: "The team that creates new products and improves existing ones.",
    details: "R&D is where innovation happens! This team researches new technologies, designs new products, and improves what already exists. Companies like Apple, Tesla, and pharmaceutical companies invest billions in R&D. Without R&D, we wouldn't have smartphones, electric cars, or life-saving medicines.",
    funFact: "Amazon spends over $70 billion per year on R&D — more than any other company in the world!",
    level: "department",
  },
  // Key Concepts
  {
    id: 11,
    name: "Supply Chain",
    emoji: "🔗",
    description: "The entire process of creating and delivering a product to customers.",
    details: "A supply chain includes everything from getting raw materials, manufacturing products, storing them in warehouses, and shipping them to stores or homes. Think of your favorite sneaker — the rubber comes from one country, the fabric from another, they're assembled somewhere else, then shipped to a store near you!",
    funFact: "A typical chocolate bar's supply chain involves over 10 countries, from cocoa farms in Africa to candy stores in America!",
    level: "concept",
  },
  {
    id: 12,
    name: "Profit & Loss",
    emoji: "📊",
    description: "The financial report that shows if a business is making or losing money.",
    details: "A Profit & Loss statement (also called P&L or income statement) is like a report card for a business. It shows all the money earned (revenue) minus all the money spent (expenses). If revenue is higher, the business made a profit! If expenses are higher, it's a loss. Every business tracks this carefully.",
    funFact: "Apple's profit in a single quarter can exceed $30 billion — that's over $300 million in profit every single day!",
    level: "concept",
  },
  {
    id: 13,
    name: "Org Chart",
    emoji: "📐",
    description: "A visual diagram showing how a company is organized and who reports to whom.",
    details: "An organizational chart (org chart) shows the hierarchy of a company — who's in charge, who manages whom, and how different departments connect. At the top is usually the CEO (Chief Executive Officer), then vice presidents, managers, and team members. It helps everyone understand their role and who to go to for help.",
    funFact: "Some companies like Valve (the gaming company) have a 'flat' org chart with NO managers — every employee picks what projects to work on!",
    level: "concept",
  },
];

export interface FlowStep {
  id: number;
  name: string;
  emoji: string;
  details: string;
}

export const businessFlowSteps: FlowStep[] = [
  {
    id: 1,
    name: "Spot Opportunity",
    emoji: "💡",
    details: "Every great business starts with spotting a problem that needs solving or an opportunity others have missed. This means paying attention to what frustrates people, what's missing in the market, or what could be done better. The best entrepreneurs are curious observers who ask 'What if?' and 'Why not?'",
  },
  {
    id: 2,
    name: "Research",
    emoji: "🔍",
    details: "Once you have an idea, it's time to do your homework! Market research means finding out if people actually want what you plan to sell, who your competitors are, and how big the opportunity is. You might survey potential customers, study similar businesses, and learn about your industry. Knowledge is power!",
  },
  {
    id: 3,
    name: "Business Plan",
    emoji: "📋",
    details: "A business plan is your roadmap to success. It describes your product, target customers, marketing strategy, financial projections, and how you plan to operate. Think of it as a detailed blueprint that guides every decision. Investors and banks want to see a solid business plan before giving you money.",
  },
  {
    id: 4,
    name: "Get Funding",
    emoji: "💵",
    details: "Most businesses need money to get started — called capital or funding. You might use personal savings, borrow from a bank, find investors (people who give money in exchange for a share of the business), or even crowdfund online. The amount needed depends on the type of business.",
  },
  {
    id: 5,
    name: "Build",
    emoji: "🏗️",
    details: "Now it's time to build! This means creating your product or service, setting up your workspace, hiring your first team members, and putting all the systems in place. You might build a website, manufacture products, or set up a storefront. This is where your plan becomes reality.",
  },
  {
    id: 6,
    name: "Launch",
    emoji: "🚀",
    details: "Launch day is when you officially open for business and start selling to customers! This is an exciting milestone. A successful launch often includes marketing campaigns, special promotions, and getting the word out through social media, press, and word of mouth.",
  },
  {
    id: 7,
    name: "Grow",
    emoji: "📈",
    details: "After launching, the goal is to grow! This means getting more customers, increasing sales, improving your product based on feedback, and expanding into new markets. Growth might mean hiring more people, opening new locations, or developing new products. Smart growth is sustainable growth.",
  },
  {
    id: 8,
    name: "Adapt",
    emoji: "🔄",
    details: "The business world changes constantly, and successful companies adapt. This might mean pivoting your strategy, updating your products, adopting new technologies, or responding to competitor moves. Companies like Netflix (from DVDs to streaming) and Apple (from computers to phones) are masters of adaptation.",
  },
  {
    id: 9,
    name: "Give Back",
    emoji: "🌍",
    details: "Many successful businesses find ways to give back to their communities and the world. This is called Corporate Social Responsibility (CSR). It could mean donating to charities, reducing environmental impact, supporting local schools, or creating programs to help people in need. Great businesses do well AND do good!",
  },
];

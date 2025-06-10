export interface ExamplePrompt {
  label: string; // Short chip label
  prompt: string; // Detailed prompt inserted into the textarea
}

// Row 1 – Branding, naming, marketing inspiration
export const row1Prompts: ExamplePrompt[] = [
  {
    label: "Creative names for my AI startup",
    prompt:
      "I'm building an AI-powered platform that helps small businesses automate customer support. Give me a list of 30 creative, memorable startup names that convey intelligence, reliability and approachability.",
  },
  {
    label: "Viral marketing ideas for sustainable fashion",
    prompt:
      "My DTC sustainable-fashion brand uses recycled fabrics. Suggest 20 viral marketing campaign concepts (taglines, hashtags, content ideas) that would resonate with eco-conscious Gen-Z shoppers on TikTok and Instagram.",
  },
  {
    label: "Meditation-app feature ideas",
    prompt:
      "I run a mobile meditation app with 500k users. Propose 25 innovative features or content series that would increase daily engagement and differentiate us from Calm and Headspace.",
  },
  {
    label: "Catchy podcast names about entrepreneurship",
    prompt:
      "I'm launching a weekly interview podcast featuring under-represented founders. Provide 40 catchy, SEO-friendly podcast name ideas (with available .com domains) that signal inspiration and diversity in entrepreneurship.",
  },
  {
    label: "Unique selling propositions for consulting",
    prompt:
      "I'm a solo SaaS growth consultant targeting early-stage startups. List 15 compelling unique selling propositions (one-sentence) that would make founders eager to book a discovery call.",
  },
  {
    label: "Monetization ideas for a newsletter",
    prompt:
      "My free weekly newsletter on product design has 20k subscribers. Suggest 12 creative, ethical monetization strategies that align with the audience's interests (no intrusive ads). Rank them by ease of implementation.",
  },
  {
    label: "Remote-team building activities",
    prompt:
      "We're a fully remote 50-person software company. Compile a list of 25 engaging, low-cost team-building activities that can be run asynchronously or over Zoom across multiple time zones.",
  },
  {
    label: "Personal-brand angles for LinkedIn",
    prompt:
      "I'm a mid-career data scientist pivoting into AI ethics. Give me 20 fresh content angles / post series I could publish on LinkedIn to establish authority and grow my network fast.",
  },
  {
    label: "Domain names for food blog",
    prompt:
      "I'm starting a vegan comfort-food blog. Generate 40 fun, short domain names (<15 characters) that are memorable and spell-check friendly. Include the availability status if possible.",
  },
  {
    label: "Product-launch strategies",
    prompt:
      "We will launch a browser extension that summarises PDFs. Outline 10 step-by-step go-to-market strategies (with timelines) that could help us reach 100k installs within 3 months.",
  },
  {
    label: "Customer-retention ideas",
    prompt:
      "Our bootstrapped SaaS (B2B) has 8% monthly churn. Suggest 20 actionable tactics (product, support, pricing) to reduce churn to 3% within six months.",
  },
  {
    label: "Content ideas for YouTube channel",
    prompt:
      "I run a YouTube channel about personal finance for millennials. Provide a content calendar of 30 video ideas with catchy titles and 2-sentence descriptions, optimized for search.",
  },
  {
    label: "SaaS pricing models",
    prompt:
      "We're reworking pricing for a project-management SaaS. Give 15 creative pricing model concepts (tier structures, usage-based, add-ons) and note pros/cons for SMB target market.",
  },
  {
    label: "Workshop topics for professionals",
    prompt:
      "I'm a leadership coach building a paid online workshop series. Recommend 20 workshop titles (with 2-sentence blurbs) that address common mid-level manager pain points.",
  },
];

// Row 2 – New venture / side-hustle inspiration
export const row2Prompts: ExamplePrompt[] = [
  {
    label: "College-student businesses with no capital",
    prompt:
      "I'm a college student with almost zero starting capital (<$100) and limited free time. List 25 realistic business ideas I could start on campus or online to earn $1k/month within 6 months.",
  },
  {
    label: "Side hustles for developers",
    prompt:
      "I'm a full-time software developer seeking a technical side hustle that might scale. Provide 20 ideas with estimated build time, revenue potential and initial customer-acquisition channels.",
  },
  {
    label: "Solutions to reduce food waste",
    prompt:
      "Our city council wants initiatives to cut restaurant food waste by 50%. Brainstorm 15 innovative solutions (products, services, campaigns) including potential stakeholders and ROI.",
  },
  {
    label: "Remote-team gift ideas",
    prompt:
      "I oversee employee engagement and need gift ideas for 60 remote teammates worldwide. Produce a list of 30 thoughtful gifts (<$50 each) that ship globally and feel personal.",
  },
  {
    label: "Improve customer onboarding",
    prompt:
      "Our SaaS free-trial to paid conversion is 5%. Suggest 20 improvements to the onboarding experience (product, emails, in-app flows) that could double conversions.",
  },
  {
    label: "Networking for introverts",
    prompt:
      "I'm an introverted product manager moving to a new city. Provide 15 low-stress networking strategies or events to build a professional network within 3 months.",
  },
  {
    label: "Instagram content pillars",
    prompt:
      "I manage social for a boutique coffee brand. Define 12 engaging content pillars (with example post ideas) to grow followers and showcase our sustainability story.",
  },
  {
    label: "Employee-recognition programs",
    prompt:
      "Design 20 creative, inclusive employee-recognition program ideas for a 200-person hybrid company, balancing public praise and private rewards.",
  },
  {
    label: "Partnership opportunities",
    prompt:
      "We sell eco-friendly cleaning products online. List 15 strategic partnership or collaboration ideas (with potential brands/influencers) that could expand our reach.",
  },
  {
    label: "Trade-show booth concepts",
    prompt:
      "We're exhibiting at CES with a small budget. Propose 10 eye-catching booth design concepts and engagement tactics to drive foot traffic and press coverage.",
  },
  {
    label: "Gather customer feedback",
    prompt:
      "Our mobile game has 50k DAU but low reviews. Suggest 15 creative ways to collect high-quality user feedback and testimonials without annoying players.",
  },
  {
    label: "Referral program ideas",
    prompt:
      "We run a meal-prep subscription. Draft 12 referral program structures (incentives, mechanics) optimized for social sharing and profitability.",
  },
  {
    label: "Community-building strategies",
    prompt:
      "I'm launching a niche online community for indie hackers. List 20 tactics to seed engagement and achieve 1k active members in 90 days.",
  },
  {
    label: "Crisis-management approaches",
    prompt:
      "Our brand faced negative press over a data leak. Provide a 10-step crisis-management communication plan, including messaging templates and stakeholder timelines.",
  },
];

// Row 3 – Operational & strategic improvements
export const row3Prompts: ExamplePrompt[] = [
  {
    label: "Improve team productivity",
    prompt:
      "Our 15-person remote engineering team misses sprint goals 40% of the time. Give 20 actionable changes (process, tooling, rituals) to boost productivity and morale.",
  },
  {
    label: "Reduce customer churn",
    prompt:
      "We have 8% monthly churn for our B2B analytics SaaS. Suggest 20 initiatives (product, CS, pricing) ranked by expected impact to reach 3% churn in 6 months.",
  },
  {
    label: "Fundraising ideas for nonprofits",
    prompt:
      "A small animal-rescue nonprofit needs to raise $100k this year. Provide 25 creative fundraising campaign ideas and channels with estimated effort vs. return.",
  },
  {
    label: "Hybrid-office space designs",
    prompt:
      "We're redesigning HQ for hybrid work. List 15 innovative space configurations and amenities that encourage collaboration when employees choose to come in.",
  },
  {
    label: "Value propositions for B2B services",
    prompt:
      "I'm launching a contract bookkeeping service for Shopify stores. Craft 12 compelling value-proposition statements highlighting pain-relief and ROI.",
  },
  {
    label: "Employee training approaches",
    prompt:
      "We want to upskill 40 customer-support agents in AI tools. Propose a 3-month training program (modules, resources, metrics) with engaging formats.",
  },
  {
    label: "Showcase company culture",
    prompt:
      "Our LinkedIn page feels bland. Brainstorm 20 post series or initiatives that authentically highlight company culture to attract top talent.",
  },
  {
    label: "Sustainability initiatives",
    prompt:
      "A 500-unit apartment complex aims to be carbon neutral. Provide 15 initiatives (tech, behavior change, partnerships) with cost/benefit estimates.",
  },
  {
    label: "Improve customer experience",
    prompt:
      "We operate a chain of coffee shops. List 20 ways (digital & in-store) to elevate customer experience and increase repeat visits.",
  },
  {
    label: "Competitive analysis methods",
    prompt:
      "As a product marketer at a fintech startup, outline 12 structured methods to gather and synthesize competitive intelligence quarterly.",
  },
  {
    label: "Product positioning strategies",
    prompt:
      "We're repositioning an email automation tool towards e-commerce brands. Suggest 15 positioning angles with proof points and taglines.",
  },
  {
    label: "Scale customer support",
    prompt:
      "Our user base will triple next year. Recommend 15 scalable support solutions (processes, tools, outsourcing) to maintain CSAT > 90%.",
  },
  {
    label: "Work-life balance solutions",
    prompt:
      "Our startup culture encourages overtime. Suggest 20 policy and culture changes to improve work-life balance without hurting output.",
  },
  {
    label: "Vendor-management improvements",
    prompt:
      "We manage 50 software vendors. Provide 12 best practices and tools to optimize vendor selection, evaluation and cost control.",
  },
]; 
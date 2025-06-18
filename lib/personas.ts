// Define real people with diverse intellectual perspectives
const personas = [
  // AI, Science, and Technology
  {
    name: "Geoffrey Hinton",
    thinkingTechnique: "Biological plausibility testing - constantly asks 'could the brain actually do this?' and designs solutions that mirror natural mechanisms rather than just optimizing performance metrics."
  },
  {
    name: "Demis Hassabis",
    thinkingTechnique: "Cross-domain pattern mapping - systematically identifies successful patterns from one field, then tests if they apply to the current problem domain."
  },
  {
    name: "Sara Walker",
    thinkingTechnique: "Assembly pathway analysis - breaks down complex phenomena into their constituent information-processing steps and maps the causal chains that generate emergent properties."
  },
  {
    name: "Judea Pearl",
    thinkingTechnique: "Causal ladder climbing - systematically moves from correlation (seeing) to intervention (doing) to counterfactual reasoning (imagining) to understand true cause-and-effect relationships."
  },
  {
    name: "Latanya Sweeney",
    thinkingTechnique: "Adversarial thinking - proactively imagines how systems could be misused by thinking like an adversary, then designs defenses against those specific attack vectors."
  },
  {
    name: "George Church",
    thinkingTechnique: "Information-biology bridging - treats biological and digital systems as equivalent information processors, enabling cross-pollination of solutions between domains."
  },
  {
    name: "Carlo Rovelli",
    thinkingTechnique: "Foundational assumption questioning - systematically challenges the most basic assumptions underlying a problem to reveal hidden constraints and new solution spaces."
  },
  {
    name: "Neri Oxman",
    thinkingTechnique: "Growth-based design - asks 'how would nature grow this solution?' instead of 'how would we assemble it?' to find more adaptive and efficient approaches."
  },
  // Psychology, Economics, and Social Science
  {
    name: "Daniel Kahneman",
    thinkingTechnique: "Bias pre-mortem - systematically identifies cognitive biases that could derail decision-making, then designs choice architectures that account for predictable irrationality."
  },
  {
    name: "Kate Raworth",
    thinkingTechnique: "Boundary condition mapping - identifies the upper and lower limits within which solutions must operate, then optimizes for thriving within those constraints."
  },
  {
    name: "Safiya Noble",
    thinkingTechnique: "Algorithmic archaeology - examines the hidden assumptions and biases embedded in automated systems by tracing their historical and cultural origins."
  },
  {
    name: "Jane McGonigal",
    thinkingTechnique: "Gamification psychology - applies game design principles (clear goals, immediate feedback, voluntary participation) to make difficult challenges engaging and achievable."
  },
  // Design, Art, and Communication
  {
    name: "Paola Antonelli",
    thinkingTechnique: "Cultural crystallization - views objects and systems as crystallized expressions of cultural values, then designs for desired cultural evolution."
  },
  {
    name: "Stewart Brand",
    thinkingTechnique: "Deep time thinking - evaluates solutions across multiple time scales (years, decades, centuries) to identify approaches that remain robust over time."
  },
  {
    name: "Kim Stanley Robinson",
    thinkingTechnique: "Co-evolutionary modeling - systematically maps how technology, ecology, and society influence each other over time to predict unintended consequences."
  },
  {
    name: "Ed Yong",
    thinkingTechnique: "Perspective shifting - systematically adopts different viewpoints (different species, scales, timeframes) to reveal hidden connections and overlooked solutions."
  },
  // Law, Policy, and Activism
  {
    name: "Mary Nichols",
    thinkingTechnique: "Incentive alignment engineering - designs regulatory mechanisms that make desired behaviors economically advantageous rather than mandating compliance."
  },
  // Indigenous, Ecological, and Alternative Knowledge
  {
    name: "Robin Wall Kimmerer",
    thinkingTechnique: "Reciprocity modeling - asks 'what does this system need from me?' instead of 'what can I get from this system?' to design mutually beneficial relationships."
  },

  // --- NEW & UNIQUE PERSPECTIVES BELOW ---

  // Philosophy, Ethics, and Radical Thought
  {
    name: "Judith Butler",
    thinkingTechnique: "Performativity analysis - examines how repeated actions create the reality they appear to describe, revealing opportunities to change systems by changing practices."
  },
  {
    name: "Byung-Chul Han",
    thinkingTechnique: "Hidden cost accounting - systematically identifies the psychological, social, and spiritual costs of systems that appear efficient or beneficial on the surface."
  },
  // Radical Technology and Hacking
  {
    name: "Bunnie Huang",
    thinkingTechnique: "Reverse engineering mindset - systematically takes apart existing solutions to understand their principles, then recombines those principles in novel ways."
  },
  // Disability and Accessibility
  {
    name: "Alice Wong",
    thinkingTechnique: "Universal design thinking - designs for the most constrained users first, knowing that solutions that work for them will work better for everyone."
  },
  // Urbanism and Infrastructure
  {
    name: "Janette Sadik-Khan",
    thinkingTechnique: "Rapid prototyping with paint - tests solutions quickly and cheaply with temporary implementations before committing to permanent changes."
  },
  // Conflict, Security, and Resilience
  {
    name: "Vannevar Bush",
    thinkingTechnique: "Knowledge network design - systematically maps how information flows between people and systems, then designs infrastructure to accelerate discovery."
  },
  // Spirituality and Contemplative Practice
  {
    name: "Thich Nhat Hanh",
    thinkingTechnique: "Present moment anchoring - returns attention to immediate sensory experience when overwhelmed, creating space for clarity and compassionate response."
  },
  // Humor and Satire
  {
    name: "John Cleese",
    thinkingTechnique: "Absurdity injection - deliberately introduces silly or impossible elements to break rigid thinking patterns and reveal new possibilities."
  },
  // Youth and Intergenerational Wisdom
  {
    name: "Greta Thunberg",
    thinkingTechnique: "Moral clarity cutting - strips away complexity and compromise to focus on the core ethical issue, creating urgency and clear action steps."
  },
  // Nonhuman and Animal Perspectives
  {
    name: "Temple Grandin",
    thinkingTechnique: "Visual thinking - converts abstract problems into concrete visual scenarios, revealing practical solutions that verbal analysis might miss."
  },
  // Economics and Radical Markets
  {
    name: "Glen Weyl",
    thinkingTechnique: "Mechanism design - creates rules and incentive structures that harness self-interest to produce collectively beneficial outcomes."
  },
  // Open Source and Decentralization
  {
    name: "Vitalik Buterin",
    thinkingTechnique: "Cryptoeconomic modeling - designs systems where mathematical proofs and economic incentives replace the need for trusted authorities."
  },
  // Speculative Design and Afrofuturism
  {
    name: "Nnedi Okorafor",
    thinkingTechnique: "Cultural root speculation - imagines futures by extrapolating from non-Western cultural values and knowledge systems rather than current Western trends."
  },
  // Data Visualization and Information Design
  {
    name: "Edward Tufte",
    thinkingTechnique: "Information density optimization - maximizes the ratio of meaningful information to visual elements, eliminating everything that doesn't serve understanding."
  },
  // Cognitive Science and Embodiment
  {
    name: "Andy Clark",
    thinkingTechnique: "Extended cognition mapping - identifies how thinking extends beyond the brain into tools, environment, and social networks, then optimizes the entire system."
  },
  // Indigenous Futurism
  {
    name: "Grace Dillon",
    thinkingTechnique: "Ancestral future bridging - connects traditional knowledge with speculative possibilities, using ancient wisdom to imagine radically different futures."
  },
  // Social Entrepreneurship and Frugal Innovation
  {
    name: "Navi Radjou",
    thinkingTechnique: "Resource constraint creativity - deliberately limits available resources to force more creative, efficient, and accessible solutions."
  },
  // Play, Childhood, and Learning
  {
    name: "Sugata Mitra",
    thinkingTechnique: "Self-organization facilitation - creates minimal structure and maximum curiosity, allowing solutions to emerge through exploration rather than instruction."
  },
  // Systems Thinking and Complexity
  {
    name: "Donella Meadows",
    thinkingTechnique: "Leverage point identification - systematically identifies the places within complex systems where small changes can produce big impacts."
  },
  // Food Sovereignty and Agroecology
  {
    name: "Vandana Shiva",
    thinkingTechnique: "Seed thinking - focuses on preserving and nurturing the generative potential within systems rather than just optimizing current outputs."
  },
  // Linguistics and Communication
  {
    name: "Deborah Tannen",
    thinkingTechnique: "Conversational style analysis - systematically examines how different communication patterns create misunderstanding, then designs for better alignment."
  },
  // Music, Sound, and Sonic Environments
  {
    name: "Brian Eno",
    thinkingTechnique: "Generative constraint setting - creates simple rules that produce complex, evolving outcomes, allowing solutions to emerge through iteration."
  },
  // Migration, Borders, and Mobility
  {
    name: "Saskia Sassen",
    thinkingTechnique: "Flow network analysis - maps how people, resources, and information move through systems to identify bottlenecks and opportunities for intervention."
  },
  // Memory, Trauma, and Healing
  {
    name: "Bessel van der Kolk",
    thinkingTechnique: "Embodied integration - addresses problems by engaging body, mind, and social connection simultaneously rather than treating them separately."
  },
  // Ethics of Technology and Existential Risk
  {
    name: "Nick Bostrom",
    thinkingTechnique: "Long-term consequence modeling - systematically considers how current decisions might play out over decades or centuries, especially worst-case scenarios."
  },
  // Humor, Internet Culture, and Memetics
  {
    name: "Ken M",
    thinkingTechnique: "Internet humorist known for subversive, wholesome trolling. Thinks about the power of play, absurdity, and community in online spaces."
  },
  // Neurodiversity and Cognitive Difference
  {
    name: "Judy Singer",
    thinkingTechnique: "Sociologist who coined the term 'neurodiversity.' Thinks about the value of cognitive difference and designing for a spectrum of minds."
  },
  // Citizen Science and Participatory Research
  {
    name: "Caren Cooper",
    thinkingTechnique: "Ecologist and leader in citizen science. Thinks about democratizing research, public engagement, and the wisdom of crowds."
  },
  // Transhumanism and Human Enhancement
  {
    name: "Natasha Vita-More",
    thinkingTechnique: "Transhumanist philosopher and artist. Thinks about human enhancement, longevity, and the ethics of redesigning the human condition."
  },
  // Comedy and Social Critique
  {
    name: "Hannah Gadsby",
    thinkingTechnique: "Comedian and writer who uses personal narrative to challenge norms. Thinks about vulnerability, storytelling, and the power of reframing pain."
  },
  // Digital Minimalism and Attention
  {
    name: "Cal Newport",
    thinkingTechnique: "Computer science professor and author of 'Deep Work.' Thinks about focus, digital minimalism, and the value of undistracted attention."
  },
  // Science Policy and Diplomacy
  {
    name: "Nina Fedoroff",
    thinkingTechnique: "Molecular biologist and science diplomat. Thinks about the intersection of science, policy, and international collaboration."
  },
  // Environmental Philosophy and Deep Ecology
  {
    name: "Arne Naess",
   thinkingTechnique: "Philosopher who founded deep ecology. Thinks about intrinsic value of nature, ecological self, and radical environmentalism."
  },
  // Social Media and Digital Culture
  {
    name: "danah boyd",
    thinkingTechnique: "Researcher of youth, social media, and privacy. Thinks about networked publics, online identity, and the unintended consequences of digital platforms."
  },
  // Science Fiction and Worldbuilding
  {
    name: "Octavia E. Butler",
    thinkingTechnique: "Science fiction author who explored race, gender, and power through speculative worlds. Thinks about adaptation, resilience, and the transformative power of story."
  },
  // Architecture and Adaptive Environments
  {
    name: "Alejandro Aravena",
    thinkingTechnique: "Architect known for participatory design and social housing. Thinks about architecture as a process, not just a product, and the value of incremental, user-driven change."
  },
  // More can be added as needed for even greater diversity!
] as const;

export default personas;
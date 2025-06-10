// Define real people with diverse intellectual perspectives
const personas = [
  // AI, Science, and Technology
  {
    name: "Geoffrey Hinton",
    perspective: "The 'Godfather of Deep Learning' who thinks about intelligence from first principles. Approaches problems by understanding how neural networks can capture the essence of cognition. Questions fundamental assumptions about how learning works."
  },
  {
    name: "Demis Hassabis",
    perspective: "DeepMind CEO who combines neuroscience, AI, and games to crack intelligence. Approaches problems by finding the right representations and learning algorithms. Thinks in terms of general intelligence principles."
  },
  {
    name: "Sara Walker",
    perspective: "Astrobiologist and theoretical physicist studying the origin of life and information in complex systems. Thinks about problems in terms of information flows, assembly theory, and the physics of life."
  },
  {
    name: "Judea Pearl",
    perspective: "Computer scientist who revolutionized causal reasoning. Thinks in terms of causal diagrams, counterfactuals, and the ladder of causation. Designs systems that can answer 'why' and 'what if' questions."
  },
  {
    name: "Latanya Sweeney",
    perspective: "Computer scientist who pioneered data privacy. Thinks about technology's societal impacts, algorithmic bias, and how to build systems that protect human dignity while enabling innovation."
  },
  {
    name: "Timnit Gebru",
    perspective: "AI researcher focused on ethical AI and algorithmic accountability. Thinks about power dynamics in tech, dataset documentation, and how to build AI that serves marginalized communities."
  },
  {
    name: "George Church",
    perspective: "Geneticist pushing the boundaries of synthetic biology. Thinks about engineering life itself - from resurrecting woolly mammoths to encoding data in DNA. Approaches problems at the intersection of information and biology."
  },
  {
    name: "Carlo Rovelli",
    perspective: "Theoretical physicist who developed loop quantum gravity. Thinks about the fundamental nature of time, space, and information. Approaches problems by questioning our most basic assumptions about reality."
  },
  {
    name: "Neri Oxman",
    perspective: "MIT professor who pioneered Material Ecology - combining design, biology, computing and materials engineering. Thinks about growing solutions rather than assembling them. Sees the built environment as a living system."
  },
  // Psychology, Economics, and Social Science
  {
    name: "Daniel Kahneman",
    perspective: "Nobel laureate psychologist who revealed how human judgment systematically deviates from rationality. Designs solutions that account for cognitive biases, System 1 vs System 2 thinking, and the architecture of choice."
  },
  {
    name: "Kate Raworth",
    perspective: "Renegade economist who created Doughnut Economics. Thinks beyond GDP growth to regenerative and distributive systems. Designs for thriving within planetary boundaries while meeting human needs."
  },
  {
    name: "Raj Patel",
    perspective: "Political economist studying food systems and social movements. Thinks about power structures, commons management, and how to democratize resources. Combines activism with rigorous analysis."
  },
  {
    name: "Safiya Noble",
    perspective: "Information scientist studying algorithmic oppression. Thinks about how search engines and AI systems encode and amplify social biases. Designs for justice and equity in technological systems."
  },
  {
    name: "Jane McGonigal",
    perspective: "Game designer and futurist who uses games to solve real problems and build resilience. Thinks about motivation, collective intelligence, and how to make difficult challenges engaging and winnable."
  },
  // Design, Art, and Communication
  {
    name: "Paola Antonelli",
    perspective: "MoMA's Senior Curator of Design. Thinks about design as a bridge between revolutions and everyday life. Sees objects as crystallized culture and designs for species-level adaptation."
  },
  {
    name: "Stewart Brand",
    perspective: "Creator of the Whole Earth Catalog and Long Now Foundation. Thinks in terms of tools for tools, deep time, and civilization-scale challenges. Master of connecting counterculture with technology."
  },
  {
    name: "Kim Stanley Robinson",
    perspective: "Science fiction author who imagines detailed alternative futures. Combines hard science with social systems thinking. Excels at envisioning how technology, ecology, and society co-evolve over time."
  },
  {
    name: "Ed Yong",
    perspective: "Science journalist who reveals hidden biological worlds. Excels at seeing connections others miss and communicating complex ideas. Thinks about how different organisms perceive and navigate reality."
  },
  // Law, Policy, and Activism
  {
    name: "Mary Nichols",
    perspective: "Environmental lawyer who architected California's climate policies. Thinks in terms of regulatory innovation, market mechanisms, and how to align incentives for systemic change at scale."
  },
  // Indigenous, Ecological, and Alternative Knowledge
  {
    name: "Robin Wall Kimmerer",
    perspective: "Botanist and indigenous knowledge keeper. Integrates scientific and traditional ecological knowledge. Thinks in terms of reciprocity, plant intelligence, and the grammar of animacy."
  },

  // --- NEW & UNIQUE PERSPECTIVES BELOW ---

  // Philosophy, Ethics, and Radical Thought
  {
    name: "Judith Butler",
    perspective: "Philosopher who explores gender performativity and the social construction of identity. Thinks about how language, power, and norms shape what is possible. Designs for inclusivity and the deconstruction of binaries."
  },
  {
    name: "Cornel West",
    perspective: "Philosopher and public intellectual who centers justice, love, and democracy. Approaches problems by interrogating structures of power and advocating for radical empathy and solidarity."
  },
  {
    name: "Byung-Chul Han",
    perspective: "Philosopher who critiques digital culture, burnout society, and the commodification of attention. Thinks about the psychological and societal costs of hyper-transparency and constant connectivity."
  },
  // Radical Technology and Hacking
  {
    name: "Bunnie Huang",
    perspective: "Hardware hacker and open-source advocate. Thinks about technology as something to be remixed, reverse-engineered, and democratized. Designs for transparency, repairability, and user empowerment."
  },
  // Disability and Accessibility
  {
    name: "Alice Wong",
    perspective: "Disability activist and founder of the Disability Visibility Project. Thinks about access, representation, and the value of disabled perspectives in design and policy."
  },
  // Urbanism and Infrastructure
  {
    name: "Janette Sadik-Khan",
    perspective: "Urban transportation innovator who transformed New York City streets. Thinks about reclaiming public space, human-centered infrastructure, and rapid prototyping in city design."
  },
  // Conflict, Security, and Resilience
  {
    name: "Vannevar Bush",
    perspective: "Engineer and science administrator who envisioned the Memex and postwar innovation systems. Thinks about knowledge networks, interdisciplinary collaboration, and the infrastructure of discovery."
  },
  // Spirituality and Contemplative Practice
  {
    name: "Thich Nhat Hanh",
    perspective: "Zen master and peace activist who teaches mindfulness and engaged Buddhism. Approaches problems by cultivating presence, compassion, and interbeing."
  },
  // Humor and Satire
  {
    name: "John Cleese",
    perspective: "Comedian and writer who uses absurdity and satire to challenge conventions. Thinks about creativity as play, and the value of humor in problem-solving."
  },
  // Youth and Intergenerational Wisdom
  {
    name: "Greta Thunberg",
    perspective: "Climate activist who mobilizes youth for urgent action. Thinks in terms of intergenerational justice, moral clarity, and the power of collective voice."
  },
  // Nonhuman and Animal Perspectives
  {
    name: "Temple Grandin",
    perspective: "Animal behaviorist and autism advocate. Thinks in pictures, designs for animal welfare, and brings neurodiverse perspectives to problem-solving."
  },
  // Economics and Radical Markets
  {
    name: "Glen Weyl",
    perspective: "Economist and co-author of 'Radical Markets.' Thinks about reimagining property, voting, and data ownership to create more dynamic and equitable systems."
  },
  // Open Source and Decentralization
  {
    name: "Vitalik Buterin",
    perspective: "Ethereum co-founder and advocate for decentralized systems. Thinks about programmable trust, cryptoeconomics, and the social layer of technology."
  },
  // Feminist Science and Technology
  {
    name: "Ruha Benjamin",
    perspective: "Sociologist who studies the social dimensions of science, medicine, and technology. Thinks about how innovation can reinforce or disrupt racial and gender hierarchies."
  },
  // Speculative Design and Afrofuturism
  {
    name: "Nnedi Okorafor",
    perspective: "Science fiction author and Afrofuturist. Imagines futures rooted in African cultures, blending technology, myth, and social critique."
  },
  // Environmental Justice and Community Organizing
  {
    name: "Majora Carter",
    perspective: "Urban revitalization strategist and environmental justice advocate. Thinks about community-led development, green jobs, and the intersection of ecology and equity."
  },
  // Data Visualization and Information Design
  {
    name: "Edward Tufte",
    perspective: "Pioneer of data visualization. Thinks about clarity, integrity, and the art of making complex information accessible and beautiful."
  },
  // Cognitive Science and Embodiment
  {
    name: "Andy Clark",
    perspective: "Philosopher and cognitive scientist who developed the theory of the extended mind. Thinks about cognition as distributed across brain, body, and environment."
  },
  // Indigenous Futurism
  {
    name: "Grace Dillon",
    perspective: "Scholar of Indigenous futurisms. Thinks about how Native perspectives can reimagine technology, storytelling, and ecological relationships."
  },
  // Social Entrepreneurship and Frugal Innovation
  {
    name: "Navi Radjou",
    perspective: "Innovation advisor who champions frugal innovation (Jugaad). Thinks about doing more with less, resourcefulness, and bottom-up solutions."
  },
  // Play, Childhood, and Learning
  {
    name: "Sugata Mitra",
    perspective: "Education researcher known for the 'Hole in the Wall' experiment. Thinks about self-organized learning, curiosity-driven exploration, and the power of play."
  },
  // Systems Thinking and Complexity
  {
    name: "Donella Meadows",
    perspective: "Environmental scientist and systems thinker. Thinks about leverage points, feedback loops, and how to intervene in complex systems for lasting change."
  },
  // Queer Theory and Liberation
  {
    name: "José Esteban Muñoz",
    perspective: "Queer theorist who explores utopia, performance, and the politics of hope. Thinks about how marginalized communities imagine and enact alternative futures."
  },
  // Prison Abolition and Transformative Justice
  {
    name: "Ruth Wilson Gilmore",
    perspective: "Geographer and prison abolitionist. Thinks about carceral systems, racial capitalism, and building infrastructures of care and liberation."
  },
  // Food Sovereignty and Agroecology
  {
    name: "Vandana Shiva",
    perspective: "Physicist and environmental activist. Thinks about seed sovereignty, agroecology, and the rights of nature."
  },
  // Linguistics and Communication
  {
    name: "Deborah Tannen",
    perspective: "Linguist who studies how conversational style shapes relationships. Thinks about miscommunication, gendered language, and the power of framing."
  },
  // Music, Sound, and Sonic Environments
  {
    name: "Brian Eno",
    perspective: "Musician and producer who pioneered ambient music and generative art. Thinks about creativity as emergence, and the design of environments for serendipity."
  },
  // Migration, Borders, and Mobility
  {
    name: "Saskia Sassen",
    perspective: "Sociologist who studies globalization, migration, and urban spaces. Thinks about how borders, flows, and networks shape opportunity and exclusion."
  },
  // Memory, Trauma, and Healing
  {
    name: "Bessel van der Kolk",
    perspective: "Psychiatrist and trauma researcher. Thinks about the embodied nature of memory, and how healing requires integrating mind, body, and community."
  },
  // Ethics of Technology and Existential Risk
  {
    name: "Nick Bostrom",
    perspective: "Philosopher who studies superintelligence and existential risk. Thinks about long-term futures, precaution, and the ethics of transformative technologies."
  },
  // Humor, Internet Culture, and Memetics
  {
    name: "Ken M",
    perspective: "Internet humorist known for subversive, wholesome trolling. Thinks about the power of play, absurdity, and community in online spaces."
  },
  // Neurodiversity and Cognitive Difference
  {
    name: "Judy Singer",
    perspective: "Sociologist who coined the term 'neurodiversity.' Thinks about the value of cognitive difference and designing for a spectrum of minds."
  },
  // Citizen Science and Participatory Research
  {
    name: "Caren Cooper",
    perspective: "Ecologist and leader in citizen science. Thinks about democratizing research, public engagement, and the wisdom of crowds."
  },
  // Postcolonial Theory and Global South
  {
    name: "Gayatri Chakravorty Spivak",
    perspective: "Literary theorist and postcolonial scholar. Thinks about subaltern voices, epistemic justice, and the politics of translation."
  },
  // Transhumanism and Human Enhancement
  {
    name: "Natasha Vita-More",
    perspective: "Transhumanist philosopher and artist. Thinks about human enhancement, longevity, and the ethics of redesigning the human condition."
  },
  // Comedy and Social Critique
  {
    name: "Hannah Gadsby",
    perspective: "Comedian and writer who uses personal narrative to challenge norms. Thinks about vulnerability, storytelling, and the power of reframing pain."
  },
  // Digital Minimalism and Attention
  {
    name: "Cal Newport",
    perspective: "Computer science professor and author of 'Deep Work.' Thinks about focus, digital minimalism, and the value of undistracted attention."
  },
  // Science Policy and Diplomacy
  {
    name: "Nina Fedoroff",
    perspective: "Molecular biologist and science diplomat. Thinks about the intersection of science, policy, and international collaboration."
  },
  // Environmental Philosophy and Deep Ecology
  {
    name: "Arne Naess",
    perspective: "Philosopher who founded deep ecology. Thinks about intrinsic value of nature, ecological self, and radical environmentalism."
  },
  // Social Media and Digital Culture
  {
    name: "danah boyd",
    perspective: "Researcher of youth, social media, and privacy. Thinks about networked publics, online identity, and the unintended consequences of digital platforms."
  },
  // Science Fiction and Worldbuilding
  {
    name: "Octavia E. Butler",
    perspective: "Science fiction author who explored race, gender, and power through speculative worlds. Thinks about adaptation, resilience, and the transformative power of story."
  },
  // Architecture and Adaptive Environments
  {
    name: "Alejandro Aravena",
    perspective: "Architect known for participatory design and social housing. Thinks about architecture as a process, not just a product, and the value of incremental, user-driven change."
  },
  // More can be added as needed for even greater diversity!
] as const;

export default personas;
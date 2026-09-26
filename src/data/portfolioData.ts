export interface SkillItem {
  id: string;
  name: string;
  category: 'core' | 'web' | 'growth' | 'creative';
  level: number; // Percentage
  experience: string;
  description: string;
  tags: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  grade: string;
  status: 'In Progress' | 'Completed';
  highlights: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  institution: string;
  period: string;
  duration?: string;
  location: string;
  description: string;
  responsibilities: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  technologies: string[];
  features: string[];
  architecture?: string;
  demoUrl?: string;
  githubUrl?: string;
  highlights: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  iconName: string;
  shortDescription: string;
  deliverables: string[];
  idealFor: string;
}

export const PERSONAL_INFO = {
  name: "Talha Mahmood Afridi",
  shortName: "Talha Afridi",
  title: "Computer Science Student | Web Developer | Digital Creator",
  institution: "University of Engineering and Technology (UET), Peshawar",
  location: "Peshawar, Pakistan",
  phone: "03255691055",
  formattedPhone: "+92 325 5691055",
  email: "talhamahmood1055@gmail.com",
  tagline: "Computer Science Student & Digital Creator",
  bio: "I’m a passionate Computer Science student and digital creator focused on building modern websites, digital solutions and creative technology projects.",
  profileImage: "/src/assets/images/talha_afridi_profile.jpg",
  profileImageRemote: "https://i.postimg.cc/XqV9s4vX/IMG-20260926-WA0057.jpg",
  extendedBio: `I am currently pursuing my Bachelor of Science in Computer Science at the University of Engineering and Technology (UET) Peshawar. My journey in technology blends rigorous computer science fundamentals—such as algorithms, object-oriented programming, and relational database systems—with modern web engineering and digital marketing strategies.
  
With a solid foundation in teaching and instructional leadership across reputable institutions in Peshawar, I possess strong communication abilities, analytical problem-solving, and attention to detail. Whether designing modern responsive web applications, developing embedded logic systems, or optimizing search engine visibility, I strive to build reliable, high-impact digital solutions.`,
  socials: {
    whatsapp: "https://wa.me/923255691055",
    email: "mailto:talhamahmood1055@gmail.com",
    phone: "tel:03255691055",
    githubPlaceholder: "https://github.com/talhamahmood",
    linkedinPlaceholder: "https://linkedin.com/in/talhamahmoodafridi"
  }
};

export const SKILLS_DATA: SkillItem[] = [
  {
    id: "html",
    name: "HTML",
    category: "web",
    level: 95,
    experience: "Semantic Web & Accessibility",
    description: "Semantic markup, modern HTML5 standards, SEO metadata structures, and accessible DOM architecture.",
    tags: ["HTML5", "Semantic DOM", "WCAG", "SEO Meta"]
  },
  {
    id: "css",
    name: "CSS",
    category: "web",
    level: 90,
    experience: "Responsive Design & Modern Frameworks",
    description: "Responsive layouts, Tailwind CSS, Flexbox/Grid, CSS custom properties, and smooth micro-interactions.",
    tags: ["Tailwind CSS", "Flexbox/Grid", "Responsive UI", "Animations"]
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "web",
    level: 88,
    experience: "ES6+, DOM Manipulation & Modern Frameworks",
    description: "Asynchronous programming, promises, modern ES6+ features, REST API integrations, and React state management.",
    tags: ["ES6+", "Asynchronous JS", "DOM API", "React Ecosystem"]
  },
  {
    id: "cpp",
    name: "C++",
    category: "core",
    level: 85,
    experience: "Algorithms & Low-Level Programming",
    description: "Core algorithms, data structures, pointer arithmetic, memory management, and computational logic at UET.",
    tags: ["Data Structures", "Algorithms", "STL", "Memory Mgmt"]
  },
  {
    id: "oop",
    name: "Object-Oriented Programming",
    category: "core",
    level: 88,
    experience: "Software Architecture & Design Principles",
    description: "Encapsulation, inheritance, polymorphism, abstraction, modular class designs, and clean code paradigms.",
    tags: ["Encapsulation", "Polymorphism", "Abstraction", "Design Patterns"]
  },
  {
    id: "db-management",
    name: "Database Management",
    category: "core",
    level: 84,
    experience: "Relational Modeling & Query Optimization",
    description: "Relational database design, ER modeling, normalization (1NF-BCNF), SQL queries, indexing, and data consistency.",
    tags: ["SQL", "Relational Design", "Normalization", "CRUD Systems"]
  },
  {
    id: "seo",
    name: "SEO",
    category: "growth",
    level: 86,
    experience: "On-Page, Technical & Content Optimization",
    description: "Search engine optimization, keyword research, Core Web Vitals, OpenGraph cards, structured data, and search rankings.",
    tags: ["Technical SEO", "Keywords", "Schema.org", "PageSpeed"]
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    category: "growth",
    level: 82,
    experience: "Online Growth & Brand Visibility",
    description: "Digital presence development, social media strategy, lead generation, audience targeting, and content creation.",
    tags: ["Content Strategy", "Social Media", "Audience Growth", "Campaigns"]
  },
  {
    id: "data-entry",
    name: "Data Entry",
    category: "growth",
    level: 95,
    experience: "Accuracy, Speed & Data Organization",
    description: "Fast typing accuracy, structured data management, spreadsheet processing, validation checks, and organized reporting.",
    tags: ["Spreadsheets", "Data Hygiene", "Verification", "Accuracy"]
  },
  {
    id: "ai-robotics",
    name: "AI & Robotics",
    category: "core",
    level: 80,
    experience: "Microcontrollers & Applied AI",
    description: "Digital logic circuits, Arduino microcontrollers, hardware sensor integration, and modern AI automation concepts.",
    tags: ["Arduino", "Sensors", "Digital Logic", "Applied AI"]
  },
  {
    id: "leadership",
    name: "Leadership",
    category: "creative",
    level: 92,
    experience: "Classroom Instruction & Team Guidance",
    description: "Proven through 4+ years of instructional roles; strong classroom management, clear articulation, and mentorship.",
    tags: ["Pedagogy", "Mentorship", "Public Speaking", "Team Coordination"]
  },
  {
    id: "calligraphy",
    name: "Calligraphy",
    category: "creative",
    level: 90,
    experience: "Artistic Lettering & Visual Precision",
    description: "Traditional and creative lettering, aesthetic proportion, penmanship discipline, taught in English language centers.",
    tags: ["Penmanship", "Lettering Arts", "Visual Harmony", "Precision"]
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "uet-bscs",
    degree: "BS Computer Science",
    institution: "University of Engineering and Technology (UET), Peshawar",
    location: "Peshawar, Pakistan",
    period: "2023 – Present",
    grade: "Currently Studying",
    status: "In Progress",
    highlights: [
      "Rigorous core curriculum in Algorithms, Data Structures, OOP, and Database Systems",
      "Hands-on laboratory work in Digital Logic, Arduino Microcontrollers, and Software Engineering",
      "Active participant in technical student seminars and programming assignments"
    ]
  },
  {
    id: "mec-fsc",
    degree: "FSc / Intermediate (Pre-Engineering / CS)",
    institution: "Muslim Education Complex, Peshawar",
    location: "Peshawar, Pakistan",
    period: "2020 – 2022",
    grade: "Grade A+ (Distinction)",
    status: "Completed",
    highlights: [
      "Exceptional academic standing with Grade A+",
      "Strong foundation in Mathematics, Physics, and Analytical Thinking",
      "Demonstrated academic excellence and disciplined study habits"
    ]
  },
  {
    id: "mc-matric",
    degree: "Matriculation (Science)",
    institution: "Muslim College, Peshawar",
    location: "Peshawar, Pakistan",
    period: "2018 – 2020",
    grade: "Grade A+",
    status: "Completed",
    highlights: [
      "Secured outstanding Grade A+ across all core science subjects",
      "Solid groundwork in Computer Science fundamentals and Mathematics",
      "Recognized for academic dedication and leadership"
    ]
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "happy-day",
    role: "Teacher",
    institution: "Happy Day School",
    period: "2025",
    location: "Peshawar, Pakistan",
    description: "Provided comprehensive academic teaching and individualized student support, cultivating positive learning environments.",
    responsibilities: [
      "Delivered structured academic lessons and individual student support",
      "Assessed learning milestones and fostered critical thinking among pupils",
      "Coordinated with faculty administration to maintain high educational standards"
    ]
  },
  {
    id: "allied-school",
    role: "Teacher",
    institution: "Allied School Gulberg Campus",
    period: "2024",
    location: "Peshawar, Pakistan",
    description: "Conducted board preparation classes and core academic teaching for secondary grades (Classes 8, 9, and 10).",
    responsibilities: [
      "Prepared students rigorously for Khyber Pakhtunkhwa board examinations",
      "Designed practice worksheets, revision schedules, and conceptual evaluations",
      "Mentored senior students in analytical problem solving and exam techniques"
    ]
  },
  {
    id: "united-english",
    role: "Instructor",
    institution: "United English Language Centre",
    period: "2022",
    location: "Peshawar, Pakistan",
    description: "Taught English language fluency, artistic calligraphy workshops, presentation speaking, and board-exam preparation.",
    responsibilities: [
      "Conducted specialized calligraphy and penmanship development sessions",
      "Guided learners through public speaking, presentation delivery, and speech confidence",
      "Organized curriculum modules for board exam verbal and written communication"
    ]
  },
  {
    id: "muslim-college-teaching",
    role: "Teacher",
    institution: "Muslim College",
    period: "2020",
    location: "Peshawar, Pakistan",
    description: "Taught general sciences and foundational subjects to classes 7 and 8 with emphasis on conceptual clarity.",
    responsibilities: [
      "Formulated daily interactive lesson plans for middle school classes",
      "Evaluated homework, quizzes, and facilitated remedial tutoring sessions",
      "Built positive student engagement through structured classroom communication"
    ]
  },
  {
    id: "iqra-tuition",
    role: "Teacher",
    institution: "Iqra Tuition Center",
    period: "Academic Support",
    duration: "6 Months",
    location: "Peshawar, Pakistan",
    description: "Provided targeted academic support and concept reinforcement for grades 8, 9, and 10 students.",
    responsibilities: [
      "Delivered one-on-one and small group revision lectures for secondary board students",
      "Clarified difficult concepts in mathematics and science subjects",
      "Tracked student progress with regular mock assessments and feedback"
    ]
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "personal-portfolio",
    title: "Personal Developer Portfolio",
    category: "Web Development",
    shortDescription: "A high-performance personal portfolio built with React 19, TypeScript, and modern Tailwind CSS showcasing projects, skills, and interactive resume viewer.",
    fullDescription: "A modern developer portfolio designed with 2026 UI standards. Features dark-themed aesthetic, glassmorphic surfaces, interactive project modals, responsive navigation, dynamic contact form with vCard generation, and clean typography.",
    image: "/src/assets/images/hero_talha_portrait_1790402534032.jpg",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Motion", "Vite"],
    features: [
      "Custom responsive navigation with smooth scrollspy",
      "Dynamic interactive resume & printable CV viewer",
      "Validated contact form with WhatsApp direct action & vCard export",
      "Full accessibility and zero-broken image fallback system"
    ],
    architecture: "Component-driven React SPA built on Vite, styled with Tailwind CSS utility layers and motion physics.",
    demoUrl: "#home",
    githubUrl: "https://github.com/talhamahmood/portfolio-2026",
    highlights: ["100% Responsive", "Lightweight & Fast", "Accessible UI"]
  },
  {
    id: "library-system",
    title: "Library Management System",
    category: "Software & Database",
    shortDescription: "A database-driven cataloging and book circulation system with automated borrowing tracking, membership records, and fine calculation.",
    fullDescription: "Built to streamline physical book inventory and member borrowing logs for educational institutions. Incorporates strict relational schemas, search indexing by ISBN/author/genre, overdue notifications, and administrative reporting.",
    image: "/src/assets/images/project_library_system_1790402550538.jpg",
    technologies: ["C++", "SQL / Database", "OOP Architecture", "File I/O"],
    features: [
      "Complete CRUD operations for books, student records, and borrow receipts",
      "Algorithmic search and filtering by ISBN, author, and availability status",
      "Automated penalty and fine calculation for overdue items",
      "Structured data persistence with transactional integrity"
    ],
    architecture: "Object-oriented backend model utilizing C++ and relational database schema with normalized entity tables.",
    demoUrl: "#demo-library",
    githubUrl: "https://github.com/talhamahmood/library-management-system",
    highlights: ["Relational Integrity", "OOP Principles", "Fast Search"]
  },
  {
    id: "ecommerce-store",
    title: "E-Commerce / Online Store",
    category: "Web Development",
    shortDescription: "A modern online shopping storefront featuring categorized product catalogs, dynamic cart state management, checkout simulation, and responsive layout.",
    fullDescription: "Developed to demonstrate modern e-commerce user experiences. Includes live client-side category filtering, persistent shopping cart drawer, discount coupon handling, and an intuitive checkout flow with responsive mobile views.",
    image: "/src/assets/images/project_ecommerce_store_1790402563391.jpg",
    technologies: ["JavaScript", "HTML5", "CSS3 / Tailwind", "Local Storage API"],
    features: [
      "Interactive product grid with real-time category filtering and search",
      "Persistent cart state with item quantity controls and pricing breakdown",
      "Mobile-friendly sliding checkout modal with order confirmation",
      "High performance lazy loading and responsive imagery"
    ],
    architecture: "Client-side state architecture using modern JavaScript modular patterns and reactive DOM rendering.",
    demoUrl: "#demo-store",
    githubUrl: "https://github.com/talhamahmood/ecommerce-storefront",
    highlights: ["Interactive Cart", "Modern Checkout", "Responsive"]
  },
  {
    id: "arduino-digital-logic",
    title: "Digital Logic Arduino Project",
    category: "Robotics & Hardware",
    shortDescription: "An embedded systems project implementing combinational and sequential digital logic circuits on an Arduino microcontroller with sensors and actuators.",
    fullDescription: "Constructed as part of computer science hardware and digital logic exploration at UET Peshawar. Integrates breadboard logic gates, LED status arrays, ultrasonic and temperature sensors, and programmed microcontroller algorithms.",
    image: "/src/assets/images/project_arduino_circuit_1790402576027.jpg",
    technologies: ["Arduino C++", "Digital Logic", "Circuit Design", "Sensors"],
    features: [
      "Real-time sensor telemetry processing and threshold logic",
      "Integrated breadboard logic gate ICs with micro-controller GPIO pins",
      "Visual diagnostic output via 7-segment display and status LED indicators",
      "Optimized embedded C++ code with non-blocking timing routines"
    ],
    architecture: "Hardware-firmware interface with Arduino Uno microcontroller running synchronous sensor polling loops.",
    demoUrl: "#demo-arduino",
    githubUrl: "https://github.com/talhamahmood/arduino-digital-logic-lab",
    highlights: ["Hardware Prototyping", "C++ Firmware", "Embedded Logic"]
  },
  {
    id: "database-project",
    title: "Database Management Project",
    category: "Database & Backend",
    shortDescription: "A normalized relational database system for institutional record keeping, with complex multi-table joins, views, and data integrity constraints.",
    fullDescription: "Designed to solve multi-departmental data redundancy. Implements 3NF normalization, foreign key constraints, stored procedures, role-based view permissions, and optimized query plans for high-throughput reporting.",
    image: "/src/assets/images/project_library_system_1790402550538.jpg",
    technologies: ["SQL", "Relational Modeling", "ER Diagrams", "Normalization"],
    features: [
      "Normalized entity-relationship schemas ensuring zero data anomaly",
      "Complex SQL aggregation queries and indexing for query speedup",
      "Data validation triggers and referential integrity constraints",
      "Comprehensive reporting dashboard mockups for department heads"
    ],
    architecture: "Relational database schema with ANSI SQL query scripts and documented entity-relationship data dictionaries.",
    demoUrl: "#demo-db",
    githubUrl: "https://github.com/talhamahmood/institutional-dbms-design",
    highlights: ["3NF Schema", "Relational Integrity", "Optimized Queries"]
  },
  {
    id: "ai-technology-project",
    title: "AI & Technology Solution",
    category: "AI & Creative Tech",
    shortDescription: "An applied AI and automation solution exploring intelligent data processing, natural language query workflows, and modern web integration.",
    fullDescription: "Investigates practical applications of artificial intelligence and machine learning models for automating routine tasks. Demonstrates client-side logic synthesis, automated content categorization, and intuitive conversational UI patterns.",
    image: "/src/assets/images/project_ecommerce_store_1790402563391.jpg",
    technologies: ["AI Logic", "JavaScript", "REST APIs", "Modern UI"],
    features: [
      "Intelligent text classification and summary generation module",
      "Interactive prompt interface with latency-buffered response handling",
      "Modular API adapter ready for large language model integrations",
      "Clean visualization of inference inputs, tokens, and response accuracy"
    ],
    architecture: "Modern API wrapper integrating inference pipelines with client-side reactive interface.",
    demoUrl: "#demo-ai",
    githubUrl: "https://github.com/talhamahmood/ai-automation-pipeline",
    highlights: ["Applied AI", "Automated Workflows", "API Integration"]
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "web-development",
    title: "Web Development",
    iconName: "Code2",
    shortDescription: "Modern, responsive, and blazing-fast websites engineered for businesses and personal brands.",
    deliverables: [
      "Clean, maintainable HTML, CSS, JavaScript & React code",
      "Fully responsive layouts across mobile, tablet, and desktop",
      "Performance optimization, fast load times, and clean architecture",
      "Contact form and lead capture integration"
    ],
    idealFor: "Businesses, startups, and professionals seeking a standout web presence."
  },
  {
    id: "website-design",
    title: "Website Design",
    iconName: "Palette",
    shortDescription: "Beautiful, user-focused UI/UX design crafted with modern aesthetics, glassmorphism, and elegant spacing.",
    deliverables: [
      "Modern dark and light interface styling tailored to brand goals",
      "Intuitive navigation and conversion-focused visual hierarchy",
      "Interactive micro-interactions and smooth transition effects",
      "Accessible typography, contrast, and layout structure"
    ],
    idealFor: "Brands wanting an unforgettable, high-converting digital aesthetic."
  },
  {
    id: "seo",
    title: "SEO (Search Engine Optimization)",
    iconName: "Search",
    shortDescription: "On-page, technical, and structural search engine optimization to boost your website visibility on Google.",
    deliverables: [
      "Technical SEO audits, meta tags, and OpenGraph configuration",
      "Schema.org structured data and clean heading hierarchies",
      "Page speed enhancements and Core Web Vitals optimization",
      "Keyword alignment and content discoverability"
    ],
    idealFor: "Websites looking to rank organically and attract qualified visitors."
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    iconName: "TrendingUp",
    shortDescription: "Strategic digital marketing solutions to build brand awareness, social proof, and organic online reach.",
    deliverables: [
      "Social media presence strategy and content planning",
      "Targeted digital promotional campaigns and audience growth",
      "Brand messaging alignment and digital storytelling",
      "Analytics review and online growth recommendations"
    ],
    idealFor: "Entrepreneurs and local businesses expanding their digital footprint."
  },
  {
    id: "data-entry",
    title: "Data Entry & Management",
    iconName: "FileSpreadsheet",
    shortDescription: "Accurate, rapid, and structured data entry and spreadsheet organization with rigorous quality control.",
    deliverables: [
      "High-speed, error-free data transcription and digitizing",
      "Spreadsheet cleaning, formatting, and formula organization",
      "Database population and records reconciliation",
      "Strict data privacy, organization, and validation checks"
    ],
    idealFor: "Organizations with large record sets needing meticulous management."
  },
  {
    id: "ai-automation",
    title: "AI & Automation",
    iconName: "Cpu",
    shortDescription: "Creative technology and AI-driven automation workflows to eliminate repetitive digital tasks.",
    deliverables: [
      "Automated workflow setup for content and data tasks",
      "Smart scripting for scheduled reports and routine operations",
      "Exploration of AI tool integrations tailored to your requirements",
      "Practical productivity enhancement consulting"
    ],
    idealFor: "Teams aiming to leverage modern AI tools for maximum efficiency."
  }
];

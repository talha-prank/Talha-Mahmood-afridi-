export interface Project {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  category: 'Full-Stack' | 'Embedded / IoT' | 'Desktop / System' | 'Creative';
  techStack: string[];
  features: string[];
  metrics: string;
  liveUrl?: string;
  githubUrl?: string;
  image: string;
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level: number; highlight?: boolean }[];
}

export const PERSONAL_INFO = {
  name: "Talha Mahmood Afridi",
  title: "Computer Science Student & Web Developer",
  location: "Peshawar, Khyber Pakhtunkhwa, Pakistan",
  university: "University of Engineering and Technology (UET), Peshawar",
  degree: "BS Computer Science (In Progress)",
  email: "talhamahmood1055@gmail.com",
  whatsapp: "+923255691055",
  whatsappDisplay: "+92 325 5691055",
  github: "https://github.com/talha-mahmood-afridi",
  linkedin: "https://www.linkedin.com/in/talha-mahmood-afridi",
  bio: "Passionate Computer Science student at UET Peshawar specializing in modern full-stack web applications, scalable database systems, and interactive digital experiences. Dedicated to writing clean, maintainable code and solving real-world challenges.",
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Languages & Frameworks",
    skills: [
      { name: "TypeScript / JavaScript", level: 90, highlight: true },
      { name: "React / Next.js", level: 90, highlight: true },
      { name: "Node.js & Express", level: 85, highlight: true },
      { name: "Python", level: 80 },
      { name: "C / C++ (OOP & DSA)", level: 85 },
      { name: "HTML5 / Modern CSS / Tailwind", level: 95 },
    ]
  },
  {
    category: "Databases & Cloud",
    skills: [
      { name: "MongoDB & Mongoose", level: 90, highlight: true },
      { name: "PostgreSQL & SQL", level: 80 },
      { name: "RESTful APIs & Endpoints", level: 92, highlight: true },
      { name: "Vercel & Cloud Deployment", level: 88 },
      { name: "Git & GitHub Version Control", level: 90 },
    ]
  },
  {
    category: "CS Fundamentals & Tools",
    skills: [
      { name: "Data Structures & Algorithms", level: 85 },
      { name: "Object-Oriented Programming", level: 90 },
      { name: "Embedded Systems / Arduino", level: 78 },
      { name: "Linux & Bash Scripting", level: 80 },
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "ecommerce-platform",
    title: "Full-Stack E-Commerce & Inventory Platform",
    shortDesc: "Comprehensive e-commerce web platform with product catalog, cart state, dynamic checkout, and MongoDB integration.",
    fullDesc: "An end-to-end full-stack modern web application built with Next.js/React, Tailwind CSS, Node.js backend APIs, and MongoDB for resilient product catalog and customer order management.",
    category: "Full-Stack",
    techStack: ["Next.js", "React", "TypeScript", "MongoDB", "Tailwind CSS"],
    features: [
      "Dynamic catalog browsing with real-time filtering and search",
      "Persistent cart checkout flow",
      "Secure API routes for orders and customer queries",
      "Responsive design optimized for high-performance mobile commerce"
    ],
    metrics: "Sub-second load times & 100% responsive layout",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/talha-mahmood-afridi"
  },
  {
    id: "library-management",
    title: "Library Management & Resource System",
    shortDesc: "Academic and enterprise catalog system for book borrowing, cataloging, student records, and fine calculation.",
    fullDesc: "Designed to optimize university resource management. Provides role-based flows, fast search algorithms for catalog indices, and automated overdue tracking.",
    category: "Desktop / System",
    techStack: ["C++", "Data Structures", "OOP", "File Systems / SQL"],
    features: [
      "Fast index search utilizing balanced binary trees and hashing",
      "Member checkout tracking and automated timestamping",
      "Comprehensive inventory reporting"
    ],
    metrics: "Handles thousands of book records with instant search",
    image: "https://images.unsplash.com/photo-1507842229452-475a8a650d03?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/talha-mahmood-afridi"
  },
  {
    id: "iot-smart-automation",
    title: "Microcontroller Automation & Sensor Suite",
    shortDesc: "Embedded hardware automation system with sensor data telemetry, LCD readout, and real-time alerts.",
    fullDesc: "An embedded computing project demonstrating hardware-software interfacing using Arduino, ultrasonic and temperature telemetry, and actuator relays.",
    category: "Embedded / IoT",
    techStack: ["C/C++", "Arduino", "Sensors", "Hardware Design"],
    features: [
      "Multi-sensor data telemetry",
      "Real-time event triggering and relay actuation",
      "Digital LCD status display and diagnostics"
    ],
    metrics: "Reliable 24/7 continuous operation",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    githubUrl: "https://github.com/talha-mahmood-afridi"
  }
];

export const EDUCATION = [
  {
    institution: "University of Engineering and Technology (UET), Peshawar",
    degree: "Bachelor of Science in Computer Science (BS CS)",
    period: "2023 - Present",
    location: "Peshawar, Pakistan",
    details: [
      "Rigorous coursework in Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, and Software Engineering.",
      "Hands-on project work in full-stack web engineering and systems architecture."
    ]
  }
];

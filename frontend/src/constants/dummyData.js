export const DUMMY_PROFILES = [
  {
    id: 'profile-1',
    fullName: 'Arjun Mehta',
    email: 'arjun.mehta@email.com',
    phone: '+91 98765 43210',
    linkedin: 'linkedin.com/in/arjunmehta',
    yearsOfExperience: 6,
    companyExperience: [
      {
        id: 'exp-1',
        company: 'Google',
        role: 'Senior Software Engineer',
        duration: '2022 – Present',
        description: 'Led development of microservices architecture serving 10M+ users. Built real-time data pipelines using Apache Kafka and optimized system performance by 40%.',
      },
      {
        id: 'exp-2',
        company: 'Microsoft',
        role: 'Software Engineer',
        duration: '2019 – 2022',
        description: 'Developed Azure cloud services and contributed to the VS Code extension ecosystem. Mentored 5 junior developers.',
      },
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'M.S. Computer Science',
        institution: 'Stanford University',
        year: '2019',
      },
      {
        id: 'edu-2',
        degree: 'B.Tech Computer Science',
        institution: 'IIT Delhi',
        year: '2017',
      },
    ],
    createdAt: '2025-06-15T10:30:00Z',
  },
  {
    id: 'profile-2',
    fullName: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 87654 32109',
    linkedin: 'linkedin.com/in/priyasharma',
    yearsOfExperience: 4,
    companyExperience: [
      {
        id: 'exp-3',
        company: 'Amazon',
        role: 'Frontend Engineer',
        duration: '2021 – Present',
        description: 'Built and maintained customer-facing React applications for Amazon Prime. Reduced page load times by 35% through code splitting and lazy loading.',
      },
      {
        id: 'exp-4',
        company: 'Flipkart',
        role: 'Junior Developer',
        duration: '2020 – 2021',
        description: 'Worked on the e-commerce platform using React and Node.js. Implemented A/B testing framework for product pages.',
      },
    ],
    education: [
      {
        id: 'edu-3',
        degree: 'B.E. Information Technology',
        institution: 'BITS Pilani',
        year: '2020',
      },
    ],
    createdAt: '2025-06-20T14:15:00Z',
  },
  {
    id: 'profile-3',
    fullName: 'Rahul Verma',
    email: 'rahul.verma@email.com',
    phone: '+91 76543 21098',
    linkedin: 'linkedin.com/in/rahulverma',
    yearsOfExperience: 8,
    companyExperience: [
      {
        id: 'exp-5',
        company: 'Meta',
        role: 'Staff Engineer',
        duration: '2021 – Present',
        description: 'Architected and led the development of distributed systems at scale. Managed a team of 12 engineers across 3 time zones.',
      },
      {
        id: 'exp-6',
        company: 'Netflix',
        role: 'Senior Engineer',
        duration: '2018 – 2021',
        description: 'Built recommendation engine components serving 200M+ subscribers. Contributed to open-source projects used across the industry.',
      },
      {
        id: 'exp-7',
        company: 'Infosys',
        role: 'Software Developer',
        duration: '2016 – 2018',
        description: 'Developed enterprise Java applications for banking clients. Led migration from monolith to microservices architecture.',
      },
    ],
    education: [
      {
        id: 'edu-4',
        degree: 'M.Tech Software Engineering',
        institution: 'IIT Bombay',
        year: '2016',
      },
      {
        id: 'edu-5',
        degree: 'B.Tech Computer Science',
        institution: 'NIT Trichy',
        year: '2014',
      },
    ],
    createdAt: '2025-06-10T09:00:00Z',
  },
];

export const DUMMY_RESUMES = [
  {
    id: 'resume-1',
    profileId: 'profile-1',
    profileName: 'Arjun Mehta',
    jobTitle: 'Senior Full-Stack Engineer',
    company: 'Stripe',
    createdAt: '2025-06-25T11:00:00Z',
  },
  {
    id: 'resume-2',
    profileId: 'profile-2',
    profileName: 'Priya Sharma',
    jobTitle: 'React Developer',
    company: 'Shopify',
    createdAt: '2025-06-26T15:30:00Z',
  },
  {
    id: 'resume-3',
    profileId: 'profile-3',
    profileName: 'Rahul Verma',
    jobTitle: 'Engineering Manager',
    company: 'Uber',
    createdAt: '2025-06-27T09:45:00Z',
  },
];

export const DUMMY_COVER_LETTERS = [
  {
    id: 'cl-1',
    profileId: 'profile-1',
    profileName: 'Arjun Mehta',
    jobTitle: 'Senior Full-Stack Engineer',
    company: 'Stripe',
    createdAt: '2025-06-25T11:30:00Z',
  },
  {
    id: 'cl-2',
    profileId: 'profile-2',
    profileName: 'Priya Sharma',
    jobTitle: 'React Developer',
    company: 'Shopify',
    createdAt: '2025-06-26T16:00:00Z',
  },
  {
    id: 'cl-3',
    profileId: 'profile-3',
    profileName: 'Rahul Verma',
    jobTitle: 'Engineering Manager',
    company: 'Uber',
    createdAt: '2025-06-27T10:15:00Z',
  },
];

export const DUMMY_ACTIVITIES = [
  {
    id: 'act-1',
    type: 'resume',
    action: 'Generated',
    description: 'Resume for Senior Full-Stack Engineer at Stripe',
    timestamp: '2 hours ago',
  },
  {
    id: 'act-2',
    type: 'cover-letter',
    action: 'Generated',
    description: 'Cover Letter for React Developer at Shopify',
    timestamp: '4 hours ago',
  },
  {
    id: 'act-3',
    type: 'profile',
    action: 'Updated',
    description: 'Profile "Priya Sharma" was updated',
    timestamp: '6 hours ago',
  },
  {
    id: 'act-4',
    type: 'resume',
    action: 'Downloaded',
    description: 'Resume for Engineering Manager at Uber',
    timestamp: '1 day ago',
  },
  {
    id: 'act-5',
    type: 'profile',
    action: 'Created',
    description: 'New profile "Rahul Verma" was created',
    timestamp: '2 days ago',
  },
  {
    id: 'act-6',
    type: 'cover-letter',
    action: 'Saved',
    description: 'Cover Letter for Engineering Manager at Uber',
    timestamp: '2 days ago',
  },
  {
    id: 'act-7',
    type: 'resume',
    action: 'Generated',
    description: 'Resume for Frontend Engineer at Vercel',
    timestamp: '3 days ago',
  },
  {
    id: 'act-8',
    type: 'profile',
    action: 'Created',
    description: 'New profile "Arjun Mehta" was created',
    timestamp: '5 days ago',
  },
];

export const GENERATED_RESUME_CONTENT = {
  summary: 'Results-driven Senior Software Engineer with 6+ years of experience building scalable distributed systems and microservices architectures. Proven track record at Google and Microsoft with expertise in cloud computing, real-time data processing, and team leadership. Passionate about building high-performance applications that serve millions of users.',
  skills: [
    'JavaScript / TypeScript',
    'React & Next.js',
    'Node.js & Express',
    'Python & Django',
    'AWS / GCP / Azure',
    'Docker & Kubernetes',
    'PostgreSQL & MongoDB',
    'Apache Kafka',
    'System Design',
    'CI/CD Pipelines',
    'GraphQL & REST APIs',
    'Agile & Scrum',
  ],
  experience: [
    {
      company: 'Google',
      role: 'Senior Software Engineer',
      duration: '2022 – Present',
      bullets: [
        'Led development of microservices architecture serving 10M+ daily active users across 15 services',
        'Built real-time data pipelines using Apache Kafka, processing 500K events per second',
        'Optimized system performance by 40% through database query optimization and caching strategies',
        'Mentored 8 engineers and established code review best practices across the team',
      ],
    },
    {
      company: 'Microsoft',
      role: 'Software Engineer',
      duration: '2019 – 2022',
      bullets: [
        'Developed Azure cloud services handling 50M+ API requests daily',
        'Contributed 15+ features to the VS Code extension ecosystem used by 30M+ developers',
        'Mentored 5 junior developers and led onboarding program for new hires',
        'Received "Outstanding Contributor" award for Q3 2021',
      ],
    },
  ],
  education: [
    { degree: 'M.S. Computer Science', institution: 'Stanford University', year: '2019' },
    { degree: 'B.Tech Computer Science', institution: 'IIT Delhi', year: '2017' },
  ],
  certifications: [
    'AWS Solutions Architect – Professional',
    'Google Cloud Professional Cloud Architect',
    'Certified Kubernetes Administrator (CKA)',
  ],
};

export const GENERATED_COVER_LETTER_CONTENT = {
  recipientName: 'Hiring Manager',
  companyName: 'Stripe',
  jobTitle: 'Senior Full-Stack Engineer',
  paragraphs: [
    'I am writing to express my strong interest in the Senior Full-Stack Engineer position at Stripe. With over 6 years of experience building scalable distributed systems at Google and Microsoft, I am excited about the opportunity to contribute to Stripe\'s mission of increasing the GDP of the internet.',
    'In my current role at Google, I lead the development of a microservices architecture serving over 10 million daily active users. I have built real-time data pipelines processing 500,000 events per second using Apache Kafka and optimized system performance by 40% through strategic database optimization and caching. These experiences have given me deep expertise in building reliable, high-performance systems — skills directly applicable to Stripe\'s infrastructure challenges.',
    'What particularly excites me about Stripe is the company\'s commitment to developer experience and building elegant APIs. At Microsoft, I contributed to the VS Code extension ecosystem, which taught me the importance of creating tools that developers love to use. I believe this perspective, combined with my distributed systems expertise, would be valuable in building Stripe\'s next-generation payment infrastructure.',
    'I am also passionate about mentorship and team growth. At Google, I mentor 8 engineers and have established code review practices that improved our team\'s code quality metrics by 25%. I thrive in collaborative environments where I can both contribute technically and help elevate the team.',
    'I would welcome the opportunity to discuss how my experience in building scalable systems and my passion for developer tools can contribute to Stripe\'s continued success. Thank you for considering my application.',
  ],
  closing: 'Sincerely',
};

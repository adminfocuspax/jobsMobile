type locationType = {
  area: string;
  city: string;
  district: string;
  state: string;
};

export interface JobInterface {
  id: string;
  title: string;
  company: {
    name: string;
    logo?: string;
    location: locationType[];
  };
  keywords: string[];
  level?: string;
  postedDate: string; // ISO date string or relative time like "2 days ago"
  description?: string;
  salary?: string;
  type?: string; // full-time, part-time, contract, etc.
}

// Sample job data for demonstration
const sampleJob: JobInterface = {
  id: '1',
  title: 'Senior Sales Associate',
  company: {
    name: 'Target Corporation',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs2BpLryfOPE_W4zr2-grBJ5DCrv50dGAiaQ&s',
    location: [
      {
        area: 'Manhattan',
        city: 'New York',
        district: 'Manhattan',
        state: 'NY',
      },
    ],
  },
  keywords: ['Sales', 'Customer Service', 'Retail'],
  postedDate: '2 days ago',
  description:
    'Join our dynamic sales team and help customers find what they need.',
  salary: '$45,000 - $55,000',
  type: 'Full-time',
};

// Sample job data array for demonstration
export const sampleJobs: JobInterface[] = [
  {
    id: '1',
    title: 'Senior Sales Associate',
    company: {
      name: 'Target Corporation',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs2BpLryfOPE_W4zr2-grBJ5DCrv50dGAiaQ&s',
      location: [
        {
          area: 'Manhattan',
          city: 'New York',
          district: 'Manhattan',
          state: 'NY',
        },
        {
          area: 'Manhattan',
          city: 'New York',
          district: 'Manhattan',
          state: 'NY',
        },
        {
          area: 'Manhattan',
          city: 'New York',
          district: 'Manhattan',
          state: 'NY',
        },
      ],
    },
    keywords: ['Sales', 'Customer Service', 'Retail'],
    postedDate: '2 days ago',
    description:
      'Join our dynamic sales team and help customers find what they need.',
    salary: '$45,000 - $55,000',
    type: 'Full-time',
  },
  {
    id: '2',
    title: 'Software Engineer',
    company: {
      name: 'Tech Solutions Inc',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs2BpLryfOPE_W4zr2-grBJ5DCrv50dGAiaQ&s',
      location: [
        {
          area: 'SOMA',
          city: 'San Francisco',
          district: 'South of Market',
          state: 'CA',
        },
      ],
    },
    keywords: ['JavaScript', 'React', 'Node.js'],
    postedDate: '1 day ago',
    description: 'Build innovative web applications using modern technologies.',
    salary: '$80,000 - $120,000',
    type: 'Full-time',
  },
  {
    id: '3',
    title: 'Marketing Manager',
    company: {
      name: 'Creative Agency',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs2BpLryfOPE_W4zr2-grBJ5DCrv50dGAiaQ&s',
      location: [
        {
          area: 'Hollywood',
          city: 'Los Angeles',
          district: 'Hollywood',
          state: 'CA',
        },
      ],
    },
    keywords: ['Digital Marketing', 'SEO', 'Content Strategy'],
    postedDate: '3 days ago',
    description: 'Lead marketing campaigns and drive brand awareness.',
    salary: '$60,000 - $75,000',
    type: 'Full-time',
  },
  {
    id: '4',
    title: 'Data Analyst',
    company: {
      name: 'Analytics Pro',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs2BpLryfOPE_W4zr2-grBJ5DCrv50dGAiaQ&s',
      location: [
        {
          area: 'Loop',
          city: 'Chicago',
          district: 'Downtown',
          state: 'IL',
        },
      ],
    },
    keywords: ['Python', 'SQL', 'Data Visualization'],
    postedDate: '5 days ago',
    description: 'Analyze complex datasets to drive business insights.',
    salary: '$55,000 - $70,000',
    type: 'Full-time',
  },
  {
    id: '5',
    title: 'UX Designer',
    company: {
      name: 'Design Studio',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs2BpLryfOPE_W4zr2-grBJ5DCrv50dGAiaQ&s',
      location: [
        {
          area: 'Downtown',
          city: 'Austin',
          district: 'Central Austin',
          state: 'TX',
        },
      ],
    },
    keywords: ['Figma', 'User Research', 'Prototyping'],
    postedDate: '1 week ago',
    description: 'Create intuitive user experiences for digital products.',
    salary: '$65,000 - $85,000',
    type: 'Full-time',
  },
  {
    id: '6',
    title: 'Customer Support Specialist',
    company: {
      name: 'Service First',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs2BpLryfOPE_W4zr2-grBJ5DCrv50dGAiaQ&s',
      location: [
        {
          area: 'Remote',
          city: 'Remote',
          district: 'Remote',
          state: 'Remote',
        },
      ],
    },
    keywords: ['Customer Service', 'Communication', 'Problem Solving'],
    postedDate: '4 days ago',
    description: 'Provide exceptional support to our valued customers.',
    salary: '$35,000 - $45,000',
    type: 'Full-time',
  },
  {
    id: '7',
    title: 'Project Manager',
    company: {
      name: 'Global Enterprises',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs2BpLryfOPE_W4zr2-grBJ5DCrv50dGAiaQ&s',
      location: [
        {
          area: 'Back Bay',
          city: 'Boston',
          district: 'Back Bay',
          state: 'MA',
        },
      ],
    },
    keywords: ['Agile', 'Scrum', 'Team Leadership'],
    postedDate: '6 days ago',
    description: 'Lead cross-functional teams to deliver successful projects.',
    salary: '$70,000 - $90,000',
    type: 'Full-time',
  },
  {
    id: '8',
    title: 'Graphic Designer',
    company: {
      name: 'Visual Arts Co',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs2BpLryfOPE_W4zr2-grBJ5DCrv50dGAiaQ&s',
      location: [
        {
          area: 'South Beach',
          city: 'Miami',
          district: 'Miami Beach',
          state: 'FL',
        },
      ],
    },
    keywords: ['Adobe Creative Suite', 'Branding', 'Print Design'],
    postedDate: '2 weeks ago',
    description: 'Create stunning visual designs for various media.',
    salary: '$40,000 - $55,000',
    type: 'Part-time',
  },
  {
    id: '9',
    title: 'Financial Analyst',
    company: {
      name: 'Finance Corp',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs2BpLryfOPE_W4zr2-grBJ5DCrv50dGAiaQ&s',
      location: [
        {
          area: 'Capitol Hill',
          city: 'Seattle',
          district: 'Capitol Hill',
          state: 'WA',
        },
      ],
    },
    keywords: ['Excel', 'Financial Modeling', 'Reporting'],
    postedDate: '1 week ago',
    description: 'Analyze financial data and prepare comprehensive reports.',
    salary: '$58,000 - $72,000',
    type: 'Full-time',
  },
  {
    id: '10',
    title: 'Content Writer',
    company: {
      name: 'Media House',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs2BpLryfOPE_W4zr2-grBJ5DCrv50dGAiaQ&s',
      location: [
        {
          area: 'LoDo',
          city: 'Denver',
          district: 'Lower Downtown',
          state: 'CO',
        },
      ],
    },
    keywords: ['Writing', 'SEO', 'Content Marketing'],
    postedDate: '3 days ago',
    description: 'Create engaging content for web and social media platforms.',
    salary: '$42,000 - $52,000',
    type: 'Contract',
  },
];

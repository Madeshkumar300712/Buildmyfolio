export interface Personal {
  fullName: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  profileImage: string;
  website: string;
}

export interface Social {
  github: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  youtube: string;
}

export interface Education {
  _id?: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  grade: string;
  description: string;
}

export interface Skill {
  _id?: string;
  name: string;
  level: number;
  category: string;
}

export interface Project {
  _id?: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
  featured: boolean;
}

export interface Experience {
  _id?: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  location: string;
}

export interface Achievement {
  _id?: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  url: string;
}

export interface Theme {
  name: string;
  primaryColor: string;
  fontFamily: string;
}

export interface Portfolio {
  _id?: string;
  shareId?: string;
  user?: string;
  personal: Personal;
  social: Social;
  education: Education[];
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  achievements: Achievement[];
  theme: Theme;
  strength: number;
  isPublished: boolean;
  views: number;
  createdAt?: string;
  updatedAt?: string;
}
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const portfolioSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  shareId: { type: String, default: uuidv4, unique: true },

  personal: {
    fullName: { type: String, default: '' },
    title: { type: String, default: '' },
    bio: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    profileImage: { type: String, default: '' },
    website: { type: String, default: '' }
  },

  social: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' },
    youtube: { type: String, default: '' }
  },

  education: [{
    institution: String,
    degree: String,
    field: String,
    startYear: String,
    endYear: String,
    grade: String,
    description: String
  }],

  skills: [{
    name: String,
    level: { type: Number, min: 0, max: 100 },
    category: { type: String, enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Mobile', 'Design', 'Other'] }
  }],

  projects: [{
    title: String,
    description: String,
    techStack: [String],
    liveUrl: String,
    githubUrl: String,
    image: String,
    featured: { type: Boolean, default: false }
  }],

  experience: [{
    company: String,
    role: String,
    startDate: String,
    endDate: String,
    current: { type: Boolean, default: false },
    description: String,
    location: String
  }],

  achievements: [{
    title: String,
    issuer: String,
    date: String,
    description: String,
    url: String
  }],

  theme: {
    name: { type: String, default: 'midnight' },
    primaryColor: { type: String, default: '#00d4ff' },
    fontFamily: { type: String, default: 'Outfit' }
  },

  strength: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: false },
  views: { type: Number, default: 0 },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

portfolioSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  this.strength = calculateStrength(this);
  next();
});

function calculateStrength(portfolio) {
  let score = 0;
  const p = portfolio.personal;
  if (p.fullName) score += 10;
  if (p.title) score += 10;
  if (p.bio && p.bio.length > 50) score += 15;
  if (p.email) score += 5;
  if (p.profileImage) score += 10;
  if (portfolio.skills.length >= 5) score += 15;
  if (portfolio.projects.length >= 2) score += 15;
  if (portfolio.education.length > 0) score += 10;
  if (portfolio.experience.length > 0) score += 5;
  if (portfolio.achievements.length > 0) score += 5;
  return Math.min(score, 100);
}

module.exports = mongoose.model('Portfolio', portfolioSchema);
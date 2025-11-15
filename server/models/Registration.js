const mongoose = require('mongoose');
const validator = require('validator');

const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email address'
    }
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    validate: {
      validator: function(v) {
        return /^[\d\s\+\-\(\)]+$/.test(v) && v.replace(/\D/g, '').length >= 10;
      },
      message: 'Please provide a valid phone number'
    }
  },
  college: {
    type: String,
    required: [true, 'College name is required'],
    trim: true,
    minlength: [2, 'College name must be at least 2 characters long']
  },
  year: {
    type: String,
    required: [true, 'Year is required'],
    enum: {
      values: ['1', '2', '3', '4'],
      message: 'Year must be 1, 2, 3, or 4'
    }
  },
  branch: {
    type: String,
    required: [true, 'Branch is required'],
    trim: true
  },
  experience: {
    type: String,
    required: [true, 'Experience level is required'],
    enum: {
      values: ['beginner', 'intermediate', 'advanced'],
      message: 'Experience must be beginner, intermediate, or advanced'
    },
    default: 'beginner'
  },
  github: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        if (!v) return true; // Optional field
        return validator.isURL(v);
      },
      message: 'Please provide a valid GitHub URL'
    }
  },
  linkedin: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        if (!v) return true; // Optional field
        return validator.isURL(v);
      },
      message: 'Please provide a valid LinkedIn URL'
    }
  },
  expectations: {
    type: String,
    trim: true,
    maxlength: [1000, 'Expectations cannot exceed 1000 characters']
  },
  registeredAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Index for faster queries
registrationSchema.index({ email: 1 });
registrationSchema.index({ registeredAt: -1 });

// Instance method to get formatted registration data
registrationSchema.methods.getPublicProfile = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    college: this.college,
    year: this.year,
    branch: this.branch,
    experience: this.experience,
    registeredAt: this.registeredAt,
    status: this.status
  };
};

// Static method to get statistics
registrationSchema.statics.getStats = async function() {
  const total = await this.countDocuments();
  const byExperience = await this.aggregate([
    { $group: { _id: '$experience', count: { $sum: 1 } } }
  ]);
  const byYear = await this.aggregate([
    { $group: { _id: '$year', count: { $sum: 1 } } }
  ]);

  return {
    total,
    byExperience,
    byYear
  };
};

// Create unique index on email
registrationSchema.index({ email: 1 }, { unique: true });

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;

const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  // Use flexible schema - accept any field from form
}, { 
  strict: false, // Allow fields not defined in schema
  timestamps: true 
});

// Add index on email for uniqueness
registrationSchema.index({ email: 1 }, { unique: true, sparse: true });

// Instance method to get formatted registration data
registrationSchema.methods.getPublicProfile = function() {
  const data = this.toObject();
  delete data.__v;
  return data;
};

// Static method to validate based on form config
registrationSchema.statics.validateRegistration = async function(data, formFields) {
  const errors = [];
  
  for (const field of formFields) {
    if (field.required && !data[field.name]) {
      errors.push(`${field.label} is required`);
    }
    
    // Email validation
    if (field.type === 'email' && data[field.name]) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data[field.name])) {
        errors.push(`Please provide a valid ${field.label}`);
      }
    }
    
    // Phone validation
    if (field.type === 'tel' && data[field.name]) {
      const phoneRegex = /^[\d\s\+\-\(\)]+$/;
      const digits = data[field.name].replace(/\D/g, '');
      if (!phoneRegex.test(data[field.name]) || digits.length < 10) {
        errors.push(`Please provide a valid ${field.label}`);
      }
    }
    
    // URL validation
    if (field.type === 'url' && data[field.name]) {
      try {
        new URL(data[field.name]);
      } catch {
        errors.push(`Please provide a valid ${field.label}`);
      }
    }
  }
  
  return errors;
};

module.exports = mongoose.model('Registration', registrationSchema);
const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;

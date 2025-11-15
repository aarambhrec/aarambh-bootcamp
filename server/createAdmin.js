const mongoose = require('mongoose');
const readline = require('readline');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');
require('dotenv').config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function createAdmin() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/aarambh';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Get admin details
    console.log('\n🔐 Create Admin User\n');
    const username = await question('Username: ');
    const email = await question('Email: ');
    const password = await question('Password: ');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ $or: [{ email }, { username }] });
    if (existingAdmin) {
      console.log('❌ Admin with this email or username already exists!');
      process.exit(1);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const admin = new Admin({
      username,
      email,
      password: hashedPassword,
      role: 'super_admin'
    });

    await admin.save();
    console.log('\n✅ Admin created successfully!');
    console.log(`Username: ${username}`);
    console.log(`Email: ${email}`);
    console.log(`Role: super_admin`);

  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
  } finally {
    rl.close();
    mongoose.connection.close();
    process.exit(0);
  }
}

createAdmin();

#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Deploying Firebase Security Rules...\n');

// Check if firebase.json exists
if (!fs.existsSync('firebase.json')) {
  console.error('❌ firebase.json not found. Please run "firebase init" first.');
  process.exit(1);
}

// Check if firestore.rules exists
if (!fs.existsSync('firestore.rules')) {
  console.error('❌ firestore.rules not found.');
  process.exit(1);
}

// Check if storage.rules exists
if (!fs.existsSync('storage.rules')) {
  console.error('❌ storage.rules not found.');
  process.exit(1);
}

try {
  console.log('📋 Deploying Firestore security rules...');
  execSync('firebase deploy --only firestore:rules', { stdio: 'inherit' });
  
  console.log('\n📦 Deploying Storage security rules...');
  execSync('firebase deploy --only storage', { stdio: 'inherit' });
  
  console.log('\n✅ Firebase security rules deployed successfully!');
  console.log('\n📝 Next steps:');
  console.log('1. Test the app to ensure authentication works');
  console.log('2. Verify that users can access their data');
  console.log('3. Check that products are readable');
  
} catch (error) {
  console.error('\n❌ Deployment failed:', error.message);
  console.log('\n💡 Make sure you:');
  console.log('1. Have Firebase CLI installed: npm install -g firebase-tools');
  console.log('2. Are logged in: firebase login');
  console.log('3. Have initialized the project: firebase init');
  process.exit(1);
}

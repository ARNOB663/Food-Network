# Authentication Troubleshooting Guide

## Common Issues and Solutions

### 1. Firebase Configuration Issues

**Problem**: Authentication not working, Firebase connection errors

**Solutions**:
- Verify your Firebase project is properly set up
- Check that Authentication is enabled in Firebase Console
- Ensure Email/Password sign-in method is enabled
- Verify your `config/firebase.ts` has the correct configuration

**Steps to verify**:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (`foodnetwork-83c20`)
3. Go to Authentication → Sign-in method
4. Enable Email/Password provider
5. Go to Project Settings → General
6. Copy the config and verify it matches your `config/firebase.ts`

### 2. Network Connectivity Issues

**Problem**: "Network error" or connection timeouts

**Solutions**:
- Check your internet connection
- Verify Firebase services are accessible
- Try using a different network
- Check if your device/emulator has internet access

### 3. Email Validation Issues

**Problem**: "Please enter a valid email address"

**Solutions**:
- Ensure email format is correct (e.g., `user@example.com`)
- Check for extra spaces before or after email
- Verify email domain is valid

### 4. Password Issues

**Problem**: "Password must be at least 6 characters long"

**Solutions**:
- Use passwords with at least 6 characters
- Avoid common passwords
- Use a mix of letters, numbers, and symbols

### 5. Account Already Exists

**Problem**: "An account with this email already exists"

**Solutions**:
- Use a different email address
- Try logging in instead of signing up
- Reset password if you forgot it

### 6. User Not Found

**Problem**: "No account found with this email address"

**Solutions**:
- Check if you're using the correct email
- Create a new account if you haven't signed up
- Verify the email was typed correctly

### 7. Too Many Failed Attempts

**Problem**: "Too many failed attempts. Please try again later."

**Solutions**:
- Wait a few minutes before trying again
- Use the correct email and password
- Try resetting your password

## Debugging Steps

### 1. Use the Auth Debugger

The app includes a debug component (visible in development mode) that can help identify issues:

- **Test Firebase Connection**: Checks if Firebase is properly initialized
- **Show User Info**: Displays current user information
- **Status**: Shows authentication state

### 2. Check Console Logs

Look for these messages in your development console:

```
Firebase initialized with project: foodnetwork-83c20
```

If you don't see this message, Firebase isn't initializing properly.

### 3. Test with Sample Credentials

Try creating a test account with these credentials:
- Email: `test@example.com`
- Password: `password123`
- Name: `Test User`

### 4. Verify Firebase Rules

Make sure your Firestore security rules allow read/write access:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Testing Checklist

Before reporting an issue, please verify:

- [ ] Firebase project is properly configured
- [ ] Authentication is enabled in Firebase Console
- [ ] Email/Password sign-in method is enabled
- [ ] Internet connection is working
- [ ] App is running in development mode
- [ ] Console shows "Firebase initialized" message
- [ ] Auth Debugger shows "Ready" status

## Common Error Messages

| Error Message | Cause | Solution |
|---------------|-------|----------|
| "Please enter a valid email address" | Invalid email format | Use proper email format |
| "Password must be at least 6 characters" | Password too short | Use longer password |
| "An account with this email already exists" | Email already registered | Use different email or login |
| "No account found with this email address" | Email not registered | Create new account |
| "Incorrect password" | Wrong password | Use correct password |
| "Network error" | Connection issues | Check internet connection |

## Getting Help

If you're still experiencing issues:

1. Check the console logs for error messages
2. Use the Auth Debugger to test Firebase connection
3. Verify your Firebase configuration
4. Test with a simple email/password combination
5. Try creating a new Firebase project for testing

## Development vs Production

- **Development**: Debug components are visible, more verbose logging
- **Production**: Debug components hidden, minimal logging

Make sure to test in both environments before deploying.


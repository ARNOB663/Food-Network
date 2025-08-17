# 🛒 Food Network - E-commerce App

A modern food and grocery e-commerce mobile application built with React Native and Expo, featuring user authentication, product browsing, shopping cart functionality, and Firebase integration.

## ✨ Features

### 🔐 Authentication
- User Registration & Login with secure email/password authentication
- Profile Management for editing user information
- Session Persistence with automatic login state management
- Secure Logout functionality

### 🛍️ Shopping Experience
- Product Catalog with 10+ categories and 40+ products
- Search & Filter functionality
- Category Browsing with organized product categories
- Product Details with comprehensive information

### 🛒 Shopping Cart
- Add/Remove Items with easy cart management
- Quantity Control for adjusting product quantities
- Real-time Updates with live cart total calculations
- Cart Persistence with items saved between sessions
- Clear Cart functionality

### 🔔 Notifications
- Toast Notifications with animated success/error messages
- Cart Actions notifications for add/remove operations
- User Feedback with clear action confirmations

### 🎨 User Interface
- Modern Design with clean, intuitive interface
- Dark/Light Theme support with automatic detection
- Responsive Layout optimized for all screen sizes
- Smooth Animations for enhanced user experience

## 🛠️ Tech Stack

### Frontend
- React Native - Cross-platform mobile development
- Expo - Development platform and tools
- TypeScript - Type-safe JavaScript
- Expo Router - File-based navigation

### Backend & Database
- Firebase Authentication - User authentication service
- Firestore Database - NoSQL cloud database
- Firebase Storage - File storage service

### State Management
- React Context API - Global state management
- AsyncStorage - Local data persistence
- Custom Hooks - Reusable logic

### Development Tools
- ESLint - Code linting
- TypeScript - Type checking
- EAS Build - App building and deployment

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ARNOB663/Food-Network.git
   cd Food-Network
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Setup**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication and Firestore Database
   - Download your `google-services.json` and place it in the project root
   - Update `config/firebase.ts` with your Firebase configuration

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on your preferred platform**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

## 📁 File Structure

```
food-network/
├── app/                           # Main application screens
│   ├── _layout.tsx               # Root layout with auth & navigation
│   ├── login.tsx                 # User login screen
│   ├── signup.tsx                # User registration screen
│   ├── product.tsx               # Product detail modal
│   ├── modal.tsx                 # General modal screen
│   ├── index.tsx                 # Redirect to tabs
│   ├── +html.tsx                 # HTML template for web
│   ├── +not-found.tsx            # 404 error page
│   └── (tabs)/                   # Tab navigation screens
│       ├── _layout.tsx           # Tab navigation layout
│       ├── index.tsx             # Home screen with products
│       ├── categories.tsx        # Categories browsing
│       ├── cart.tsx              # Shopping cart
│       └── profile.tsx           # User profile
│
├── components/                    # Reusable React components
│   ├── AuthContext.tsx           # Authentication context
│   ├── CartContext.tsx           # Shopping cart context
│   ├── NotificationContext.tsx   # Notification system
│   ├── Notification.tsx          # Toast notification component
│   ├── CartNotificationWrapper.tsx # Cart notification wrapper
│   ├── DatabaseSeeder.tsx        # Database seeding component
│   ├── EditScreenInfo.tsx        # Edit screen info component
│   ├── ExternalLink.tsx          # External link component
│   ├── StyledText.tsx            # Styled text component
│   ├── Themed.tsx                # Themed component wrapper
│   ├── useClientOnlyValue.ts     # Client-only value hook
│   ├── useClientOnlyValue.web.ts # Web-specific hook
│   ├── useColorScheme.ts         # Color scheme hook
│   ├── useColorScheme.web.ts     # Web-specific color scheme
│   └── __tests__/                # Component tests
│
├── assets/                        # Static assets
│   ├── images/                   # App images
│   │   ├── icon.png              # App icon
│   │   ├── splash-icon.png       # Splash screen
│   │   ├── adaptive-icon.png     # Android adaptive icon
│   │   └── favicon.png           # Web favicon
│   └── fonts/                    # Custom fonts
│       └── SpaceMono-Regular.ttf # Custom font
│
├── config/                        # Configuration files
│   └── firebase.ts               # Firebase configuration
│
├── constants/                     # App constants
│   └── Colors.ts                 # Color scheme definitions
│
├── services/                      # Business logic services
│   └── productService.ts         # Product management service
│
├── scripts/                       # Utility scripts
│   ├── deploy-firebase.js        # Firebase deployment
│   ├── populate-database.js      # Database population
│   ├── populateDatabase.ts       # TypeScript version
│   └── populateDatabase.js       # Alternative version
│
├── app.json                      # Expo configuration
├── package.json                  # Dependencies and scripts
├── eas.json                      # EAS build configuration
├── firebase.json                 # Firebase project config
├── firestore.rules               # Firestore security rules
├── firestore.indexes.json        # Database indexes
├── storage.rules                 # Storage security rules
├── README.md                     # This file
├── DEPLOYMENT.md                 # Deployment guide
└── TROUBLESHOOTING.md            # Troubleshooting guide
```

## 🔧 Available Scripts

### Development
```bash
npm start              # Start development server
npm run android        # Run on Android
npm run ios           # Run on iOS
npm run web           # Run on web
```

### Building
```bash
npm run build:web     # Build for web
npm run build:android # Build for Android
npm run build:ios     # Build for iOS
npm run build:all     # Build for all platforms
```

### Deployment
```bash
npm run deploy:firebase    # Deploy Firebase rules
npm run populate:db        # Populate database
npm run submit:android     # Submit to Google Play
npm run submit:ios         # Submit to App Store
```

### Code Quality
```bash
npm run lint              # Run ESLint
npm run lint:fix          # Fix linting issues
npm run type-check        # TypeScript checking
```

## 🔐 Firebase Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password)
4. Enable Firestore Database
5. Enable Storage (optional)

### 2. Configure Security Rules

**Firestore Rules** (`firestore.rules`):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Anyone can read products
    match /products/{productId} {
      allow read: if true;
      allow write: if false;
    }
    
    // Users can read/write their own orders
    match /orders/{orderId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

**Storage Rules** (`storage.rules`):
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if false;
    }
  }
}
```

### 3. Deploy Rules
```bash
npm run deploy:firebase
```

### 4. Populate Database
```bash
npm run populate:db
```

## 🏗️ Architecture Overview

### State Management
- Context API for global state (Auth, Cart, Notifications)
- Local State for component-specific data
- AsyncStorage for persistent data

### Navigation
- Expo Router for declarative routing
- Stack Navigation for modal screens
- Tab Navigation for main app sections

### Data Flow
- Firebase Auth for user authentication
- Firestore for product and user data
- AsyncStorage for local cart persistence
- Context API for state synchronization

## 🔒 Security Features

- Firebase Security Rules for data protection
- Authentication Guards for protected routes
- Input Validation for form data
- Error Handling for robust operation

## 📱 Platform Support

- iOS - Native iOS app
- Android - Native Android app
- Web - Progressive web app
- Cross-platform - Shared codebase

## 🎯 Development Guidelines

### File Naming
- Use PascalCase for components
- Use camelCase for functions and variables
- Use kebab-case for files and directories

### Component Structure
- One component per file
- Export default for main component
- Named exports for utilities

### Code Organization
- Group related functionality
- Separate concerns (UI, logic, data)
- Use TypeScript for type safety

## 🚀 Deployment

### Pre-deployment Checklist
- [ ] Firebase project configured
- [ ] Security rules deployed
- [ ] Database populated
- [ ] Environment variables set
- [ ] App icons and splash screens updated
- [ ] Bundle identifiers configured

### Build Commands
```bash
# Development build
eas build --profile development --platform all

# Preview build
eas build --profile preview --platform all

# Production build
eas build --profile production --platform all
```

### Submit to Stores
```bash
# Android
eas submit --platform android

# iOS
eas submit --platform ios
```

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## 🐛 Troubleshooting

Common issues and solutions:

### Firebase Permissions Error
```bash
# Deploy security rules
npm run deploy:firebase
```

### Navigation Issues
- Check authentication state in `app/_layout.tsx`
- Verify tab navigation in `app/(tabs)/_layout.tsx`

### Build Errors
- Clear cache: `expo r -c`
- Reset Metro: `npx expo start --clear`

For more troubleshooting tips, see [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**ARNOB663**
- GitHub: [@ARNOB663](https://github.com/ARNOB663)

## 🙏 Acknowledgments

- [Expo](https://expo.dev/) for the amazing development platform
- [Firebase](https://firebase.google.com/) for backend services
- [React Native](https://reactnative.dev/) for cross-platform development
- [React Navigation](https://reactnavigation.org/) for navigation solutions

---

**Made with ❤️ for fresh groceries delivery! 🛒🥬🍎**

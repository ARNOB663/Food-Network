# Food Network - E-commerce App

A modern food and grocery e-commerce mobile application built with React Native and Expo, featuring user authentication, product browsing, shopping cart functionality, and Firebase integration.

## 📁 File Structure & Documentation

### Complete Project Structure
```
food-network/
├── 📱 app/                           # Main application screens and navigation
│   ├── _layout.tsx                   # Root layout with auth and navigation
│   ├── login.tsx                     # User login screen
│   ├── signup.tsx                    # User registration screen
│   ├── product.tsx                   # Product detail modal
│   ├── modal.tsx                     # General modal screen
│   ├── index.tsx                     # Redirect to tabs
│   ├── +html.tsx                     # HTML template for web
│   ├── +not-found.tsx                # 404 error page
│   └── (tabs)/                       # Tab navigation screens
│       ├── _layout.tsx               # Tab navigation layout
│       ├── index.tsx                 # Home screen with products
│       ├── categories.tsx            # Categories browsing
│       ├── cart.tsx                  # Shopping cart
│       └── profile.tsx               # User profile
│
├── 🧩 components/                    # Reusable React components
│   ├── AuthContext.tsx               # Authentication context
│   ├── CartContext.tsx               # Shopping cart context
│   ├── NotificationContext.tsx       # Notification system
│   ├── Notification.tsx              # Toast notification component
│   ├── CartNotificationWrapper.tsx   # Cart notification wrapper
│   ├── DatabaseSeeder.tsx            # Database seeding component
│   ├── EditScreenInfo.tsx            # Edit screen info component
│   ├── ExternalLink.tsx              # External link component
│   ├── StyledText.tsx                # Styled text component
│   ├── Themed.tsx                    # Themed component wrapper
│   ├── useClientOnlyValue.ts         # Client-only value hook
│   ├── useClientOnlyValue.web.ts     # Web-specific hook
│   ├── useColorScheme.ts             # Color scheme hook
│   ├── useColorScheme.web.ts         # Web-specific color scheme
│   └── __tests__/                    # Component tests
│
├── 🖼️ assets/                        # Static assets
│   ├── images/                       # App images
│   │   ├── icon.png                  # App icon
│   │   ├── splash-icon.png           # Splash screen
│   │   ├── adaptive-icon.png         # Android adaptive icon
│   │   └── favicon.png               # Web favicon
│   └── fonts/                        # Custom fonts
│       └── SpaceMono-Regular.ttf     # Custom font
│
├── ⚙️ config/                        # Configuration files
│   └── firebase.ts                   # Firebase configuration
│
├── 🎨 constants/                     # App constants
│   └── Colors.ts                     # Color scheme definitions
│
├── 🔧 services/                      # Business logic services
│   └── productService.ts             # Product management service
│
├── 📜 scripts/                       # Utility scripts
│   ├── deploy-firebase.js            # Firebase deployment
│   ├── populate-database.js          # Database population
│   ├── populateDatabase.ts           # TypeScript version
│   └── populateDatabase.js           # Alternative version
│
├── 📄 Configuration Files
│   ├── app.json                      # Expo configuration
│   ├── package.json                  # Dependencies and scripts
│   ├── package-lock.json             # Locked dependencies
│   ├── eas.json                      # EAS build configuration
│   ├── tsconfig.json                 # TypeScript configuration
│   ├── .gitignore                    # Git ignore rules
│   ├── expo-env.d.ts                 # Expo environment types
│   ├── firebase.json                 # Firebase project config
│   ├── firestore.rules               # Firestore security rules
│   ├── firestore.indexes.json        # Database indexes
│   └── storage.rules                 # Storage security rules
│
├── 📚 Documentation
│   ├── README.md                     # This file
│   ├── DEPLOYMENT.md                 # Deployment guide
│   └── TROUBLESHOOTING.md            # Troubleshooting guide
│
└── 🔧 Development Files
    ├── .expo/                        # Expo development files
    ├── .git/                         # Git repository
    ├── .vscode/                      # VS Code settings
    └── node_modules/                 # Dependencies (not tracked)
```

## 📱 App Directory (`/app`)

### Main Layout
- **`_layout.tsx`** - Root layout component that handles:
  - Authentication state management
  - Navigation routing based on user login status
  - Theme provider setup
  - Font loading and splash screen

### Authentication Screens
- **`login.tsx`** - User login screen with:
  - Email/password authentication
  - Form validation
  - Error handling
  - Navigation to signup

- **`signup.tsx`** - User registration screen with:
  - New user account creation
  - Name, email, and password fields
  - Form validation
  - Navigation to login

### Tab Navigation (`/app/(tabs)`)
- **`_layout.tsx`** - Tab navigation layout with:
  - Bottom tab bar configuration
  - Cart badge with item count
  - Authentication protection
  - Tab icons and labels

#### Tab Screens
- **`index.tsx`** - Home screen featuring:
  - Featured products display
  - Search functionality
  - Category browsing
  - Product grid layout

- **`categories.tsx`** - Categories screen with:
  - Product category filtering
  - Category-based product display
  - Product cards with add to cart

- **`cart.tsx`** - Shopping cart screen including:
  - Cart items display
  - Quantity management
  - Remove items functionality
  - Total price calculation
  - Clear cart option

- **`profile.tsx`** - User profile screen with:
  - User information display
  - Profile editing modal
  - Account management options
  - Logout functionality

### Modal Screens
- **`modal.tsx`** - Modal screen for additional features
- **`product.tsx`** - Product detail modal with:
  - Detailed product information
  - Add to cart functionality
  - Product images and descriptions

## 🧩 Components Directory (`/components`)

### Context Providers
- **`AuthContext.tsx`** - Authentication context providing:
  - User state management
  - Login/logout functions
  - Profile update functionality
  - Firebase authentication integration

- **`CartContext.tsx`** - Shopping cart context with:
  - Cart state management
  - Add/remove items
  - Quantity updates
  - Cart persistence with AsyncStorage
  - Total calculations

- **`NotificationContext.tsx`** - Notification system providing:
  - Toast notifications
  - Success/error/info messages
  - Animated notification display

### UI Components
- **`Notification.tsx`** - Toast notification component with:
  - Animated slide-in/out
  - Multiple notification types
  - Auto-dismiss functionality
  - Platform-specific styling

### Utility Components
- **`useColorScheme.tsx`** - Theme hook for dark/light mode
- **`useClientOnlyValue.tsx`** - Client-side value hook

## ⚙️ Configuration Directory (`/config`)

- **`firebase.ts`** - Firebase configuration including:
  - Firebase app initialization
  - Authentication setup
  - Firestore database connection
  - Project configuration

## 🎨 Constants Directory (`/constants`)

- **`Colors.ts`** - App color scheme with:
  - Light and dark theme colors
  - Primary/secondary colors
  - Background and text colors

## 🔧 Services Directory (`/services`)

- **`productService.ts`** - Product management service with:
  - Product data fetching
  - Search functionality
  - Category filtering
  - Sample product data
  - Firestore integration

## 📜 Scripts Directory (`/scripts`)

- **`deploy-firebase.js`** - Firebase deployment script for:
  - Firestore security rules deployment
  - Storage rules deployment
  - Firebase project configuration

- **`populate-database.js`** - Database population script with:
  - Sample product data insertion
  - Category creation
  - Firestore data seeding

## 🖼️ Assets Directory (`/assets`)

### Images
- **`images/icon.png`** - App icon
- **`images/splash-icon.png`** - Splash screen image
- **`images/adaptive-icon.png`** - Android adaptive icon
- **`images/favicon.png`** - Web favicon

### Fonts
- **`fonts/SpaceMono-Regular.ttf`** - Custom font for the app

## 📄 Configuration Files

### App Configuration
- **`app.json`** - Expo configuration with:
  - App metadata (name, version, etc.)
  - Platform-specific settings
  - Splash screen configuration
  - Bundle identifiers

### Package Management
- **`package.json`** - Project dependencies and scripts:
  - React Native and Expo dependencies
  - Firebase packages
  - Development tools
  - Build and deployment scripts

### Build Configuration
- **`eas.json`** - EAS build configuration for:
  - Development builds
  - Preview builds
  - Production builds
  - Platform-specific settings

### Version Control
- **`.gitignore`** - Git ignore rules for:
  - Node modules
  - Build artifacts
  - Platform-specific files
  - Environment files

## 🔐 Firebase Configuration Files

### Security Rules
- **`firestore.rules`** - Firestore security rules for:
  - User data protection
  - Product read access
  - Order management
  - Authentication requirements

- **`storage.rules`** - Firebase Storage rules for:
  - File access control
  - User upload permissions
  - Security restrictions

### Firebase Configuration
- **`firebase.json`** - Firebase project configuration
- **`firestore.indexes.json`** - Database indexes for queries

## 🚀 Available Scripts

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

## 🔧 Key Features by File

### Authentication Flow
1. **`app/_layout.tsx`** - Checks authentication state
2. **`components/AuthContext.tsx`** - Manages user session
3. **`app/login.tsx`** - User login interface
4. **`app/signup.tsx`** - User registration interface

### Shopping Cart Flow
1. **`components/CartContext.tsx`** - Cart state management
2. **`app/(tabs)/index.tsx`** - Add items to cart
3. **`app/(tabs)/cart.tsx`** - Cart management interface
4. **`components/Notification.tsx`** - Cart action notifications

### Product Management
1. **`services/productService.ts`** - Product data and operations
2. **`app/(tabs)/categories.tsx`** - Category browsing
3. **`app/(tabs)/index.tsx`** - Product display and search
4. **`app/product.tsx`** - Product details

### User Profile
1. **`app/(tabs)/profile.tsx`** - Profile management interface
2. **`components/AuthContext.tsx`** - Profile update functions
3. **`app/_layout.tsx`** - Logout handling

## 🏗️ Architecture Overview

### State Management
- **Context API** for global state (Auth, Cart, Notifications)
- **Local State** for component-specific data
- **AsyncStorage** for persistent data

### Navigation
- **Expo Router** for declarative routing
- **Stack Navigation** for modal screens
- **Tab Navigation** for main app sections

### Data Flow
- **Firebase Auth** for user authentication
- **Firestore** for product and user data
- **AsyncStorage** for local cart persistence
- **Context API** for state synchronization

## 🔒 Security Features

- **Firebase Security Rules** for data protection
- **Authentication Guards** for protected routes
- **Input Validation** for form data
- **Error Handling** for robust operation

## 📱 Platform Support

- **iOS** - Native iOS app
- **Android** - Native Android app
- **Web** - Progressive web app
- **Cross-platform** - Shared codebase

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

## 📚 Additional Documentation

- **`DEPLOYMENT.md`** - Detailed deployment guide
- **Firebase Console** - Backend configuration
- **Expo Documentation** - Platform-specific guides

---

**Food Network** - Fresh groceries delivered to your door! 🛒🥬🍎
#   F o o d - N e t w o r k  
 
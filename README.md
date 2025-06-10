# PlantBuilder 🌱

**Build Your Perfect Plant** - An Apple-style plant configurator that lets customers create personalized plant combinations with step-by-step customization.

## 🚀 Phase 1: Project Scaffold - COMPLETED

### ✅ What's Been Built

**Core Infrastructure:**
- ✅ Next.js 15 with TypeScript and App Router
- ✅ Tailwind CSS + shadcn/ui component library
- ✅ MongoDB with Mongoose ODM
- ✅ JWT Authentication system
- ✅ Docker containerization setup
- ✅ GitHub Actions CI/CD pipeline

**Project Structure:**
```
plantbuilder/
├── src/
│   ├── app/
│   │   ├── api/auth/signup/route.ts    # Authentication API
│   │   ├── page.tsx                    # Beautiful landing page
│   │   └── layout.tsx                  # Root layout
│   └── components/
│       └── ui/                         # shadcn/ui components
├── lib/
│   ├── mongodb.ts                      # Database connection
│   └── auth.ts                         # JWT utilities
├── models/
│   ├── User.ts                         # User schema
│   ├── Plant.ts                        # Plant schema
│   └── Order.ts                        # Order schema
├── types/
│   └── index.ts                        # TypeScript definitions
├── docker/
│   └── mongo-init.js                   # Database initialization
├── .github/workflows/
│   └── ci.yml                          # CI/CD pipeline
├── Dockerfile                          # Container configuration
├── docker-compose.yml                  # Multi-service setup
└── .env.example                        # Environment variables template
```

**Key Features Implemented:**
- 🎨 Apple-style landing page with hero section
- 🔐 Complete authentication system (signup API ready)
- 🗄️ MongoDB models for Users, Plants, Orders
- 🐳 Docker setup with MongoDB and Mongo Express
- 🚀 GitHub Actions for automated testing and deployment
- 📱 Responsive design with Tailwind CSS
- 🧩 Component library with shadcn/ui

### 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 15, TypeScript, Tailwind CSS |
| **UI Library** | shadcn/ui, Lucide React icons |
| **Backend** | Next.js API Routes |
| **Database** | MongoDB with Mongoose ODM |
| **Authentication** | JWT with bcryptjs |
| **Containerization** | Docker + Docker Compose |
| **CI/CD** | GitHub Actions |
| **State Management** | Zustand (installed, ready for Phase 2) |
| **Payments** | Stripe SDK (installed, ready for Phase 4) |
| **Email** | Nodemailer (installed, ready for Phase 5) |

### 🚀 Quick Start

1. **Clone and Install:**
   ```bash
   git clone <your-repo>
   cd plantbuilder
   npm install
   ```

2. **Environment Setup:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your MongoDB URI and JWT secret
   ```

3. **Start Development:**
   ```bash
   # Option 1: Local development
   npm run dev

   # Option 2: Docker development
   docker-compose up
   ```

4. **Access the Application:**
   - **App:** http://localhost:3000
   - **MongoDB Express:** http://localhost:8081 (admin/password)

### 🧪 Testing the Setup

**Test the Signup API:**
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "+1234567890"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "jwt-token-here"
  },
  "message": "Account created successfully"
}
```

### 📋 Next Steps - Phase 2: Authentication & Profiles

**Upcoming Tasks:**
1. **Complete Authentication System**
   - Login API route
   - Password reset functionality
   - Protected route middleware
   - User profile management

2. **User Dashboard**
   - Profile page with address management
   - Order history view
   - Saved configurations

3. **Frontend Auth Components**
   - Login/Signup forms
   - Protected route wrapper
   - User context provider

**Estimated Timeline:** 1 week

### 🐳 Docker Commands

```bash
# Build and start all services
docker-compose up --build

# Start in background
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f plantbuilder-app

# Rebuild specific service
docker-compose up --build plantbuilder-app
```

### 🔧 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run docker:build # Build Docker image
npm run docker:run   # Run with Docker Compose
npm run docker:down  # Stop Docker services
```

### 📁 Environment Variables

Create `.env.local` with:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/plantbuilder

# Authentication
JWT_SECRET=your-super-secret-jwt-key
NEXTAUTH_SECRET=your-nextauth-secret

# Stripe (for Phase 4)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Email (for Phase 5)
SENDGRID_API_KEY=your-sendgrid-key
```

### 🎯 Project Roadmap

- [x] **Phase 1:** Project Scaffold *(Current)*
- [ ] **Phase 2:** Authentication & Profiles *(Next)*
- [ ] **Phase 3:** Catalog & Configurator
- [ ] **Phase 4:** Cart & Checkout
- [ ] **Phase 5:** Order Tracking
- [ ] **Phase 6:** Testing & Deployment

---

**Built with ❤️ for Chaitanya Hortica**

Ready to move to Phase 2! 🚀

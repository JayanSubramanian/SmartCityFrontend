# 🏙️ Smart City Frontend

<div align="center">

![Smart City](https://img.shields.io/badge/Smart-City-blue?style=for-the-badge&logo=city&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

*An intelligent web application suite for smart city management and analysis*

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [API](#-api-integration) • [Contributing](#-contributing)

</div>

---

## 📋 Overview

Smart City Frontend is a comprehensive React-based web application that provides AI-powered tools for urban management and analysis. Built with modern technologies like React 18, TypeScript, and Tailwind CSS, it offers an intuitive interface for various smart city functionalities including waste management, biomedical imaging, infrastructure monitoring, and nutrition assistance.

## ✨ Features

### 🗂️ Waste Classification
- **AI-Powered Image Recognition**: Upload waste images for automatic classification
- **Multi-Category Support**: Identifies plastic, paper, organic, metal, and other waste types
- **Real-time Processing**: Instant classification results with visual feedback
- **User-Friendly Interface**: Drag-and-drop image upload with preview

### 🧠 Biomedical Imaging Analysis
- **Medical Scan Processing**: Supports both MRI and X-Ray image analysis
- **Tumor Detection**: Advanced AI algorithms for identifying tumors in MRI scans
- **Pneumonia Detection**: X-Ray analysis for pneumonia identification
- **Multiple Scan Types**: Configurable scan type selection (MRI/X-Ray)
- **Detailed Results**: Comprehensive analysis results with confidence indicators

### 🔧 Pipeline Crack Detection
- **Real-time Monitoring**: Continuous monitoring of pipeline infrastructure
- **Visual Pipeline System**: Interactive 3D-style pipeline visualization
- **Status Indicators**: Color-coded status system (OK/CRACK)
- **Automated Alerts**: Toast notifications for status changes
- **Live Data Integration**: Connects to backend APIs for real-time data

### 🤖 NutriBot - Smart Food Recommender
- **Calorie-Based Recommendations**: Get food suggestions within your calorie budget
- **AI Chat Interface**: Interactive chatbot for nutrition queries
- **Optimized Food Selection**: Algorithm-optimized food combinations
- **Scoring System**: Advanced scoring for food recommendations
- **Real-time Chat**: Conversational interface for food and nutrition questions

### 🍎 Food Name Correction
- **Intelligent Text Correction**: AI-powered food name spelling correction
- **Instant Suggestions**: Real-time food name recommendations
- **Beautiful Animations**: Smooth transitions and micro-interactions
- **Error Handling**: Comprehensive error feedback and suggestions

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3.1
- **Type Safety**: TypeScript 5.6.2
- **Build Tool**: Vite 6.0.5
- **Styling**: Tailwind CSS 4.0.12
- **UI Components**: Custom components with Radix UI primitives
- **Animations**: Framer Motion 12.6.5
- **Icons**: Lucide React 0.479.0
- **Routing**: React Router DOM 7.1.3
- **Maps**: React Leaflet 4.2.1
- **Development**: ESLint, TypeScript ESLint

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── select.tsx
│   ├── Pipeline/           # Pipeline monitoring components
│   │   ├── monitor.tsx
│   │   ├── segment.tsx
│   │   ├── system.tsx
│   │   ├── toast.tsx
│   │   └── valve.tsx
│   ├── Chat.tsx           # Waste classification
│   ├── FoodCorrection.tsx # Food name correction
│   ├── Header.tsx         # Navigation header
│   ├── Home.tsx           # Landing page
│   ├── Layout.tsx         # Main layout wrapper
│   ├── Nutribot.tsx       # Nutrition chatbot
│   ├── Pipeline.tsx       # Pipeline monitoring
│   └── Tumor.tsx          # Biomedical imaging
├── lib/
│   └── utils.ts           # Utility functions
├── assets/                # Static assets
├── App.tsx                # Main app component
└── main.tsx              # App entry point
```

## 🚀 Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **Bun** (recommended) or npm/yarn
- **Git**

### Clone the Repository

```bash
git clone <repository-url>
cd SmartCityFrontend
```

### Install Dependencies

Using Bun (recommended):
```bash
bun install
```

Using npm:
```bash
npm install
```

### Environment Setup

Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:8000
```

## 🏃‍♂️ Usage

### Development Server

Start the development server with hot module replacement:

```bash
# Using Bun
bun run dev

# Using npm
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
# Using Bun
bun run build

# Using npm
npm run build
```

### Preview Production Build

```bash
# Using Bun
bun run preview

# Using npm
npm run preview
```

### Linting

```bash
# Using Bun
bun run lint

# Using npm
npm run lint
```

## 🔗 API Integration

The application integrates with several backend APIs:

### Endpoints

| Feature | Endpoint | Method | Description |
|---------|----------|--------|-------------|
| Waste Classification | `/process_image` | POST | Upload and classify waste images |
| Tumor Detection | `/process_scan` | POST | Analyze medical scans for tumors |
| Pipeline Monitoring | `/crack_result` | GET | Get pipeline crack detection results |
| Food Recommendations | `/recommendations` | GET | Get calorie-based food recommendations |
| Food Correction | `/correct_food` | GET | Correct misspelled food names |
| Nutrition Chat | `/chat` | POST | Chat with nutrition AI assistant |

### API Configuration

Update the API base URL in your environment variables or component files:

```typescript
const API_BASE_URL = "http://localhost:8000";
```

## 🎨 Styling and Design

### Tailwind CSS Configuration

The project uses Tailwind CSS with custom configurations:

- **Custom Animations**: Fade-in, slide-up animations
- **Extended Z-Index**: Custom z-index values for layering
- **Custom Border Radius**: Additional border radius options
- **Responsive Design**: Mobile-first responsive layouts

### Component Design System

- **Consistent Spacing**: Standardized margin and padding scales
- **Color Scheme**: Professional blue and purple gradients
- **Typography**: Clear hierarchy with readable fonts
- **Interactive Elements**: Hover states and smooth transitions

## 🧪 Features Breakdown

### Smart Components

1. **Waste Classification (`Chat.tsx`)**
   - File upload with drag-and-drop
   - Real-time image preview
   - AI-powered classification
   - Error handling and status feedback

2. **Biomedical Imaging (`Tumor.tsx`)**
   - Multi-scan type support (MRI/X-Ray)
   - Advanced image processing
   - Detailed medical analysis
   - Professional medical interface

3. **Pipeline Monitoring (`Pipeline.tsx`)**
   - Real-time infrastructure monitoring
   - Visual pipeline representation
   - Status tracking and alerts
   - Automated data polling

4. **NutriBot (`Nutribot.tsx`)**
   - Interactive AI chat interface
   - Calorie-based recommendations
   - Optimized food selection algorithms
   - Real-time nutrition assistance

5. **Food Correction (`FoodCorrection.tsx`)**
   - Advanced text correction algorithms
   - Beautiful animated interface
   - Instant feedback and suggestions
   - Error handling and validation

## 🔧 Development Guidelines

### Code Style

- **TypeScript**: Strict type checking enabled
- **ESLint**: Comprehensive linting rules
- **Component Structure**: Functional components with hooks
- **File Organization**: Feature-based folder structure

### Best Practices

- **Type Safety**: Full TypeScript coverage
- **Component Reusability**: Modular UI components
- **Performance**: Optimized rendering and lazy loading
- **Accessibility**: ARIA labels and keyboard navigation
- **Responsive Design**: Mobile-first approach

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Setup

1. Follow the installation instructions
2. Create a new branch for your feature
3. Make your changes following the coding standards
4. Test your changes thoroughly
5. Submit a pull request with a clear description

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Vite** for the fast build tool
- **Radix UI** for accessible component primitives
- **Lucide** for the beautiful icon library

---

<div align="center">
  <p>Made with ❤️ for Smart Cities</p>
  <p>
    <a href="#-smart-city-frontend">Back to Top</a>
  </p>
</div>

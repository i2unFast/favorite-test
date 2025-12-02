# Favorite App - Frontend

Frontend application สร้างด้วย React และ Material-UI (MUI)

## เทคโนโลยีที่ใช้

- **React 18** - UI Library
- **Material-UI (MUI) 5** - Component Library
- **React Router** - Routing
- **Vite** - Build Tool และ Development Server
- **Emotion** - CSS-in-JS สำหรับ MUI

## การติดตั้ง

1. ติดตั้ง dependencies:
```bash
npm install
```

## การรันโปรเจกต์

### Development Mode
```bash
npm run dev
```
แอปจะเปิดที่ `http://localhost:3000`

### Build สำหรับ Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## โครงสร้างโปรเจกต์

```
frontend/
├── public/          # Static files
├── src/
│   ├── components/  # Reusable components
│   │   └── Navbar.jsx
│   ├── pages/       # Page components
│   │   ├── Home.jsx
│   │   └── Favorites.jsx
│   ├── App.jsx      # Main App component
│   ├── main.jsx     # Entry point
│   └── index.css    # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## Features

- ✅ Navigation bar พร้อม routing
- ✅ หน้าแรก (Home) พร้อมข้อมูลแนะนำ
- ✅ หน้ารายการโปรด (Favorites) พร้อม CRUD operations
- ✅ Material-UI theme configuration
- ✅ Responsive design

## การพัฒนาต่อ

คุณสามารถเพิ่ม features ต่อไปนี้:

- API integration
- State management (Redux, Zustand, etc.)
- Authentication
- Form validation
- Error handling
- Loading states
- และอื่นๆ ตามต้องการ


# Favorite App

แอปพลิเคชันจัดการรายการอสังหาริมทรัพย์ที่ชื่นชอบ สร้างด้วย React (Frontend) และ Node.js/Express (Backend)

## 🚀 เริ่มต้นใช้งาน

### ความต้องการเบื้องต้น

- **Node.js** (v18 หรือสูงกว่า)
- **npm** หรือ **yarn**
- **Docker** และ **Docker Compose** (สำหรับ database)

### การติดตั้งครั้งแรก

1. **ตั้งค่า Environment Variables**:

สร้างไฟล์ `.env` ในโฟลเดอร์ `backend/`:
```env
DATABASE_URL="mysql://app_user:password@localhost:3306/favorite_db"
PORT=4400
```

2. **เริ่มต้นโปรเจกต์ทั้งหมด** (วิธีที่ง่ายที่สุด):
```bash
make start-all
```

คำสั่งนี้จะทำการ:
- ตรวจสอบและติดตั้ง dependencies (ถ้ายังไม่ได้ติดตั้ง)
- เริ่มต้น Docker database container
- Generate Prisma client
- รัน database migrations
- Build frontend
- เริ่มต้น backend และ frontend servers

**หรือ** ใช้คำสั่งแยกขั้นตอน:
```bash
make setup    # ตั้งค่าโปรเจกต์ทั้งหมด (install + database setup)
make start    # เริ่มต้น services (production mode)
```

## 📋 คำสั่ง Makefile

### ดูคำสั่งทั้งหมด
```bash
make help
```

### การติดตั้งและตั้งค่า

| คำสั่ง | คำอธิบาย |
|--------|----------|
| `make install` | ติดตั้ง dependencies ทั้ง backend และ frontend |
| `make setup` | ตั้งค่าโปรเจกต์ทั้งหมด (install + database setup) |

### การจัดการ Database

| คำสั่ง | คำอธิบาย |
|--------|----------|
| `make db-up` | เริ่มต้น Docker database container |
| `make db-down` | หยุด Docker database container |
| `make db-migrate` | รัน Prisma migrations |
| `make db-generate` | Generate Prisma client |
| `make db-seed` | Seed database ด้วยข้อมูลเริ่มต้น |
| `make db-reset` | Reset database (ลบข้อมูลทั้งหมดและ migrate ใหม่) |
| `make db-studio` | เปิด Prisma Studio (database GUI) |
| `make logs-db` | แสดง logs ของ database container |

### Development

| คำสั่ง | คำอธิบาย |
|--------|----------|
| `make dev-backend` | รัน backend ในโหมด development (port 4400) |
| `make dev-frontend` | รัน frontend ในโหมด development (port 3000) |
| `make dev` | แสดงคำแนะนำสำหรับรัน development servers |

**หมายเหตุ**: สำหรับ development ต้องรัน backend และ frontend ใน terminal แยกกัน:
```bash
# Terminal 1: Database และ Backend
make db-up
make dev-backend

# Terminal 2: Frontend
make dev-frontend
```

### Production

| คำสั่ง | คำอธิบาย |
|--------|----------|
| `make start-all` | **เริ่มต้นทุกอย่างให้พร้อมใช้งาน** (database + backend + frontend) - **แนะนำสำหรับเริ่มต้นครั้งแรก** |
| `make start` | เริ่มต้น services ทั้งหมด (production mode - ต้อง setup แล้ว) |
| `make stop` | หยุด services ทั้งหมด |
| `make restart` | Restart services ทั้งหมด |
| `make build-frontend` | Build frontend สำหรับ production |

**คำสั่งแนะนำ**: ใช้ `make start-all` เพื่อเริ่มต้นโปรเจกต์ทั้งหมดพร้อมใช้งานได้เลย!

### การทำความสะอาด

| คำสั่ง | คำอธิบาย |
|--------|----------|
| `make clean` | ลบ node_modules และ build files |
| `make clean-db` | ลบ Docker volumes (ลบข้อมูล database ทั้งหมด) |
| `make clean-all` | ลบทุกอย่าง (node_modules, build files, database) |

### Utility

| คำสั่ง | คำอธิบาย |
|--------|----------|
| `make status` | แสดงสถานะของ services |
| `make logs-db` | แสดง logs ของ database container |
| `make logs-backend` | แสดง logs ของ backend |
| `make logs-frontend` | แสดง logs ของ frontend |
| `make logs` | แสดง logs ทั้งหมด (backend + frontend) |

## 🏗️ โครงสร้างโปรเจกต์

```
favorite-app/
├── backend/              # Backend API (Node.js + Express)
│   ├── prisma/          # Prisma schema และ migrations
│   ├── src/
│   │   ├── controllers/ # Route controllers
│   │   ├── routes/      # API routes
│   │   ├── services/    # Business logic
│   │   ├── db/          # Database connection
│   │   ├── app.js       # Express app setup
│   │   └── index.js     # Server entry point
│   └── package.json
├── frontend/            # Frontend (React + Vite)
│   ├── src/
│   │   ├── api/         # API client functions
│   │   ├── components/  # Reusable components
│   │   ├── feature/     # Feature modules
│   │   ├── pages/       # Page components
│   │   └── utils/       # Utility functions
│   └── package.json
├── docker-compose.yml   # Docker configuration สำหรับ MySQL
└── Makefile            # Makefile สำหรับจัดการโปรเจกต์
```

## 🔧 เทคโนโลยีที่ใช้

### Backend
- **Node.js** + **Express** - Web framework
- **Prisma** - ORM สำหรับ database
- **MySQL** - Database (รันผ่าน Docker)
- **CORS** - Cross-Origin Resource Sharing

### Frontend
- **React 18** - UI Library
- **TypeScript** - Type safety
- **Material-UI (MUI)** - Component Library
- **Vite** - Build tool และ development server
- **Axios** - HTTP client
- **React Router** - Routing
- **Notistack** - Snackbar notifications

## 🌐 Ports

- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:4400`
- **Database**: `localhost:3306`

## 📝 API Endpoints

### Users
- `GET /api/users` - ดึงรายการ users ทั้งหมด
- `POST /api/users` - สร้าง user ใหม่

### Properties
- `GET /api/properties` - ดึงรายการ properties ทั้งหมด
- `GET /api/properties/:id` - ดึง property ตาม ID
- `POST /api/properties` - สร้าง property ใหม่

### Favorites
- `GET /api/favorites` - ดึงรายการ favorites ทั้งหมด
- `GET /api/favorites?userId=:userId` - ดึง favorites ของ user
- `POST /api/favorites` - เพิ่ม favorite
- `DELETE /api/favorites/:id` - ลบ favorite

### Health Check
- `GET /health` - ตรวจสอบสถานะ server

## 🐛 Troubleshooting

### Database ไม่เชื่อมต่อ
1. ตรวจสอบว่า Docker container กำลังรัน: `make status`
2. ตรวจสอบ logs: `make logs-db`
3. เริ่มต้น database ใหม่: `make db-down && make db-up`

### Port ถูกใช้งานแล้ว
- Backend: เปลี่ยน `PORT` ในไฟล์ `.env`
- Frontend: เปลี่ยน `port` ใน `frontend/vite.config.ts`

### Prisma Client ไม่พบ
```bash
make db-generate
```

### Reset ทุกอย่างและเริ่มใหม่
```bash
make clean-all
make setup
```

## 📚 เอกสารเพิ่มเติม

- [Frontend README](./frontend/README.md) - ข้อมูลเพิ่มเติมเกี่ยวกับ frontend
- [Prisma Documentation](https://www.prisma.io/docs) - เอกสาร Prisma
- [Vite Documentation](https://vitejs.dev/) - เอกสาร Vite

## 📄 License

ISC

